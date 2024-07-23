use actix_web::{get, web, HttpResponse, Result};
use lazy_static::lazy_static;
use serde::Serialize;
use std::collections::HashMap;
use std::fs::read_dir;
use std::path::Path;
use std::sync::Mutex;
use std::thread;
use std::time::Duration;

struct GlobalData {
    pub directory_map: Mutex<HashMap<String, DirectoryListingData>>,
}

lazy_static! {
    static ref GLOBAL_DATA: GlobalData = GlobalData {
        directory_map: Mutex::new(HashMap::new()),
    };
}

#[derive(Debug, Serialize)]
pub struct DirectoryListing {
    path: String,
    directories: Vec<String>,
    files: Vec<String>,
}

#[derive(Serialize)]
pub struct DirectoryListingData {
    error: bool,
    is_completed: bool,
    listing: DirectoryListing,
}

#[derive(Serialize)]
pub struct ApiResponse<T> {
    status: String,
    message: String,
    data: T,
}

fn directory_listing(path: String) -> thread::JoinHandle<()> {
    let path_clone = path.clone();

    let handle: thread::JoinHandle<()> = thread::spawn(move || {
        let path_origin = Path::new(&path_clone);
        if let Err(_) = read_dir(&path_origin) {}
        for entry in read_dir(&path_origin).unwrap() {
            let mut directory_map = GLOBAL_DATA.directory_map.lock().unwrap();
            match entry {
                Ok(entry) => {
                    if let Some(name) = entry.file_name().to_str() {
                        if entry.path().is_dir() {
                            if let Some(data) = directory_map.get_mut(&path) {
                                data.listing.directories.push(name.to_string())
                            }
                        } else {
                            if let Some(data) = directory_map.get_mut(&path) {
                                data.listing.files.push(name.to_string())
                            }
                        }
                    }
                }
                Err(_) => {}
            }
        }
    });
    handle
}

#[get("/dir/{lettering}/{directory:.*}")]
async fn get_directory_listing(path: web::Path<(String, String)>) -> Result<HttpResponse> {
    let (lettering, directory) = path.into_inner();
    let path = format!(
        "{lettering}:/{directory}",
        lettering = lettering,
        directory = directory
    );

    {
        let mut directory_map = GLOBAL_DATA.directory_map.lock().unwrap();
        if !directory_map.contains_key(&path.clone()) {
            directory_map.insert(
                path.clone(),
                DirectoryListingData {
                    error: false,
                    is_completed: false,
                    listing: DirectoryListing {
                        path: path.clone(),
                        directories: Vec::new(),
                        files: Vec::new(),
                    },
                },
            );
            directory_listing(path.clone());
        }
    }

    thread::sleep(Duration::from_millis(1));
    let directory_map = GLOBAL_DATA.directory_map.lock().unwrap();
    if let Some(data) = directory_map.get(&path) {
        return Ok(HttpResponse::Ok()
            .append_header(("Access-Control-Allow-Origin", "*"))
            .append_header(("Access-Control-Allow-Methods", "GET, POST"))
            .json(ApiResponse::<DirectoryListing> {
                status: "success".to_string(),
                message: "La solicitud se completó correctamente.".to_string(),
                data: DirectoryListing {
                    path: data.listing.path.clone(),
                    directories: data.listing.directories.clone(),
                    files: data.listing.files.clone(),
                },
            }));
    } else {
        return Ok(HttpResponse::Ok()
            .append_header(("Access-Control-Allow-Origin", "*"))
            .append_header(("Access-Control-Allow-Methods", "GET, POST"))
            .body("body"));
    }
}

pub fn configure_services(cfg: &mut web::ServiceConfig) {
    cfg.service(get_directory_listing);
}
