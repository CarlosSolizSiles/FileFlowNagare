use actix::AsyncContext;
use actix_web_actors::ws::WebsocketContext;
use lazy_static::lazy_static;
use serde::Serialize;
use serde_json::Value;
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
    id: i64,
    path: String,
    directories: Vec<String>,
    files: Vec<String>,
}

#[derive(Serialize)]
pub struct DirectoryListingData {
    error: bool,
    is_completed: bool,
    listing: DirectoryListing,
    show: bool,
}

#[derive(Serialize)]
pub struct ApiResponse<T> {
    status: String,
    message: String,
    data: T,
}

fn send_directory_listing<A: actix::Actor<Context = WebsocketContext<A>>>(
    ctx: &mut WebsocketContext<A>,
    id: i64,
    path: &str,
) {
    let mut directory_map = GLOBAL_DATA.directory_map.lock().unwrap();
    if let Some(data) = directory_map.get_mut(path) {
        if data.show == true {
            ctx.text(
                serde_json::to_string(&DirectoryListing {
                    id: id,
                    path: data.listing.path.clone(),
                    directories: data.listing.directories.clone(),
                    files: data.listing.files.clone(),
                })
                .unwrap(),
            );
            data.show = false;
        }
        if data.is_completed {
            // directory_map.remove(path);
            ctx.text(
                serde_json::to_string(&DirectoryListing {
                    id: id,
                    path: data.listing.path.clone(),
                    directories: data.listing.directories.clone(),
                    files: data.listing.files.clone(),
                })
                .unwrap(),
            );
            return;
        }
    }
    let path_clone = path.to_owned();
    ctx.run_later(
        Duration::from_millis(0),
        move |_act, ctx: &mut WebsocketContext<A>| send_directory_listing(ctx, id, &path_clone),
    );
}

fn create_directory_listing(path: String) -> thread::JoinHandle<()> {
    let path_clone = path.clone();

    let handle: thread::JoinHandle<()> = thread::spawn(move || {
        let path_origin = Path::new(&path_clone);
        if let Err(_) = read_dir(&path_origin) {}
        match read_dir(&path_origin) {
            Ok(read_dir) => {
                for entry in read_dir {
                    let mut directory_map = GLOBAL_DATA.directory_map.lock().unwrap();
                    match entry {
                        Ok(entry) => {
                            if let Some(name) = entry.file_name().to_str() {
                                if entry.path().is_dir() {
                                    if let Some(data) = directory_map.get_mut(&path) {
                                        data.show = true;
                                        data.listing.directories.push(name.to_string())
                                    }
                                } else {
                                    if let Some(data) = directory_map.get_mut(&path) {
                                        data.show = true;
                                        data.listing.files.push(name.to_string())
                                    }
                                }
                            }
                        }
                        Err(_) => {}
                    }
                }
            }
            Err(_error) => {
                let mut directory_map = GLOBAL_DATA.directory_map.lock().unwrap();
                directory_map.remove(&path);
            }
        }

        let mut directory_map = GLOBAL_DATA.directory_map.lock().unwrap();
        if let Some(data) = directory_map.get_mut(&path) {
            data.is_completed = true;
        }
    });
    handle
}

pub fn get_directory<A: actix::Actor<Context = WebsocketContext<A>>>(
    ctx: &mut WebsocketContext<A>,
    id: i64,
    arguments: Value,
) {
    {
        let path = arguments["path"].as_str().unwrap();
        {
            let mut directory_map = GLOBAL_DATA.directory_map.lock().unwrap();
            if !directory_map.contains_key(path) {
                directory_map.insert(
                    path.to_string(),
                    DirectoryListingData {
                        error: false,
                        is_completed: false,
                        listing: DirectoryListing {
                            id: id,
                            path: path.to_string(),
                            directories: Vec::new(),
                            files: Vec::new(),
                        },
                        show: false,
                    },
                );
                create_directory_listing(path.to_string());
            }
        }
    }
    ctx.run_later(
        Duration::from_millis(1),
        move |_act, ctx: &mut WebsocketContext<A>| {
            send_directory_listing(ctx, id, arguments["path"].as_str().unwrap());
        },
    );
}
