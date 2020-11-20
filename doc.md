**REGISTER USER (CUSTOMER)**

----
  `Register User as Customer on server`

* **URL**

  `/register`

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `email=[string]`,
  `password=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{"id":7,"email":"Doe@mail.com"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"msg":"email must be unique"}, {"msg":"Password is required!, Password length minimal 6 characters!"}, {"msg":"Email is required!, Please use email format!"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"msg":"Internal Server Error"}`

**LOGIN USER**

----
  `User login to server`

* **URL**

  `/login`

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `email=[string]`,
  `password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNTEwMTQwNH0.oRaLN1r017TNKtxGVllQPKpToNKDjp_ml9aX5wPwP3s"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"msg":"wrong email/password"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"msg":"Internal Server Error"}`



**ADD PRODUCT**

----
  `Add product to database`

* **URL**

  `/products`

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `name=[string]`,
  `image_url=[string]`,
  `price=[integer]`,
  `stock=[integer]`

* **Headers**

  **Required:**

  `access_token=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{"msg":"Nokia 6.1 Plus has been added"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"msg":"Please login first!"}, {"msg":"Name is required!, Image url is required!, Please use url format!, Price must number!, Stock must number!"}`

  OR

    * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"msg":"Please login as Admin!"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"msg":"Internal Server Error"}`


**GET ALL PRODUCTS**

----
  `Get all products in database`

* **URL**

  `/products`

* **Method:**

  `GET`

* **Headers**

  **Required:**

  `access_token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"msg":[{"id":2,"name":"Nokia 6.1 Plus","image_url":"https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1","price":2400000,"stock":10},{"id":3,"name":"Nokia 6.1 Pluss","image_url":"https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1","price":2400000,"stock":10},{"id":4,"name":"Nokia 6.1 Pluss","image_url":"https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1","price":2400000,"stock":10},{"id":5,"name":"Nokia 6.1 Plusssssss","image_url":"https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1","price":2400000,"stock":10},{"id":6,"name":"Nokia 6.1 Plus Blue","image_url":"https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1","price":2400000,"stock":10}]}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"msg":"Please login first!"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"msg":"Internal Server Error"}`

**GET PRODUCT BY ID**

----
  `Get product by id`

* **URL**

  `/products/:id`

* **Method:**

  `GET`

* **URL Params**

  **Required:**

  `id=[integer]`

* **Headers**

  **Required:**

  `access_token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"data":{"id":5,"name":"Redmi Note 8","image_url":"https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//93/MTA-8613560/xiaomi_xiaomi_redmi_note_8_smartphone_-64_gb-_4_gb-_garansi_resmi_full01_t8sbogf6.jpg","price":3000000,"stock":3,"createdAt":"2020-11-19T06:23:39.897Z","updatedAt":"2020-11-20T04:00:11.234Z","UserId":null}}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"msg":"Please login first!"}`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"msg":"Product id 55 not found"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"msg":"Internal Server Error"}`

**UPDATE PRODUCT**

----
  `Update product by id product`

* **URL**

  `/products/:id`

* **Method:**

  `PUT`

* **URL Params**
  
  **Required:**

  `id=[integer]`


* **Data Params**

  **Required:**

  `name=[string]`,
  `image_url=[string]`,
  `price=[integer]`,
  `stock=[integer]`,

* **Headers**

  **Required:**

  `access_token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"msg":"Nokia 6.1 Plus has been updated"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"msg":"Please login first!"}, {"msg":"Name is required!, Image url is required!, Please use url format!, Price must number!, Stock must number!"}`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"msg":"Product id 2 not found"}`

  OR

    * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"msg":"You not allowed to do this action"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"msg":"Internal Server Error"}`


**DELETE PRODUCT**

----
  `Delete product by id product`

* **URL**

  `/products/:id`

* **Method:**

  `DELETE`

* **URL Params**
  
  **Required:**

  `id=[integer]`

* **Headers**

  **Required:**

  `access_token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"msg":"Product has been deleted"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"msg":"Please login first!"}`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"msg":"Product id 2 not found"}`

  OR

    * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"msg":"You not allowed to do this action"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"msg":"Internal Server Error"}`


**ADD PRODUCT TO CART**

----
  `Add product to cart`

* **URL**

  `/carts/:id`

* **Method:**

  `POST`

* **URL Params**

  **Required:**

  `id=[integer]`

