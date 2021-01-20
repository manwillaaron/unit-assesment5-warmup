SELECT * FROM user_info ui
JOIN user_username uu USING(username_id)
WHERE uu.username_id = $1;