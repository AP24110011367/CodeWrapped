import React from "react";
import { AbsoluteFill } from "remotion";

export const RadialGradient: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        zIndex: -1,
        background: "var(--bg-space-gradient)",
      }}
    />
  );
};
