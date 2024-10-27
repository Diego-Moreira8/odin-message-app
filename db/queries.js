const pool = require("./pool");

async function getMessages() {
  const { rows } = await pool.query(`
    SELECT m.text, u.username, m.created_at
    FROM messages AS m
    INNER JOIN users AS u
    ON m.user_id = u.id
    ORDER BY created_at DESC
  `);

  return rows;
}

async function authenticate(username, password) {
  const { rows } = await pool.query(
    `
      SELECT * FROM users
      WHERE username = $1 AND password = $2;
    `,
    [username, password]
  );

  return rows.length > 0;
}

async function signUpUser(username, password) {
  await pool.query(
    `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
    `,
    [username, password]
  );
}

async function newMessage(user, text) {
  await pool.query(
    `
      INSERT INTO messages (user_id, text) 
      VALUES ((SELECT id FROM users WHERE username = $1), $2)
    `,
    [user, text]
  );
}

module.exports = {
  getMessages,
  authenticate,
  signUpUser,
  newMessage,
};
