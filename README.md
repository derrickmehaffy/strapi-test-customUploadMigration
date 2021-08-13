# Custom controllers to create upload plugin entries

This sample application shows how you could take the response from one Strapi instance and pass it to another via the `POST /custom` and strip out any fields which may cause a conflict.

It will then push the data into the database and return to you the full response so you can relink a media to another entry in a model.

The Custom POST controller supports an array of uploads or just a single object. I also included a simple fetch which allows you to pass in multiple IDs like `GET /custom?id=1&id=2`
