# rp-api
Proyecto para el concurso
Dependecies: multer, express, dotenv, boom, joi, jwt, bcrypt 


#Create order espected data example
{
    "status_id": 1,
    "full_name": "John Doe",
    "address": "123 Main St",
    "phone_number": "123-456-7890",
    "email": "test@mail.com",
    "delivery_date": "2021-12-31",
    "total_order": 42.97,
    "order_details": [
        {
            "products_id": 1,
            "quantity": 2,
            "price": 10.99,
            "subtotal": 30
        },
        {
            "products_id": 2,
            "quantity": 1,
            "price": 20.99,
            "subtotal": 10.99
        }
    ]
}