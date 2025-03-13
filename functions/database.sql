CREATE DATABASE blog;

CREATE TABLE post (
    post_id SERIAL PRIMARY KEY,
    post_title VARCHAR(500) NOT NULL,
    post_content TEXT NOT NULL,
    post_image VARCHAR(255),
    post_date DATE DEFAULT CURRENT_DATE,
    post_time TIME DEFAULT CURRENT_TIME
);

SELECT 
    post_id,
    post_title,
    post_content,
    post_image,
    TO_CHAR(post_date, 'MM:DD:YY') AS formatted_date,
    TO_CHAR(post_time, 'HH12:MI AM') AS formatted_time
FROM post

