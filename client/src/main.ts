import { handlePacket, updateChunks } from "./networking/parser";
import * as n from "./networking/vanilla";
import { render } from "./render";
import { World } from "./world";

const world: World = {
  chunks: new Map(),
  entities: new Map(),
};

const socket = new WebSocket(
  "wss://3000-mikroblocks-mikroblocks-eaosxfezuyj.ws-us64.gitpod.io/"
);

socket.binaryType = "arraybuffer";
socket.onmessage = (e) => {
  handlePacket(world, new Uint8Array(e.data));
};
socket.onclose = () => console.log("[mkrwds] socket closed");
render(world);
