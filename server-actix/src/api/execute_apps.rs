use actix_web::{get, web, HttpResponse, Result};
use serde::Serialize;
use std::path::Path;
use std::thread;

use std::os::windows::process::CommandExt;
use std::process::{exit, Command};

const CREATE_NO_WINDOW: u32 = 0x08000000;

#[derive(Serialize)]
pub struct PingResponse {
    status: String,
    message: String,
    data: String,
}

#[get("/execute/{lettering}/{directory:.*}")]
async fn ping(path: web::Path<(String, String)>) -> Result<HttpResponse> {
    let (lettering, directory) = path.into_inner();
    let path_string = format!(
        "{lettering}:/{directory}",
        lettering = lettering,
        directory = directory
    );
    let origin_path = Path::new(&path_string);

    if origin_path.is_file() {
        {
            thread::spawn(move || {
                let status = Command::new("cmd")
                    // .args(&["/C", "start", path_string.clone().as_str()])
                    .arg("/C")
                    .arg(path_string.clone())
                    .creation_flags(CREATE_NO_WINDOW)
                    .status();
                match status {
                    Ok(status) => println!("Status: {}", status),
                    Err(err) => {
                        eprintln!("Error: {}", err);
                        exit(1);
                    }
                }
                //                let _foo = Command::new("cmd")
                //                    .arg("/C")
                //                    .arg(path_string.clone())
                //                    .output()
                //                   .expect("No se pudo ejecutar el archivo batch");
                //                println!("Finalizo El programa");
            });
        }
        return Ok(HttpResponse::Ok().body("Ok App execute"));
    } else {
        Ok(HttpResponse::Ok().body("Error App not execute"))
    }
}

pub fn configure_services(cfg: &mut web::ServiceConfig) {
    cfg.service(ping);
}
