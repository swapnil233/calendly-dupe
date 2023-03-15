# An appointment scheduling web application

This is an appointment scheduling web app which will be like Calendly. Users can book appointments, and there's concurrency checks.

## To run the application on your machine:
1. Clone this project
2. `npm install` in this folder and also inside the server folder
3. Client and server are on seperate ports but there's a proxy in package.json
4. Inside `/server` create a `.env` file and copy the structure of the `.env.example` file. You'll need a PostgreSQL database. I suggest using PGAdmin to set one up, it might be the easiest.
5. Install Prisma by running `npm install -g prisma`
6. Generate the Prisma client by running `npx prisma generate`. The DB should work after this.
4. Start the server by running `nodemon index.js`
5. Sart the frontend by running `npm start`
