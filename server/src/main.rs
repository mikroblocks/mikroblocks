use prost::Message;
use std::net::TcpListener;
use std::thread::spawn;
use tungstenite::{accept, Message as WsMessage};

pub mod vanilla {
    include!(concat!(env!("OUT_DIR"), "/mikroblocks.vanilla.rs"));
}

/// A WebSocket echo server
fn main() {
    let server = TcpListener::bind("127.0.0.1:3000").unwrap();
    for stream in server.incoming() {
        spawn(move || {
            let mut websocket = accept(stream.unwrap()).unwrap();
            loop {
                let mut update_chunks = vanilla::UpdateChunks { chunks: Vec::new() };
                update_chunks.chunks.push(vanilla::Chunk {
                    background: Some(Vec::from([255, 255, 255])),
                    x: 0,
                    y: 0,
                    pallete: Vec::new(),
                    pixels: Vec::new(),
                });

                update_chunks.chunks.push(vanilla::Chunk {
                    background: Some(Vec::from([255, 0, 0])),
                    x: 1,
                    y: 0,
                    pallete: Vec::new(),
                    pixels: Vec::new(),
                });

                update_chunks.chunks.push(vanilla::Chunk {
                    background: Some(Vec::from([255, 255, 0])),
                    x: 2,
                    y: 0,
                    pallete: Vec::new(),
                    pixels: Vec::new(),
                });

                let mut buf = Vec::new();
                buf.reserve(update_chunks.encoded_len());
                update_chunks.encode(&mut buf).unwrap();
                websocket.write_message(WsMessage::Binary(buf)).unwrap();

                websocket.close(None).unwrap();
            }
        });
    }
}
