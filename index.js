const express = require('express')
const fs = require('fs')
const app = express()

// Set up Firebase as our database
const { initializeApp } = require("firebase/app")
const { getDatabase, ref, onValue, push, update } = require("firebase/database")
// Other Firebase SDKS:
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBEp0FAf5gwKsWdfd4K931Id72qQbVvAtc",
  authDomain: "jokes-814d9.firebaseapp.com",
  databaseURL: "https://jokes-814d9-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "jokes-814d9",
  storageBucket: "jokes-814d9.appspot.com",
  messagingSenderId: "426108552771",
  appId: "1:426108552771:web:d27cffde23ef5bdf9f36f6",
  measurementId: "G-C026NNVGF1"
}
const firebaseApp = initializeApp(firebaseConfig)

// Read database and listen for realtime updates
const db = getDatabase(firebaseApp)
jokesDb = ref(db)
let jokes
onValue(jokesDb, (snapshot) => {
  jokes = snapshot.val()
  //console.log(jokes)
})

// Get a random joke
// TODO: Add 'refresh' button
let idx
app.get('/', function (req, res) {
  const jokesKeys = Object.keys(jokes)
  const i = Math.floor((Math.random() * jokesKeys.length))
  idx = jokesKeys[i]

  const response = jokes[idx]
  res.json(response)
})

// Create a new joke without a genre
// const newJoke = {joke: "test joke", genre: ["uncategorised"]}
// push(jokesDb, newJoke)

// Update a joke (add a genre)
// const updateJoke = function(genre, idx, joke, db) {
//   const updates = {}
//   const newGenre = [genre, ...joke['genre']]
//   console.log(newGenre)
//   if (newGenre.length > 1 && newGenre.includes('uncategorised')) {
//     newGenre.pop('uncategorised')  
//   }
//   // const newGenre = [genre, ...joke['genre']]
//   // if (genre != 'uncategorised' && newGenre.includes('uncategorised')) {
//   //   newGenre.pop('uncategorised')
//   // }
//   updates[idx + '/genre'] = newGenre
//   return update(db, updates)
// }
// updateJoke('new', '1', jokes['1'], jokesDb)


app.listen(3050, function () {
  console.log('Jokes app listening on port 3050.')
})
