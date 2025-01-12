DROP TRIGGER IF EXISTS update_product_stock
GO;

CREATE TRIGGER update_product_stock
ON order_details
AFTER INSERT
AS
BEGIN
    UPDATE products
    SET stock = stock - inserted.quantity
    FROM products
        INNER JOIN inserted ON products.id = inserted.products_id
END
GO; 