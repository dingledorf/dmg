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

- Access app on http://localhost:3000
- User/Password combination under AUTH_USER and AUTH_PASSWORD env variables
  - defaulted to dmg/dmgTest
  - jwt saved as cookie
- 3 pages for dashboard, hardware and analysis

### Unit Testing

- simply use cmd "npm run test"