
SELECT * FROM user;
SELECT first_name, last_name FROM user;
SELECT * FROM user WHERE first_name='arron' AND last_name='ferguson';
SELECT * FROM user WHERE first_name='arron' OR first_name='jim';
SELECT * FROM user WHERE first_name='arron' OR first_name='jim' ORDER BY last_name, first_name ASC;
SELECT * FROM user WHERE last_name LIKE 'f%';
SELECT * FROM user WHERE first_name LIKE '%ar%';
SELECT * FROM user WHERE first_name IN ('arron', 'jim');
SELECT * FROM cart WHERE user_id = 1 AND state = 0;

