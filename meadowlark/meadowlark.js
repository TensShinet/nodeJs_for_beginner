const log = console.log.bind(console)
const __main = () => {
    var express = require("express")
    var app = express()
    app.set('port', process.env.PORT || 3000)

    app.use(function(req, res, next){
        res.locals.showTests = app.get('env') !== 'production' &&
            req.query.test === '1'
        next()
    })
    app.use(express.static(__dirname + '/public'))
    // 什么时候用 单引号, 什么时候用双引号
    var f = require('./lib/fortune.js')
    var handlebars = require('express3-handlebars')
        .create({defaultLayout:'main'})
    // log("test handlebars", handlebars)

    //
    app.engine('handlebars', handlebars.engine)
    // log('tets app.get()', app.get('env'))
    app.set('view engine', 'handlebars')

    app.get('/', function(req, res){
        res.render('home')
    })
    app.get('/about', function(req, res, next){
        res.render('about', {fortune: f.getFc()})
    })

    app.use(function(req, res){
        res.status(404)
        res.render('404')
    })

    app.use(function(err, req, res, next){
        console.error(err.stack)
        // log('AM I ERROR')
        res.status(500)
        res.render('500')
    })

    app.listen(app.get('port'), function(){
        log('Express started on http://localhost:' + app.get('port') +
        '; press Ctrl-c to terminate')
    })
}
__main()
