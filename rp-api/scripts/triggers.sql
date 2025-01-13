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


DROP TRIGGER IF EXISTS aumentar_stock;
GO;

CREATE TRIGGER [dbo].[aumentar_stock]
ON [dbo].[order]
AFTER UPDATE
AS
BEGIN
    IF UPDATE(status_id) AND (SELECT status_id
        FROM inserted) = 5
    BEGIN
        DECLARE @order_id INT
        SELECT @order_id = id
        FROM inserted
        UPDATE products
        SET stock = stock + quantity
        FROM products
            JOIN order_details ON  products.id =  order_details.products_id
        WHERE order_details.order_id = @order_id
    END
END
 
GO
ALTER TABLE [order] ENABLE TRIGGER [aumentar_stock]
GO
