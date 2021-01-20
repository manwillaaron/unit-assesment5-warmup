insert into user_hash (username_id, hash)
VALUES ($1, $2);

INSERT INTO user_info(email, name, username_id)
VALUES ($3, $4, $1);

SELECT * FROM user_username uu
LEFT JOIN user_info ui USING(username_id)
WHERE uu.username_id = $1;