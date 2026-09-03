CREATE DATABASE blog;

CREATE TABLE post (
    post_id SERIAL PRIMARY KEY,
    post_title VARCHAR(500) NOT NULL,
    post_content TEXT NOT NULL,
    post_image VARCHAR(255),
    post_date DATE DEFAULT CURRENT_DATE,
    post_time TIME DEFAULT CURRENT_TIME,
    slug VARCHAR(500) NOT NULL
);

CREATE UNIQUE INDEX post_slug_idx ON post (slug);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    descriptor TEXT NOT NULL,
    role VARCHAR(255) NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    year VARCHAR(10) NOT NULL,
    src VARCHAR(500) NOT NULL,
    live_url VARCHAR(500),
    stack TEXT,
    status TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX project_slug_idx ON project (slug);

SELECT
    post_id,
    post_title,
    post_content,
    post_image,
    TO_CHAR(post_date, 'MM:DD:YY') AS formatted_date,
    TO_CHAR(post_time, 'HH12:MI AM') AS formatted_time
FROM post

