import { buildChunk } from "./chunk";
import Rgb from "./color";
import { render } from "./render";
import { World, Vec2 } from "./world";

const world: World = {
  chunks: [
    buildChunk(
      [
        { pos: new Vec2(0, 0), color: new Rgb(255, 0, 0) },
        { pos: new Vec2(1, 0), color: new Rgb(255, 255, 0) },
      ],
      new Vec2(0, 0)
    ),
    buildChunk(
      [
        { pos: new Vec2(0, 0), color: new Rgb(255, 0, 0) },
        { pos: new Vec2(1, 0), color: new Rgb(255, 255, 255) },
      ],
      new Vec2(1, 0)
    ),
  ],
};

// const socket = new WebSocket("https://3000-mikroblocks-mikroblocks-eaosxfezuyj.ws-us63.gitpod.io/");

render(world);
