-- Performing a JOIN
SELECT address.street, address.postal_code FROM address INNER JOIN user ON address.user_id = user.ID AND user.first_name = 'arron';

-- Performing a SUBQUERY
SELECT address.street, address.postal_code FROM address WHERE user_id IN
                (SELECT ID FROM user WHERE first_name = 'arron');

-- use whichever feels more comfortable for you
