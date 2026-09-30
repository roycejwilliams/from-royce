-- Schema only. Never seed or replace owner content.
CREATE TABLE IF NOT EXISTS project (
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
CREATE UNIQUE INDEX IF NOT EXISTS project_slug_idx ON project (slug);
