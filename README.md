# ClockIT QR Code App (Front-End & Back-End)

## Project Overview
This application facilitates clocking in and out at a worksite using QR codes. The workflow is as follows:
- **Users** log into the app and generate a temporary QR code.
- They present this QR code to an on-site reader.
- **Admins** log into the app and have a scanner available to scan QR codes and manage attendance.

The front-end is built using React with Vite, and the back-end is developed using Node.js with Express.js. The front-end supports HTTPS using `mkcert` for generating local SSL certificates.

## Prerequisites
Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Recommended: LTS version)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) (Package manager)
- [mkcert](https://github.com/FiloSottile/mkcert) (For local HTTPS support)
- [PostgreSQL](https://www.postgresql.org/download/)(database)

----------FRONT-END----------

## 1 - Installation

### 1.1 - Clone the repository:

git clone https://github.com/TomasDeSousaTeixeira/myFirstPublicRepo.git
cd clock-it


### 1.2 - Install dependencies:

npm install
*(or use `pnpm install` if you prefer pnpm)*

## 2 - Setting Up HTTPS

### 2.1 - Install `mkcert` globally if you haven't already:

mkcert -install

### 2.2 - Generate a local SSL certificate inside the project:

mkcert localhost

This will generate `localhost.pem` and `localhost-key.pem` files.

## 3 - Running the Project

### 3.1 - To start the development server:

npm run dev 
*(or `pnpm dev` if using pnpm)*

This will start the Vite development server at `https://localhost:5173/`.

----------BACK-END----------

## 4 - Database Setup with PostgreSQL 

Navigate to the back-end directory:
cd clock-it-api

## 4.1 - Install dependencies:

npm install
*(or use `pnpm install` if you prefer pnpm)*

## 4.2 - Install PostgreSQL if not already installed:

Download PostgreSQL - https://www.postgresql.org/download/

## 4.3 - Create a new local database

## 4.4 - Create a `.env.local` file in the root of the project

## 4.5 - Set up environment variables for database connection in `.env.local` plus a secret key for encryption and decryption:

DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=5432
SECRET_KEY=your_secret_key

## 4.6 - Run database migrations:

npm run setup:postgres
*(or use `pnpm run setup:postgres` if you prefer pnpm)*

## 4.7 - Running the Back-End Server

To start the API server, run:

npm start
*(or use `pnpm start` if you prefer pnpm)*

By default, the API will run on http://localhost:5000/.

