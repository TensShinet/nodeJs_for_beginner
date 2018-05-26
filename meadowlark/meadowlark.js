const log = console.log.bind(console)
const __main = () => {
    var express = require("express")
    var app = express()
    // 什么时候用 单引号, 什么时候用双引号
    app.set('port', process.env.PORT || 3000)

    var handlebars = require('express3-handlebars')
        .create({defaultLayout:'main'})
    //
    app.engine('handlebars', handlebars.engine)
    app.set('view engine', 'handlebars')
    app.get('/', function(req, res){
        res.render('home')
    })
    app.get('/about', function(req, res, next){
        res.render('about')
    })

    app.use(function(req, res){
        res.status(404)
        res.render('404')
    })

    app.use(function(err, req, res, next){
        console.error(error.stack)
        res.status(500)
        res.render('500')
    })

    app.listen(app.get('port'), function(){
        log('Express started on http://localhost:' + app.get('port') +
        '; press Ctrl-c to terminate')
    })
}
__main()
