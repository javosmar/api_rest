const {Router} = require('express');
const router = Router();
let movies = require('../sample.json');

router.get('/',(req,res) => {
    res.json(movies);
});

router.post('/',(req,res) => {
    const { title, director, year, rating } = req.body;
    if(title && director && year && rating){
        const id = movies.length + 1;
        const newMovie = {...req.body, id};
        console.log(newMovie);
        movies.push(newMovie);
        res.json('movie saved');
    }
    else{
        res.status(500).json({error: 'request error'});
    }
});

router.put('/:id',(req,res) => {
    const { id } = req.params;
    const { title, director, year, rating } = req.body;
    console.log(req.params);
    console.log(req.body);
    if(title && director && year && rating){
        movies.forEach(movie => {
            if(movie.id == id){
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating = rating;
            }
        });
        res.json(movies);
    }
    else{
        res.status(500).json({error: 'request error'});
    }
});

router.delete('/:id',(req,res) => {
    const { id } = req.params;
    movies = movies.filter(movie => movie.id !== id);
    console.log(movies);
    res.json(movies);
});

module.exports = router;