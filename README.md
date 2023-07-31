# Express Auth Example

## Intro

This is an example of authentication with Node.js and Express.js using **Json Web Tokens** (also called JWT).

For this example I used **MongoDB** (with mongoose as ORM), **Docker** and, of course Express.js.

---

## Usage

### Running proyect

**Is required you have docker and docker compose installed!**

```bash
git clone https://github.com/KytnaCode/auth-express-example.git # clone repo
cd auth-express-example # get into project's folder

docker-compose up # start app
```
The app should now be running in port 3000. Remember that the app runs in port specified in the docker-compose.yml file, not the port displayed in the console (by default console displays port 4000).

### Endpoints

To see endpoints go to `/api-docs`
 
---

## Used Packages

### Runtime dependencies

+ **Express** as web framework.
+ **Mongoose** for database connection.
+ **Node Forge** for hasing.
+ **jose** for JWT sign and verify.
+ **winston** as logger.
+ **dotenv** for load environment variables from .env file.
+ **swagger** with `swagger-ui-express` for api documentation.
+ **yaml** for parse yaml files.

### Development Dependencies

+ **pnpm** as package manager.
+ **typescript** as programing language.
+ **eslint** for code linting.
+ **nodemon** for hot-reload.
+ **rimraf** for cleaning chache, logs, and dist files.
+ **concurrently** to execute multiple shell commands simultaneously.
+ **copyfiles** to copy the swagger config to dist in a multiplatform way.

---

## About Me

I'm Alejandro Paz Gómez, you can call me **kytnacode**, I'm a teenager developer and student, learning javascript and typescript for now, with only three years in the software development world.  