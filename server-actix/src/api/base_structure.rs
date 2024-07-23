use serde::Serialize;

#[derive(Serialize)]
pub struct DataDirectory {
    pub path: String,
    pub dirs: Vec<String>,
    pub files: Vec<String>,
}

#[derive(Serialize)]
pub struct OkApiResponse {
    pub status: String,
    pub message: String,
    pub data: DataDirectory,
}

#[derive(Serialize)]
pub struct ErrorApiResponse {
    pub status: String,
    pub message: String,
    pub data: String,
}
