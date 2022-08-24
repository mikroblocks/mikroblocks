import * as twgl from "twgl.js";
import * as w from "../world";
import * as prim from "./primitives";

export const setPixel = (
  gl: WebGLRenderingContext,
  arrays: {
    [key: string]: twgl.FullArraySpec;
  },
  pixel: w.Pixel
) => {
  prim.setRect(gl, arrays, pixel.pos.mul(8), 8, 8, pixel.color);
};

export const setChunk = (
  gl: WebGLRenderingContext,
  arrays: {
    [key: string]: twgl.FullArraySpec;
  },
  chunk: w.Chunk
) => {
  prim.setRect(
    gl,
    arrays,
    chunk.pos.mul(32 * 8),
    32 * 8,
    32 * 8,
    chunk.background
  );

  for (const x in chunk.pixels) {
    for (const y in chunk.pixels[x]) {
      const pixel = chunk.pixels[x][y];
      if (!pixel) continue;
      setPixel(gl, arrays, pixel);
    }
  }
};

export const setWorld = (
  gl: WebGLRenderingContext,
  arrays: {
    [key: string]: twgl.FullArraySpec;
  },
  world: w.World
) => {
  for (const chunk of world.chunks) {
    setChunk(gl, arrays, chunk);
  }
};
