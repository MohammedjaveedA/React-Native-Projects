
🎬 Movie App

A React Native Movie App that fetches and displays movie details using an API.

📌 Features

✅ Browse popular movies
✅ View detailed movie information
✅ User-friendly UI with smooth navigation

🛠️ Tech Stack

React Native (Expo)

Typescript

The Movie Database (TMDB) API

Appwrite


---

🚀 Getting Started

1️⃣ Prerequisites

Ensure you have the following installed:

Node.js (Latest LTS)

Git (for cloning the repository)


---

⚡ Installation

Clone the repository

git clone https://github.com/MohammedjaveedA/React-Native-Projects.git
cd React-Native-Projects/movie-app

Install dependencies

npm install


---

🔑 API Setup

This app fetches movie data from an API (like TMDb).

1. Sign up at TMDb (or any movie API you're using).


2. Get your API key.
   steps:
  - after sign up login to TMDB
  - Search for discover movie
  - select Movies 
  - then select discover/movie below Movies 
  - then select the node js 
  - copy the api key from right side of the page


3. Add the API key in your project:

open .env file and add the api key

Replace YOUR_API_KEY_HERE with your actual key.

---

📁 Appwrite setup

1. Create an account in appwrite

2. Create a project and follow the process which are guided by appwrite

3. Copy project id and paste it on .env file

4. create a database and inside the database create the metrices then add the attributes like title,description etc

5. In settings allow the CRUD permissions

6. Then copy the id's paste it on .env file



---

▶️ Running the App

Start the Expo development server:

npx expo start --clear

or

npm start

Then, scan the QR code using:
📱 Expo Go (Android/iOS)



---

📌 Troubleshooting

If dependencies fail to install, run:
npm install --legacy-peer-deps



---

💡 Contributing

Want to improve the app? Feel free to fork and submit a pull request!
