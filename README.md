# ListItemBackend
Backend for ListItem Project (Server, API and Database)

Working with following technologies: **NodeJS, Express and MongoDB(Atlas)**.

## Previous Requirements

1. You'll need a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account they have a free tier for personal projects.
2. Change the password in the **nodemon.json** file and write the pass for your account:
```
{
  "env": {
    "MONGO_ATLAS_PASS": "Your_Password"
  }
}
```
3. Change the connection in the **app.js** file:
```
mongoose.connect(
  'mongodb://YourUser:' 
  + process.env.MONGO_ATLAS_PASS + 
  '@YourDatabases-Shards'
);
```

## Running this Project in Development Enviroment
1. Installing Dependencies:
```
npm install
```
2. Running the server:
```
npm run start:dev
```

## Making HTTP Request to the API
If youre a console or terminal fan i strongly recommend you to use [HTTPie](https://httpie.org/).
On the other hand if youre a graphical person you can use [Postman](https://www.getpostman.com/).

...See Ya!!
