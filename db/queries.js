const pool = require("./pool");

async function getMessages() {
  const { rows } = await pool.query(`
    SELECT m.text, u.username, m.created_at
    FROM messages AS m
    INNER JOIN users AS u
    ON m.user_id = u.id
  `);

  return rows;
}

async function newMessage(text) {
  await pool.query(
    `
      INSERT INTO messages (user_id, text) VALUES
        ((SELECT id FROM users WHERE username = 'Dev'), $1)
    `,
    [text]
  );
}

module.exports = {
  getMessages,
  newMessage,
};
