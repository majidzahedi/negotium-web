// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;

#[tauri::command]
fn greet(name: &str) -> String {
    println!("{name}");
    format!("Hello, {}!", name)
}

#[tauri::command]
fn get_music_list(directory: String) -> Vec<String> {
    let music_files: Vec<String> = fs::read_dir(directory)
        .unwrap()
        .filter_map(|entry| {
            entry.ok().and_then(|e| {
                let path = e.path();
                if path.is_file() && path.extension().map_or(false, |ext| ext == "mp3") {
                    Some(path.display().to_string())
                } else {
                    None
                }
            })
        })
        .collect();

    music_files
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_music_list])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
