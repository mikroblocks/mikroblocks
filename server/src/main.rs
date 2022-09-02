#![feature(slice_flatten)]
use glam::IVec2;
use crate::world::EncodeNet;
use std::net::TcpListener;
use std::thread::spawn;
use tungstenite::{accept, Message as WsMessage};
use world::{Chunk, Pixel, World};

mod world;
pub mod vanilla {
    include!(concat!(env!("OUT_DIR"), "/mikroblocks.vanilla.rs"));
}

fn main() {
    let server = TcpListener::bind("127.0.0.1:3000").unwrap();
    for stream in server.incoming() {
        spawn(move || {
            let mut websocket = accept(stream.unwrap()).unwrap();
            loop {
                let world = World::new(
                    vec![Chunk::new(
                        IVec2::new(0, 0),
                        vec![
                            Pixel::new(IVec2::new(0, 0), [255, 255, 255], true),
                            Pixel::new(IVec2::new(0, 1), [255, 0, 0], true),
                            Pixel::new(IVec2::new(0, 2), [255, 255, 0], true),
                        ],
                        None,
                    )],
                    None,
                );

                websocket.write_message(WsMessage::Binary(world.encode_ws())).unwrap();

                websocket.close(None).unwrap();
            }
        });
    }
}
