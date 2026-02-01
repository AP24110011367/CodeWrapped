import type { AwsRegion } from "@remotion/lambda";
import { getRegions } from "@remotion/lambda";
import {
  getRenderProgress,
  renderMediaOnLambda,
  speculateFunctionName,
} from "@remotion/lambda/client";
import type { Request, Response } from "express";
import { ObjectId } from "mongodb";
import type { z } from "zod";
import type { RenderResponse, compositionSchema } from "../config.js";
import {
  DISK,
  RAM,
  RenderRequest,
  SITE_NAME,
  TIMEOUT,
  computeCompositionParameters,
} from "../config.js";
import { getRandomAwsAccount } from "../helpers/get-random-aws-account.js";
import { setEnvForKey } from "../helpers/set-env-for-key.js";
import type { Render } from "./db.js";
import {
  findRender,
  getProfileStatsFromCache,
  saveRender,
  updateRender,
} from "./db.js";
import { makeOrGetIgStory, makeOrGetOgImage } from "./make-og-image.js";
import { getLocalRenderProgress, renderLocally } from "./local-render.js";

/*
export const getRandomRegion = (): AwsRegion => {
  return getRegions()[Math.floor(Math.random() * getRegions().length)];
};
*/

export const renderOrGetProgress = async (
  requestBody: unknown,
): Promise<RenderResponse> => {
  const { username, theme } = RenderRequest.parse(requestBody);

  // Check local progress
  const progress = getLocalRenderProgress(username, theme);

  if (progress.type === "done") {
    return {
      type: "video-available",
      url: progress.url
    };
  }

  if (progress.type === "error") {
    return {
      type: "render-error",
      error: progress.message
    }
  }

  if (progress.type === "progress" && progress.progress > 0) {
    return {
      type: "render-running",
      progress: progress.progress
    }
  }

  // If not rendering, start it (fire and forget)
  renderLocally(username, theme);

  return {
    type: "render-running",
    progress: 0,
  };
};

export const renderEndPoint = async (request: Request, response: Response) => {
  if (request.method === "OPTIONS") {
    return response.end();
  }

  const res = await renderOrGetProgress(request.body);

  return response.json(res);
};
