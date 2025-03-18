 ### ***ClockIT***

## Project Overview
This application facilitates clocking in and out at a worksite using ***QR codes***.
The front-end is built using *React* with *Vite*, and the back-end is developed using *Node.js* with *Express.js*. The project supports HTTPS using `mkcert` for generating local SSL certificates.
 The workflow is as follows:

- ***Users*** log into the app, generate a temporary QR code and present it to an on-site reader.

- ***Admins*** log into the app and have a scanner available to scan QR codes and manage attendance.

 There is demo data already created for a user and an admin account:

>User -> username && password = 'user'


>Admin -> username && password = 'admin'

## Prerequisites
Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Recommended: LTS version)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) (Package manager)
- [mkcert](https://github.com/FiloSottile/mkcert) (For local HTTPS support)



## 1 - Installation

### 1.1 - Clone the repository:

```
git clone https://github.com/TomasDeSousaTeixeira/myFirstPublicRepo.git
cd clock-it
```

### 1.2 - Install dependencies:

```
npm install
(or use `pnpm install` if you prefer pnpm)
```

## 2 - Setting Up HTTPS (front-end)

### 2.1 - Install `mkcert` globally if you haven't already:

```
mkcert -install
```

### 2.2 - Generate a local SSL certificate inside the project:

```
mkcert localhost
```

This will generate `localhost.pem` and `localhost-key.pem` files.

## 3 - Running the Project

### 3.1 - To start the development server:

```
npm run dev 
(or `pnpm dev` if using pnpm)
```


This will start the Vite development server at `https://localhost:5173/`.


## 4 - Navigate to the back-end directory:
```
cd clock-it-API
```
## 4.1 - Install dependencies:
```
npm install
(or `pnpm install` if using pnpm)
```

## 5 - Setting Up HTTPS (back-end)

### 5.1 - Install `mkcert` globally if you haven't already:

```
mkcert -install
```

### 5.2 - Generate a local SSL certificate inside the project:

```
mkcert localhost
```

This will generate `localhost.pem` and `localhost-key.pem` files.

## 6 - Database Setup (SQLite)

The back-end uses SQLite, which does not require a separate installation, just the sqlite3 that should be installed after 4.1.
The demo database file `testDatabase.db` is already included in the project.

## 7 - Create a `.env.local` file in the root of the project

### 7.1 - Set up a secret key in the `.env.local` for encryption and decryption:
```
SECRET_KEY="teste" 
```
**(secret key has to be 'teste' so that the passwords already defined in the demo database work for 'user' and 'admin')*

## 8 - Running the Back-End Server

To start the API server, run:
```
npm start
(or use `pnpm start` if you prefer pnpm)
```
By default, the API will run on http://localhost:5000/.
