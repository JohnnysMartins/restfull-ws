create database restfull_ws;
create database restfull_ws_test;
create table categorias(id int(11) unsigned not null auto_increment, name VARCHAR(255), primary key(id));
create table usuarios(
    id int(11) unsigned not null auto_increment, 
    email VARCHAR(255),
    senha VARCHAR(40),
    primary key(id)
);