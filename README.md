# DMG Technical Assessment

### Installation Instructions

- docker-compose.yml contains a postgres db service, you can remove this if you already have a postgres instance elsewhere, if you do then remove the depends_on config as well on the backend service
- .env on the root folder contains ports for the docker containers, move these around as you wish, it is default configured to run on 3000 for frontend and 8080 for backend
- run docker-compose build and start the postgres container if needed
- create databases in postgres, if using the docker installation the user/pass should be postgres/postgres
  - "dmg" this is for the application
  - "test" this is for test environment
- npm install [on /client and /backend]
- configure .env files inside of server directory (.env.development, .env.test)
  - you may need to use "docker inspect [containername]" to find the IP of the postgres container, use this as the TYPEORM_HOST var
  - if using your own postgres installation fill the following variables, otherwise it should just work
    - TYPEORM_HOST = from docker inspect [containername] [or whatever your installation is configured to]
      - in .env.test, because you will probably run the tests locally it should probably be localhost, otherwise if you run from the container it would be the same one as in .env.development
    - TYPEORM_USER = postgres [or whatever your installation is configured to]
    - TYPEORM_PASS = postgres [or whatever your installation is configured to]
    - TYPEORM_PORT = 5432 [or whatever your installation is configured to]
- run migrations in /server folder for both dev and test environments
  - npm run migration:up
  - APP_ENV=test npm run migration:up
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