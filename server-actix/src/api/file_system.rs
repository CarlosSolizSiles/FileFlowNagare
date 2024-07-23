use actix_files::NamedFile;
use actix_web::{get, web, HttpResponse, Result};
use lazy_static::lazy_static;
use serde::Serialize;
use std::collections::HashMap;
use std::fs::read_dir;
use std::path::Path;
use std::sync::Mutex;

lazy_static! {
    static ref GLOBAL_MAP: Mutex<HashMap<String, i32>> = Mutex::new(HashMap::new());
}

#[derive(Serialize)]
pub struct DirectoryListing {
    path: String,
    dirs: Vec<String>,
    files: Vec<String>,
}

#[derive(Serialize)]
pub struct ApiResponse<T> {
    status: String,
    message: String,
    data: T,
}

#[get("/file/{filename:.*}")]
async fn get_file(path: web::Path<String>) -> Result<NamedFile> {
    let filename = path.into_inner();
    let path_origin = Path::new(&filename);
    Ok(NamedFile::open(path_origin)?)
}

#[get("/dir/{lettering}/{directory:.*}")]
async fn get_directory_listing(path: web::Path<(String, String)>) -> Result<HttpResponse> {
    let (lettering, directory) = path.into_inner();
    let path = format!(
        "{lettering}:/{directory}",
        lettering = lettering,
        directory = directory
    );
    let path_origin = Path::new(&path);

    if let Err(_) = read_dir(&path_origin) {
        return Ok(HttpResponse::BadRequest()
            .append_header(("Access-Control-Allow-Origin", "*"))
            .append_header(("Access-Control-Allow-Methods", "GET, POST"))
            .json(ApiResponse::<String> {
                status: "error".to_string(),
                message: "La solicitud no se completó correctamente.".to_string(),
                data: format!(
                    "No se pudo acceder a la carpeta: {}. Revise si existe o cumple con los permisos requeridos",
                    &path
                ),
            }));
    }

    let mut directory_data = DirectoryListing {
        path: path.clone(),
        dirs: Vec::new(),
        files: Vec::new(),
    };

    for entry in read_dir(&path_origin).unwrap() {
        match entry {
            Ok(entry) => {
                if let Some(name) = entry.file_name().to_str() {
                    if entry.path().is_dir() {
                        directory_data.dirs.push(name.to_string());
                    } else {
                        directory_data.files.push(name.to_string());
                    }
                }
            }
            Err(_) => {}
        }
    }

    Ok(HttpResponse::Ok()
        .append_header(("Access-Control-Allow-Origin", "*"))
        .append_header(("Access-Control-Allow-Methods", "GET, POST"))
        .json(ApiResponse::<DirectoryListing> {
            status: "success".to_string(),
            message: "La solicitud se completó correctamente.".to_string(),
            data: directory_data,
        }))
}

pub fn configure_services(cfg: &mut web::ServiceConfig) {
    cfg.service(get_file).service(get_directory_listing);
}
