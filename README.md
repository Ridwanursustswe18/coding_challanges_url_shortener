# coding_challanges_url_shortener
- It is web application that shortens long urls.
# how to run the project
- First install node.js and express.js.
- Then setup a firebase database to store the urls.
- Setup Nginx to use reverse proxy. click [here](https://docs.google.com/document/d/19Cy_NqNuf83Uvbkxg93hJIyJmHhnU0cSPjrZld45jtE/edit?usp=sharing) to setup the proxy server.
# what it does
- it takes long urls and generate key and attach it with short url and store long-url,short-url and key in database.
- key is genrated by hashing the long url with 'sha-256' algorithm and encode in 'base64'. I also handled if a same key is genrated and i maintaned a hash-set to go through if a same key exists. If it exists then it is re-hashed again.
- After that short-url given will re-direct to the actual website.
- Stored url can also be deleted.
- errors are also handled for all cases.
# technologies used
- Javascript, node.js, express.js, firebase, nginx.   