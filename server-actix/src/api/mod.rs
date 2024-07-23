mod execute_apps;
mod file_system;
mod server_port;
mod test;

use actix_web::web;

pub fn configure_services(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/file_system").configure(file_system::configure_services))
        .service(web::scope("/server_port").configure(server_port::configure_services))
        .service(web::scope("/test").configure(test::configure_services))
        .service(web::scope("/apps").configure(execute_apps::configure_services));
}
