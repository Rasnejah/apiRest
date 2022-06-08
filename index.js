// config inicial
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')

const app = express()





// formatando leitura Json / middlewares

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

// rotas api
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)


// rota de teste
app.get('/', (req, res)=>{
    res.json({
        massege: 'oi express'
    })
})


//conection 

//
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.skdgc.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log("conectamos ao mongoDB!")
    //porta disponivel da api
    app.listen(3000)
})
.catch((err) => console.log("conection failed:",err))


