mod api;
mod ws;

use actix_web::{web, App, HttpServer};
use std::net::TcpListener;
use tauri::async_runtime::spawn;

pub fn find_free_port(min: u16, max: u16) -> Option<u16> {
    for port in min..max {
        let listener = TcpListener::bind(("192.168.0.7", port));
        if listener.is_ok() {
            return Some(port);
        }
    }
    None
}

pub fn server_actix(port: u16) -> Result<(), Box<dyn std::error::Error>> {
    #[cfg(debug_assertions)] // only include this code on debug builds
    {
        println!("Puerto libre encontrado test: {}", port);
    }
    spawn(
        HttpServer::new(|| {
            App::new()
                .service(web::scope("/api").configure(api::configure_services))
                .service(web::scope("/ws").configure(ws::configure_services))
        })
        .bind(("localhost", port))?
        .run(),
    );
    Ok(())
}
