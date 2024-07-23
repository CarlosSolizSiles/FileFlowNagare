use actix_web::{get, web, HttpResponse};
use serde::Serialize;

#[derive(Serialize)]
pub struct PingResponse {
    status: String,
    message: String,
    data: String,
}

#[get("/ping")]
async fn ping() -> HttpResponse {
    HttpResponse::Ok()
        .append_header(("Access-Control-Allow-Origin", "*"))
        .append_header(("Access-Control-Allow-Methods", "GET, POST"))
        .json(PingResponse {
            status: "success".to_string(),
            message: "Conexión exitosa con el servidor".to_string(),
            data: "pong".to_string(),
        })
}

pub fn configure_services(cfg: &mut web::ServiceConfig) {
    cfg.service(ping);
}
