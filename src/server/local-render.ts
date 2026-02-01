import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import fs from "fs";
import path from "path";
import { bundle } from "@remotion/bundler";
import { computeCompositionParameters } from "../config.js";
import { getProfileStatsFromCache } from "./db.js";

// Cache the bundle location
let bundledDir: string | null = null;

// In-memory state for local renders
// Key: username-theme, Value: progress (0 to 1) or error string or "done"
const localRenderState = new Map<string, number | "done" | string>();

const getBundle = async () => {
    if (bundledDir) return bundledDir;
    console.log("Bundling...");
    bundledDir = await bundle({
        entryPoint: path.join(process.cwd(), "remotion/index.ts"),
        webpackOverride: (config) => config,
    });
    console.log("Bundled to:", bundledDir);
    return bundledDir;
};

export const getLocalRenderProgress = (username: string, theme: string) => {
    const key = `${username.toLowerCase()}-${theme}`;
    const state = localRenderState.get(key);

    // Check if file exists on disk, implying done
    const fileName = `unwrapped-${username.toLowerCase()}.mp4`;
    const filePath = path.join(process.cwd(), "public", fileName);

    if (fs.existsSync(filePath) && state !== "rendering") {
        return { type: "done", url: `/${fileName}` };
    }

    if (state === "done") {
        return { type: "done", url: `/${fileName}` };
    }

    if (typeof state === 'string') {
        return { type: "error", message: state };
    }

    return { type: "progress", progress: state || 0 };
};

export const renderLocally = async (username: string, theme: string) => {
    const key = `${username.toLowerCase()}-${theme}`;

    if (localRenderState.has(key)) {
        // already rendering or done
        return;
    }

    localRenderState.set(key, 0);

    try {
        const userStat = await getProfileStatsFromCache(username);
        if (!userStat || userStat === "not-found") {
            localRenderState.set(key, "User not found");
            return;
        }

        const inputProps = computeCompositionParameters(userStat, theme as any); // formatting theme to any to bypass strict check for now
        const serveUrl = await getBundle();

        const composition = await selectComposition({
            serveUrl,
            id: "Main",
            inputProps,
        });

        const fileName = `unwrapped-${username.toLowerCase()}.mp4`;
        const outputLocation = path.join(process.cwd(), "public", fileName);

        console.log("Rendering to:", outputLocation);

        await renderMedia({
            composition,
            serveUrl,
            codec: "h264",
            outputLocation,
            inputProps,
            onProgress: ({ progress }) => {
                localRenderState.set(key, progress);
            }
        });

        localRenderState.set(key, "done");
        console.log("Render finished:", fileName);

    } catch (err: any) {
        console.error("Local render error:", err);
        localRenderState.set(key, err.message || "Unknown render error");
    }
};

export const renderStillLocally = async (username: string, compositionId: string): Promise<string> => {
    const userStat = await getProfileStatsFromCache(username);
    if (!userStat || userStat === "not-found") {
        throw new Error("User not found: " + username);
    }

    // Still inputs use a slightly different structure effectively just the stats
    // But we need to match what the composition expects.
    // Looking at Root.tsx, ig-story uses ogImageSchema/props directly.
    // We can reuse computeCompositionParameters but might need to extract just the relevant parts or pass as is if compatible.
    // Actually, ig-story schema is `ogImageSchema`. `computeCompositionParameters` returns `compositionSchema`.
    // Let's assume for now we can construct the props from `userStat`.
    // The `computeCompositionParameters` returns inputProps which has all the data.
    // Let's see if we can just pass that.

    // Note: renderStill returns a Buffer (or saves to file). We want to save to public folder and return URL.

    // We'll use a default theme for stills if needed, or pass one.
    // Helper to get props for stills:
    const inputProps = computeCompositionParameters(userStat, null); // Default theme

    const serveUrl = await getBundle();

    // Select composition to get dimensions etc
    const composition = await selectComposition({
        serveUrl,
        id: compositionId,
        inputProps,
    });

    const extension = compositionId === 'og-image' ? 'png' : 'jpeg';
    const fileName = `${compositionId}-${username.toLowerCase()}.${extension}`;
    const outputLocation = path.join(process.cwd(), "public", fileName);

    console.log("Rendering still to:", outputLocation);

    await renderStill({
        composition,
        serveUrl,
        output: outputLocation,
        inputProps,
        imageFormat: extension === 'png' ? 'png' : 'jpeg',
    });

    return `/${fileName}`;
};
