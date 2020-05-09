const axios = require('axios');
let NASA_API_KEY = process.env.NASA_API_KEY;

module.exports = {
    pokeView,
    nasaView,
    chartView,
    nasaQuery,
    chartQuery,
    pokeQuery,
}

function pokeView(req, res) {
    res.render('pokeapi', {pokemon: null});
}

function nasaView(req, res) {
    res.render('nasaapi', {results: null});
}

function chartView(req, res) {
    res.render('chartapi', {url: null});
}

function nasaQuery(req, res) {
    if (!req.body.date) {
        req.body.date = new Date();
        let month = req.body.date.getMonth();
        console.log(month);
    }
    let dateToSearch = req.body.date;
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${dateToSearch}&hd=True`)
    .then(response => {
        res.render('nasaapi', {results: response.data});
        
    })
    .catch(error => {
        console.log(error)
    })
}

function chartQuery(req, res) {
    let labels = [`'${req.body.label1}','${req.body.label2}','${req.body.label3}','${req.body.label4}','${req.body.label5}','${req.body.label6}'`];
    let data = [`'${req.body.value1}','${req.body.value2}','${req.body.value3}','${req.body.value4}','${req.body.value5}','${req.body.value6}'`];
    let url = `https://quickchart.io/chart?c={type:'pie',data:{labels:[${labels}],datasets:[{data:[${data}]}]}}`
    res.render('chartapi', {url: url});
}

function pokeQuery(req, res) {
    let query = req.body.query;
    axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`)
    .then(response => {
        res.render('pokeapi', {pokemon: response.data})
    })
    .catch(error => {
        console.log(error)
    })
}