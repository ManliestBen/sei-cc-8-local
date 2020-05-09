const axios = require('axios');

module.exports = {
    pokeView,
    nasaView,
    chartView,
    nasaQuery,
}

function pokeView(req, res) {
    res.render('pokeapi');
}

function nasaView(req, res) {
    res.render('nasaapi', {results: null});
}

function chartView(req, res) {
    res.render('chartapi');
}

function nasaQuery(req, res) {
    if (!req.body.date) {
        req.body.date = new Date();
    }
    console.log(req.body.date)
    let dateToSearch = req.body.date;
    let NASA_API_KEY = process.env.NASA_API_KEY;
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${dateToSearch}`)
    .then(response => {
        res.render('nasaapi', {results: response.data})
    })
    .catch(error => {
        console.log(error)
    })
}