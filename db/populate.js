#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE,
  password TEXT
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'Dev') THEN
    INSERT INTO users (username, password) VALUES 
      ('Dev', '${process.env.DEV_PASSWORD}');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM messages WHERE text = 'Hello, World!') THEN
    INSERT INTO messages (user_id, text) VALUES
      ((SELECT id FROM users WHERE username = 'Dev'), 'Hello, World!'),
      ((SELECT id FROM users WHERE username = 'Dev'), 'Dev here.'),
      ((SELECT id FROM users WHERE username = 'Dev'), 'Bye!');
  END IF;
END $$;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
