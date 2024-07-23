mod file_system;

use actix::{Actor, StreamHandler};
use actix_web::{get, web, Error, HttpRequest, HttpResponse};
use actix_web_actors::ws;
use serde_json::Value;

/// Define HTTP actor
struct MyWs;

impl Actor for MyWs {
    type Context = ws::WebsocketContext<Self>;
}

// impl MyWs {
//     fn send_message(&self, ctx: &mut <Self as Actor>::Context) {
//         ctx.run_later(Duration::from_secs(0), |_act, ctx| {
//             ctx.text("Hola, bienvenido al servidor WebSocket!")
//         });
//     }
// }

/// Handler for ws::Message message
impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for MyWs {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(ws::Message::Ping(msg)) => ctx.pong(&msg),
            Ok(ws::Message::Text(text)) => {
                let data = text.trim();
                // ctx.text("Hola, bienvenido al servidor WebSocket!");
                // if data.starts_with("/") {}
                // ctx.run_later(Duration::from_secs(0), |act, ctx| {
                //     for _i in 1..10 {
                //         thread::sleep(Duration::from_millis(1000));
                //         act.send_message(ctx);
                //     }
                // });

                let json: Value = serde_json::from_str(data).unwrap();
                let id = json["id"].as_i64().unwrap();
                let function = json["function"].as_str().unwrap();
                match function {
                    "get_directory" => {
                        let arguments: Value = json["arguments"].clone();
                        file_system::get_directory(ctx, id, arguments)
                    }
                    _ => println!("No existe el modulo"),
                }
            }
            Ok(ws::Message::Binary(bin)) => ctx.binary(bin),
            _ => (),
        }
    }
}
#[get("/")]
async fn index(req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    let resp = ws::start(MyWs {}, &req, stream);
    // println!("{:?}", resp);
    resp
}

pub fn configure_services(cfg: &mut web::ServiceConfig) {
    cfg.service(index);
}

// use actix::{Actor, AsyncContext, Context, StreamHandler};
// use actix_web::{web, App, Error, HttpRequest, HttpResponse, HttpServer};
// use actix_web_actors::ws;
// use std::{thread, time::Duration};

// /// Define HTTP actor
// struct MyWs;

// impl Actor for MyWs {
//     type Context = ws::WebsocketContext<Self>;

//     fn started(&mut self, ctx: &mut Self::Context) {
//         // self.send_message(ctx);
//     }
// }

// impl MyWs {
//     fn send_message(&self, ctx: &mut <Self as Actor>::Context) {
//         ctx.text("Hola, bienvenido al servidor WebSocket!");
//         ctx.run_later(Duration::from_secs(1), |act, ctx| act.send_message(ctx));
//     }
// }

// /// Handler for ws::Message message
// impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for MyWs {
//     fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
//         match msg {
//             Ok(ws::Message::Ping(msg)) => ctx.pong(&msg),
//             Ok(ws::Message::Text(text)) => {
//                 ctx.run_later(Duration::from_secs(1), |act, ctx| {
//                     thread::sleep(Duration::from_secs(2));
//                     ctx.text(text);
//                 });
//             }
//             Ok(ws::Message::Binary(bin)) => ctx.binary(bin),
//             _ => (),
//         }
//     }
// }

// async fn index(req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
//     let resp = ws::start(MyWs {}, &req, stream);
//     println!(" {:?}", resp);
//     resp
// }

// #[actix_web::main]
// async fn main() -> std::io::Result<()> {
//     HttpServer::new(|| App::new().route("/ws/", web::get().to(index)))
//         .bind(("127.0.0.1", 8080))?
//         .run()
//         .await
// }
