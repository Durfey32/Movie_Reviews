CREATE DATABASE movie_review;

USE movie_review;

CREATE TABLE movie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
);

CREATE TABLE review (
    id INT PRIMARY KEY AUTO_INCREMENT,
    movie_id INT NOT NULL,
    review TEXT,
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE
);