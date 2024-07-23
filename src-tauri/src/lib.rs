#[cfg_attr(mobile, tauri::mobile_entry_point)]
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
use rayon::prelude::*;
use server_actix::server_actix;
use std::fs;
use std::path::Path;
use std::time::Instant;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn fetch_directory(path: String) -> Vec<Vec<String>> {
    let start = Instant::now();
    let mut directories: Vec<String> = Vec::new();
    let mut files: Vec<String> = Vec::new();

    if let Ok(entries) = fs::read_dir(&path) {
        let entries: Vec<_> = entries.filter_map(|e| e.ok()).collect();

        let (dirs, fils): (Vec<_>, Vec<_>) = entries.into_par_iter().partition_map(|entry| {
            let path = entry.path();
            let name = entry.file_name().to_string_lossy().to_string();
            if path.is_dir() {
                rayon::iter::Either::Left(name)
            } else {
                rayon::iter::Either::Right(name)
            }
        });

        directories = dirs;
        files = fils;
    }

    // Ordenar ambos vectores por nombre
    directories.par_sort();
    files.par_sort();

    let duration = start.elapsed();
    println!("Tiempo de ejecución: {:?}", duration);

    vec![directories, files]
}

#[tauri::command]
async fn is_folder(path: String) -> bool {
    let path_clone = path.clone(); // Crear una variable local para la ruta clonada
    let path_file = Path::new(&path_clone);
    path_file.is_dir()
}

pub fn run() {
    tauri::Builder::default()
        .setup(|_app| {
            server_actix(10000).expect("puertos ocupados");

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![fetch_directory, is_folder])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