* **Headers**

  **Required:**

  `access_token=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{"cart":[{"id":28,"quantity":1,"ProductId":7,"UserId":2,"updatedAt":"2020-11-18T10:28:14.377Z","createdAt":"2020-11-18T10:28:14.377Z","status":false},true]}`

  OR

  * **Code:** 200 <br />
    **Content:** `{"cart":[{"id":28,"quantity":2,"status":false,"createdAt":"2020-11-18T10:28:14.377Z","updatedAt":"2020-11-18T10:40:36.493Z","ProductId":7,"UserId":2}]}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"msg":"Please login first!"}`

  OR

    * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"msg":"Please login as Customer!"}`

  OR

    * **Code:** 403 FORBIDDEN <br />
    **Content:** `{"msg":"Not enough stock!"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"msg":"Internal Server Error"}`


**GET ALL PRODUCTS IN CART**

----
  `Get all products in cart`

* **URL**

  `/carts`

* **Method:**

  `GET`

* **Headers**

  **Required:**

  `access_token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"carts":[{"id":9,"quantity":10,"status":false,"createdAt":"2020-11-18T07:27:02.509Z","updatedAt":"2020-11-18T09:46:47.834Z","ProductId":4,"UserId":2,"Product":{"id":4,"name":"Nokia 6.1 Pluss","image_url":"https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1","price":2400000,"stock":10,"createdAt":"2020-11-17T11:09:42.174Z","updatedAt":"2020-11-17T11:09:42.174Z","UserId":1}},{"id":23,"quantity":10,"status":false,"createdAt":"2020-11-18T09:10:54.624Z","updatedAt":"2020-11-18T09:38:44.118Z","ProductId":5,"UserId":2,"Product":{"id":5,"name":"Nokia 6.1 Plusssssss","image_url":"https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1","price":2400000,"stock":10,"createdAt":"2020-11-17T11:14:02.130Z","updatedAt":"2020-11-17T11:14:02.130Z","UserId":1}},{"id":27,"quantity":3,"status":false,"createdAt":"2020-11-18T10:23:53.330Z","updatedAt":"2020-11-18T10:24:13.546Z","ProductId":6,"UserId":2,"Product":{"id":6,"name":"Nokia 6.1 Plus Blue","image_url":"https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1","price":2400000,"stock":10,"createdAt":"2020-11-17T11:20:30.943Z","updatedAt":"2020-11-17T11:20:30.943Z","UserId":1}},{"id":8,"quantity":1,"status":false,"createdAt":"2020-11-18T04:45:46.191Z","updatedAt":"2020-11-18T06:46:04.638Z","ProductId":3,"UserId":2,"Product":{"id":3,"name":"Nokia 6.1 Plus","image_url":"https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1","price":2000000,"stock":1,"createdAt":"2020-11-17T11:04:35.761Z","updatedAt":"2020-11-17T11:55:20.839Z","UserId":1}},{"id":28,"quantity":2,"status":false,"createdAt":"2020-11-18T10:28:14.377Z","updatedAt":"2020-11-18T10:40:36.493Z","ProductId":7,"UserId":2,"Product":{"id":7,"name":"Nokia 6.1 Plus Blueeee","image_url":"https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1","price":2400000,"stock":10,"createdAt":"2020-11-17T11:59:25.321Z","updatedAt":"2020-11-17T11:59:25.321Z","UserId":1}}]}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"msg":"Please login first!"}`

  OR

    * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"msg":"Please login as Customer!"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"msg":"Internal Server Error"}`


**UPDATE PRODUCT IN CART**

----
  `Update product in cart`

* **URL**

  `/carts/:id`

* **Method:**

  `PATCH`

* **URL Params**

  **Required:**

  `id=[integer]`

* **Data Params**

  **Required:**

  `quantity=[integer]`

* **Headers**

  **Required:**

  `access_token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"cart":{"id":9,"quantity":9,"status":false,"createdAt":"2020-11-18T07:27:02.509Z","updatedAt":"2020-11-18T10:57:56.402Z","ProductId":4,"UserId":2}}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"msg":"Please login first!"}, {"msg":"Input must number!"},{"msg":"Quantity must higher than 0"}`

  OR

    * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"msg":"Please login as Customer!"}, {"msg":"You not allowed to do this action"}`
  
  OR

    * **Code:** 403 FORBIDDEN <br />
    **Content:** `{"msg":"Not enough stock!"}`

  OR

    * **Code:** 404 NOT FOUND <br />
    **Content:** `{"msg":"Cart id 99 not found"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"msg":"Internal Server Error"}`

**DELETE PRODUCT IN CART**

----
  `Delete product in cart`

* **URL**

  `/carts/:id`

* **Method:**

  `DELETE`

* **URL Params**

  **Required:**

  `id=[integer]`

* **Headers**

  **Required:**

  `access_token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"msg":"Your product has removed from cart"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"msg":"Please login first!"}`

  OR

    * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"msg":"Please login as Customer!"},{"msg":"You not allowed to do this action"}`

  OR

    * **Code:** 404 NOT FOUND <br />
    **Content:** `{"msg":"Cart id 99 not found"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"msg":"Internal Server Error"}`