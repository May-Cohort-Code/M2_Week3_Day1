const mongoose = require('mongoose')
const express = require('express')

const app = express()


app.set("view engine", "hbs");
app.set("views", __dirname + "/views");


mongoose
  .connect('mongodb://127.0.0.1:27017/imdb')
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

  const movieSchema = new mongoose.Schema({
    title:String,
    year:Number,
    director:String,
    duration:String,
    genre: [String],
    rate:{
        type:Number,
        min:0,
        max:10
    },
    poster:String

},
{timestamps:true})



const Movie = mongoose.model('Movies',movieSchema)

//if we ever want to see a page on our website we need a GET route for it

app.get('/omar',(req,res)=>{
    res.render('home')
})
/* 
CRUD: 
    - CREATE
    - READ
    - UPDATE
    - DELETE
 */
//READ 
//READ ALL of my resources
app.get('/movies',(req,res)=>{
    //.find() ALWAYS returns an array
   Movie.find()
    .then((allMovies)=>{
        res.render('all-movies',{allMovies})

    })
})

app.get('/movies/:id',(req,res)=>{
    console.log(req.params)
    console.log(req.params.id)
    Movie.findById(req.params.id)
    .then((oneMovie)=>{
        console.log(oneMovie)
        res.render('movie-info',oneMovie)   })
})



app.listen(3000)
