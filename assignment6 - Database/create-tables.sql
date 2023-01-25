-- in database syntax, two dashes mean a one-line comment (i.e., not
-- interpreted by the database)


CREATE TABLE A01167248_user (
  ID int NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  password VARCHAR(50),
  PRIMARY KEY (ID)
);

-- 1:1 with user table/entity
CREATE TABLE A01167248_user_timeline (
  TLID int NOT NULL AUTO_INCREMENT,
  date_of_post date NULL,
  text_contents VARCHAR(50) NULL,
  text_time time NULL,
  text_views int(11) NULL,
  user_id int NOT NULL,
  PRIMARY KEY (TLID),
  FOREIGN KEY (user_id) REFERENCES A01167248_user(ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE cart (
  ID int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  -- 0 = started, 1 = completed
  state int NOT NULL,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ID),
  -- UPDATE/DELETE CASCADE = allow cascading operation, UPDATE/DELETE RESTRICT = disallow cascading operation
  FOREIGN KEY (user_id) REFERENCES user(ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE item (
  ID int NOT NULL AUTO_INCREMENT,
  cart_id INT NOT NULL,
  -- stock keeping unit
  SKU VARCHAR(100) NOT NULL,
  item_price  numeric(15, 2) NOT NULL,
  quantity INT NOT NULL,
  description VARCHAR(100) NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (cart_id) REFERENCES cart(ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE product (
  ID int NOT NULL AUTO_INCREMENT,
  -- stock keeping unit
  SKU VARCHAR(100) NOT NULL,
  item_price  numeric(15, 2) NOT NULL,
  description VARCHAR(100) NOT NULL,
  PRIMARY KEY (ID)
);
