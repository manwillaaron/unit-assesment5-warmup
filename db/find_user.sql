SELECT * FROM user_username uu
JOIN user_hash up USING(username_id)
WHERE uu.username_id = $1;