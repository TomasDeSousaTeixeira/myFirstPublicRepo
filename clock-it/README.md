Front-End (React + Vite) Setup
---------------------------------
Project Overview

This is the front-end of the application, built using React with Vite as the development environment. 
It supports HTTPS using mkcert for generating local SSL certificates.
---------------------------------
Prerequisites:

Before running the project, ensure you have the following installed:

Node.js (Recommended: LTS version)

npm or pnpm (Package manager)

mkcert (For local HTTPS support)
---------------------------------
1 - Installation

 1.1-Clone the repository:

git clone https://github.com/your-repo/frontend.git
cd clock-it

 1.2-Install dependencies:

npm install

(or use pnpm install if you prefer pnpm)
---------------------------------
2 - Setting Up HTTPS

 2.1-Install mkcert globally if you haven't already:

mkcert -install

 2.2-Generate a local SSL certificate inside the project:

mkcert localhost

This will generate localhost.pem and localhost-key.pem files.
---------------------------------
3 - Running the Project

 3.1-To start the development server:

npm run dev 
(or pnpm dev if using pnpm)

This will start the Vite development server at https://localhost:5173/.


