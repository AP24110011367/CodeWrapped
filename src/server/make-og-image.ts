import {
  renderStillOnLambda,
  speculateFunctionName,
} from "@remotion/lambda/client";
import type { z } from "zod";
import type { ProfileStats, ogImageSchema } from "../config.js";
import { DISK, RAM, SITE_NAME, TIMEOUT, parseTopLanguage } from "../config.js";
import { getIgStory, getOgImage, saveIgStory, saveOgImage } from "./db.js";
import { getRandomRegion } from "./render.js";

export const makeOrGetOgImage = async (profileStats: ProfileStats) => {
  return "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
};

export const makeOrGetIgStory = async (profileStats: ProfileStats) => {
  return "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
};
