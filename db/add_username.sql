INSERT INTO user_username (username)
VALUES ($1)
RETURNING username_id;

