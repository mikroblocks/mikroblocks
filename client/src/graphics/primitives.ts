import * as twgl from "twgl.js";
import Rgb from "../color";
import { Vec2 } from "../world";

export const setRect = (
  gl: WebGLRenderingContext,
  squareArrays: {
    [key: string]: twgl.FullArraySpec;
  },
  pos: Vec2,
  width: number,
  height: number,
  color: Rgb
) => {
  const x1 = pos.x;
  const x2 = pos.x + width;
  const y1 = pos.y;
  const y2 = pos.y + height;
  squareArrays.position.data = (squareArrays.position.data as number[]).concat(
    x1,
    y1,
    x2,
    y1,
    x1,
    y2,
    x1,
    y2,
    x2,
    y1,
    x2,
    y2
  );
  squareArrays.color.data = (squareArrays.color.data as number[]).concat(
    Array(6).fill(color.toGL()).flat()
  );
};
