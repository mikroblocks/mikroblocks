import Rgb from "./color";
import { Chunk, Pixel, Vec2 } from "./world";

export const buildChunk2dArray = (
  colors: ([number, number, number] | null)[][],
  pos: Vec2,
  background = new Rgb(0, 0, 0)
): Chunk => {
  const offset = pos.mul(32);
  return {
    background,
    pos,
    pixels: colors.map((row, y) =>
      row.map((color, x) => {
        if (color === null) return null;
        return {
          color: new Rgb(...color),
          pos: new Vec2(x, y).add(offset),
        };
      })
    ),
  };
};

export const buildChunk = (
  pixels: Pixel[],
  pos: Vec2,
  background = new Rgb(0, 0, 0)
): Chunk => {
  const offset = pos.mul(32);
  const chunk = {
    background,
    pos,
    pixels: Array.from(Array(32), () => new Array(32)),
  };

  for (let pixel of pixels) {
    const { x, y } = pixel.pos;
    pixel.pos = pixel.pos.add(offset);
    chunk.pixels[y][x] = pixel;
  }

  return chunk;
};
