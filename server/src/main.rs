#![feature(slice_flatten)]
use glam::{DVec2, IVec2, UVec2};
use std::net::TcpListener;
use std::thread::spawn;
use tungstenite::{accept, Message as WsMessage};
use world::{Chunk, Pixel, World};

mod packets;
mod world;
pub mod vanilla {
    include!(concat!(env!("OUT_DIR"), "/mikroblocks.vanilla.rs"));
}

fn main() {
    let server = TcpListener::bind("127.0.0.1:3000").unwrap();
    for stream in server.incoming() {
        spawn(move || {
            let mut websocket = accept(stream.unwrap()).unwrap();
            let mut world = World::new(
                vec![Chunk::new(
                    IVec2::new(0, 0),
                    vec![
                        Pixel::new(IVec2::new(0, 0), [255, 0, 255], true),
                        Pixel::new(IVec2::new(0, 1), [255, 0, 0], true),
                        Pixel::new(IVec2::new(0, 2), [255, 255, 0], true),
                    ],
                    Some([255, 255, 255]),
                )],
                None,
            );

            websocket
                .write_message(WsMessage::Binary(packets::init()))
                .unwrap();

            websocket
                .write_message(WsMessage::Binary(packets::update_chunks(
                    &world,
                    world.chunks.keys().collect(),
                )))
                .unwrap();

            let id = world.spawn_entity(DVec2::new(32.0, 32.0), UVec2::new(4, 4));

            websocket.write_message(WsMessage::Binary(packets::update_entities(
                &world,
                vec![id],
            ))).unwrap();

            websocket.close(None).unwrap();
        });
    }
}
