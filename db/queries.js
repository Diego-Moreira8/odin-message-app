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

module.exports = {
  getMessages,
};
