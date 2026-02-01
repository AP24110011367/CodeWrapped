import { getLength, getPointAtLength } from "@remotion/paths";
import { createRef } from "react";
import { staticFile } from "remotion";

export const bodyRef = createRef<SVGGElement>();

export const OctocatBody: React.FC<{
  d: string;
  progress: number;
  endOffsetX: number;
  endOffsetY: number;
  rotation: number;
}> = ({ d, progress, endOffsetX, endOffsetY, rotation }) => {
  const length = getLength(d);
  const endPosition = getPointAtLength(d, length);

  const currentPosition = getPointAtLength(d, length * progress);

  const offsetX = currentPosition.x - endPosition.x;
  const offsetY = currentPosition.y - endPosition.y;

  // Center of the cat (based on original transformOrigin)
  const cx = 1117;
  const cy = 823;
  const size = 450; // Size of the cyber cat image

  return (
    <g
      style={{
        transform: `translateX(${offsetX}px) translateY(${offsetY}px)`,
      }}
    >
      <g
        style={{
          transformBox: "view-box",
          transformOrigin: `${cx}px ${cy}px`,
          transform: `rotate(${rotation}rad)`,
        }}
      >
        <g ref={bodyRef} transform={`translate(${endOffsetX} ${endOffsetY})`}>
          <image
            href={staticFile("cyber-cat.png")} // Use staticFile for Remotion safety, though direct string might work in vite
            x={cx - size / 2}
            y={cy - size / 2}
            width={size}
            height={size}
          />
        </g>
      </g>
    </g>
  );
};
