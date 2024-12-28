CREATE VIEW vw_users
AS
    SELECT u.*, r.id  AS [role.id], r.name AS [role.name], s.id AS [status.id], s.name AS [status.name]
    FROM users u
        LEFT JOIN role r ON u.role_id = r.id
        LEFT JOIN status s ON u.status_id = s.id
GO

DROP VIEW if exists vw_products;
GO
CREATE VIEW vw_products
AS
    SELECT p.*, u.id  AS [user.id], u.email AS [user.email], s.id AS [status.id], s.name AS [status.name]
    FROM products p
        LEFT JOIN users u ON p.user_id = u.id
        LEFT JOIN status s ON p.status_id = s.id
GO

DROP VIEW IF EXISTS vw_categories;
GO
CREATE VIEW vw_categories
AS
    SELECT pc.*, u.id AS [user.id], u.email AS [user.email], s.id AS [status.id], s.name AS [status.name]
    FROM products_categories pc
        LEFT JOIN users u ON u.id = pc.user_id
        LEFT JOIN status s ON pc.status_id = s.id
GO