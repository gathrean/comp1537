-- in database syntax, two dashes mean a one-line comment (i.e., not
-- interpreted by the database)



ALTER TABLE user ADD middle_name VARCHAR(80);
ALTER TABLE user MODIFY middle_name VARCHAR(60);
-- ALTER TABLE user DROP COLUMN last_name;
