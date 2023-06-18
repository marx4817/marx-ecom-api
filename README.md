This is a simple API for an online store

You must configure your .env file like that to use this project
DB_USER = your db user
DB_PASSWORD = user db password
DB_PORT = your db port
DB_NAME = your db name

PORT=8080

ACCESS_SECRET=sjdmjddcjddjjd
ACCESS_EXPIRED_TIME=120

REFRESH_SECRET=djdkdfkdkf
REFRESH_EXPIRED_TIME=300

the models

Models:
**users**:
    id: _[(pk), varchar, maxLength=100, not null]_
    email: _[ varchar, maxLength=250, not null]_
    password: _[varchar, maxLength=250, not null]_
    role: _[varchar maxLength=10, default(client), not null]_
    date_joined: _[DateTamps, not null]_
    last_loging: _[DateTapms, not null]_

**profils**:
    id: _[(pk), varchar, maxLength=100, not null]_
    user_id: _[(fk), references **users**(id), not null restrict]_
    last_name: _[varchar, maxLength=100]_
    first_name: _[ varchar, maxLength=250, ]_
    contry: _[varchar, maxLength=50,]_
    address: _[ varchar, maxLength=100]_
    birth: _[dateTamps]_
    photos:  _[ varchar, maxLength=250, ]_

**products**:
    id:  _[(pk), varchar, maxLength=100, not null]_
    name:  _[ varchar, maxLength=200, not null]_
    category:  _[(fk), references **categories**(id), not null, restrict]_
    description:  _[varchar, maxLength=1000, not null]_
    price:  _[number, not null]_
    old_price: _[number]_

**productPhotos**:
    id: _[(pk), varchar, maxLength=100, not null]_
    product_id:  _[(fk), references **products**(id), not null,on delete cascade]_
    name:  _[ varchar, maxLength=100, not null]_
    description:  _[(pk), varchar, maxLength=200]_
    url:  _[ varchar, maxLength=250, not null]_

**categories**:
    id:  _[(pk), varchar, maxLength=100, not null]_
    name:  _[varchar, maxLength=100, not null]_
    description:  _[varchar, maxLength=100,]_
    photo:  _[varchar, maxLength=100,]_

**stoks**:
    id: _[(pk), varchar, maxLength=100, not null]_
    product_id:  _[(fk), references **products**(id), not null, on delete cascade]_
    name:  _[varchar, maxLength=100]_
    description:  _[varchar, maxLength=300, ]_
    quantity:  _[integer, default(1), not null]_

**orders**:
    id:  _[(pk), varchar, maxLength=100, not null]_
    user_id:  _[(fk), references **users**(id), not null, on delete restrict]_
    sub_total:  _[decimal, default(0) not null]_
    discount:  _[decimal, default(0) not null]_
    tax:  _[decimal, default(0) not null]_
    total  _[decimal, default(0) not null]_

**order_products**:
    id:  _[(pk), varchar, maxLength=100, not null]_
    order_id:  _[(fk) references **orders**(id), not null, on delete cascade]_
    product_id:  _[(fk) references **products**(id), not null, on delete cascade]_
    price: _[dec, not null]_
    quantity: _[integer, default(1), not null]_

**carts**:
    id:  _[(pk), varchar, maxLength=100, not null]_
    user_id:  _[(fk), references **users**(id), not null, on delete restrict]_
    total: _[integer, default(0), not null]_

**cart_products**:
     id:  _[(pk), varchar, maxLength=100, not null]_
    order_id:  _[(fk) references **carts**(id), not null, on delete cascade]_
    product_id:  _[(fk) references **products**(id), not null, on delete cascade]_
    price: _[dec, not null]_
    quantity: _[integer, default(1), not null]_

**Payment**:
    id:  _[(pk), varchar, maxLength=100, not null]_
    order_id:  _[(fk) references **orders**(id), not null, on delete cascade]_
    user_id:  _[(fk) references **users**(id), not null, on delete restrict]_
    payment_type:   _[(fk) references **payment_types**(id), not null, on delete restrict]_
    total_to_pay:_[dec, not null]_
    discount: _[dec, default(0) not null]_
    cash: _[dec, not null]_
    tax: _[dec]_
    return: _[dec]_

**PaymentType**:
   id:  _[(pk), varchar, maxLength=100, not null]_
   name: _[varchar, maxLength=50, not null]_
   description:  _[varchar, maxLength=300]_

EndPoint:
    /: swagger documentation

    /api/auth/login: to login
    /api/auth/register: to signUp
    /api/auth/logout: to logout
    /api/auth/verify/password: to check a password
    /api/auth/verify/email/: to check an email
