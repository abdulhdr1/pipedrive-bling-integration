# Pipedrive-Bling! Integration

> An automation to a specific task transferring scenario using Bling!, Pipedrive and MongoDB Atlas

## 📖 Description

This project's goal is to create an automated way to feed Bling! the deals with won status on Pipedrive and then send that data to a MongoDB that summarizes the deals made in a day

## 🚀 How to use it

Requirements: NodeJS

To run the code you'll need to, first, install the dependencies,

```
npm install
```

Then, create a .env file

```
touch .env
```

After that, fill it with your Bling and Pipedrive api key's and MongoDB connection link, like this:

```
BLING_APIKEY=YourBlingKey
PIPEDRIVE_APIKEY=YourPipedriveKey
MONGO_LINK=YourMongoDBLink
```

The configuration part is done, now it's just run it in your terminal

```
node index.js
```

If everything's fine there are going to start prompting messages on the console, but they are in portuguese, if someone's interested please translate it to english and make a PR.

## 🔶 Diagram / How it works

## 📝 License

This project is under MIT License.

[⬆ Go back to the top](#nome-do-projeto)<br>
