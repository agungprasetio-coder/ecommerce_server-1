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


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{"msg":"Nokia 6.1 Plus has been added"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"msg":"Please login first!"}, {"msg":"Name is required!, Image url is required!, Please use url format!, Price must number!, Stock must number!"}`

  OR

    * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"msg":"You not allowed to do this action"}`

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

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"msg":[{"name":"Nokia 6.1 Plus","image_url":"https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1","price":2400000,"stock":10}]}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"msg":"Please login first!"}`

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