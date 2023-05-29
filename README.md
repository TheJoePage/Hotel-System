# _PLEASE NOTE THAT THIS IS NOT COMPLETED, SO SOME TO MOST FUNCTIONS ARE UNAVAILABLE. TO FIND OUT WHEN ITS DONE PRESS THE "WATCH" BUTTON!_
# Easy Hotel System 

This is an easy-to-use and easy-to-setup Online Hotel Application.

## Setup

### _Step 1_

**__NOTE__: Make sure you have Node.JS, NPM and Git installed and up to date!**

Clone the Repository into your Directory

```bash
cd <Directory>
git clone https://github.com/TheJoePage/Hotel-System.git
```

OR you can download the Repository and move it into your directory manually.

### _Step 2_

Use `npm` to install the packages:

```bash
cd Hotel-System
npm install
```

### _Step 3_

After all of the packages are installed, copy the .env.template file as .env:

```bash
cp .env.template .env
```

Then fill it out:

```env
PORT=1111 # The port that your Project is running on

# MongoDB
dbUrl="mongodb+srv://thejoepage:<password>@hotel.cghuuth.mongodb.net/?retryWrites=true&w=majority"

# Secrets
ACCESS_TOKEN_SECRET="mambo jambo"
EMAIL_USER="yourhotel@email.com" # Your email account
EMAIL_PASS="y0urP@ssw0rd8778!" # Your email accounts password
```

### _Step 4_

Once the environment files are setup, run the server and check it out:

```bash
To run Development Server:
npm run start:dev

For Production Server:
npm start
```

## Links

- N/A

