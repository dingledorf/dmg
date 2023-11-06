# DMG Technical Assessment

### Installation Instructions

- docker-compose.yml contains a postgres db service, you can remove this if you already have a postgres instance elsewhere, if you do then remove the depends_on config as well on the backend service
- .env on the root folder contains ports for the docker containers, move these around as you wish, it is default configured to run on 3000 for frontend and 8080 for backend
- create databases in postgres (1. dmg, 2. test)
- npm install [on /client and /backend]
- configure .env files inside of server directory (.env.development, .env.test)
- run migrations in /server folder for both dev and test environments
  - npm run migration:up
  - APP_ENV=test npm run migration:up
- run docker-compose build
- run docker-compose up

### Application
#### Frontend
  - Frontend is a nextjs13 application using the App Router
  - ui components are from https://mambaui.com/, tailwindcss built components for quick and simple use
  - axios for http client
  - 3 pages for dashboard, hardware and analysis
  - Access app on http://localhost:3000
  - User/Password combination under AUTH_USER and AUTH_PASSWORD env variables
    - defaulted to dmg/dmgTest
    - jwt saved as cookie and sent as a httpOnly credential
#### Backend
  - Express.js framework
  - TypeORM using postgres db
    - Migrations to setup db and seed data
  - Mining revenue is read from mock data
  - Controllers for API routes and Services for business logic
  - Cache used for 3rd party api and hardware calls (in-memory cache so don't need to install redis)

### Unit Testing

- simply use cmd "npm run test"