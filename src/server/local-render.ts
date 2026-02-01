import { renderMedia, selectComposition } from "@remotion/renderer";
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

        const inputProps = computeCompositionParameters(userStat, theme);

        if (!bundledDir) {
            console.log("Bundling...");
            bundledDir = await bundle({
                entryPoint: path.join(process.cwd(), "src/index.ts"),
                webpackOverride: (config) => config,
            });
            console.log("Bundled to:", bundledDir);
        }

        const composition = await selectComposition({
            serveUrl: bundledDir,
            id: "Main",
            inputProps,
        });

        const fileName = `unwrapped-${username.toLowerCase()}.mp4`;
        const outputLocation = path.join(process.cwd(), "public", fileName);

        console.log("Rendering to:", outputLocation);

        await renderMedia({
            composition,
            serveUrl: bundledDir,
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
