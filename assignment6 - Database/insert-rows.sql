

INSERT INTO user (ID, user_name, first_name, last_name, password) VALUES (1, 'jparry', 'jim', 'parry', 'java');
INSERT INTO user (ID, user_name, first_name, last_name, password) VALUES (2, 'a-aron', 'arron', 'ferguson', 'a123');
INSERT INTO user (ID, user_name, first_name, last_name, password) VALUES (3, 'donna', 'donna', 'turner', 'a123');
INSERT INTO user (ID, user_name, first_name, last_name, password) VALUES (4, 'jason', 'jason', 'wilder', 'a123');
INSERT INTO user (ID, user_name, first_name, last_name, password) VALUES (5, 'keith', 'keith', 'tang', 'a123');
INSERT INTO user (ID, user_name, first_name, last_name, password) VALUES (6, 'arnold', 'arnold', 'schwarzenegger ', 'illbeback');


INSERT INTO address (user_id, street, postal_code) VALUES (2, '123 street', 'x1x1x1');
INSERT INTO address (user_id, street, postal_code) VALUES (2, '456 ave', 'y2y2y2');

INSERT INTO cart (user_id, state) VALUES (1, 0);
INSERT INTO cart (user_id, state) VALUES (1, 1);

INSERT INTO item (SKU, cart_id, item_price, quantity, description) VALUES ('sk-2843y', 1, 14.99, 1, 'toaster');
INSERT INTO item (SKU, cart_id, item_price, quantity, description) VALUES ('sk-327623z', 2, 3.99, 2, 'napkins');
INSERT INTO item (SKU, cart_id, item_price, quantity, description) VALUES ('sk-438s3x', 2, 1.99, 5, 'coffee cups');

INSERT INTO product (SKU, item_price, description) VALUES ('sk-2843y', 14.99, 'toaster');
INSERT INTO product (SKU, item_price, description) VALUES ('sk-327623z', 3.99, 'napkins');
INSERT INTO product (SKU, item_price, description) VALUES ('sk-438s3x', 1.99, 'coffee cups');
