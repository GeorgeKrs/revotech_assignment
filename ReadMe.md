# About

This is the fullstack project for Revotech's assignment (MEAN Stack).
</br>
The development was done in Ubuntu 22.04.4 LTS.

Please follow the instructions below to install & run locally.

### Project Setup

- git clone https://github.com/GeorgeKrs/revotech_assignment.git
- Download .env file

### Client

- Open a terminal in project's directory and run: <b>cd frontend/</b>
- On the frontend directory install dependencies: <b>npm install</b>
- Install globally Angular to run locally: <b>npm install -g @angular/cli</b> (Optional)
- On the frontend directory run the client app: <b>ng serve</b>

### Server

- Place the .env in the server directory
- Open another terminal in project's directory and run: <b>cd server/</b>
- On the server directory install dependencies: <b>npm install</b>
- Install globally Parse Dashboard: <b>npm install -g parse-dashboard</b>
- On the server directory run parse server:
  <b>parse-dashboard
  --appId APP_ID
  --masterKey MASTER_KEY
  --serverURL SERVER_URL
  --appName APP_NAME
  </b>
  </br>
  <i>Note: You will need to replace the APP_ID, MASTER_KEY and APP_NAME with the values of the .env file that I will provide.</i>

- Open another terminal in project's directory and run: <b>cd server/</b>
- On the server directory run express server: <b>npm start</b>

After following these steps you can navigate through the app in the following url:
http://localhost:4200/

If you want to visit the parse server dashboard make sure to visit
http://localhost:4040/
