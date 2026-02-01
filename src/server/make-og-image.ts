import type { ProfileStats } from "../config.js";
import { renderStillLocally } from "./local-render.js";

export const makeOrGetOgImage = async (profileStats: ProfileStats) => {
  // We assume username is available in profileStats.
  return renderStillLocally(profileStats.username, "og-image");
};

export const makeOrGetIgStory = async (profileStats: ProfileStats) => {
  return renderStillLocally(profileStats.username, "ig-story");
};
