const router = require('express').Router()

const Person = require('../models/Person')

router.post('/',async (req,res)=>{
    //req.body
    
    const { name, salary, approved} = req.body
    const person = {
        name,
        salary,
        approved
    }
    console.log(person)
    if(!name){
        res.status(422).json({massage: "Nome é obrigatorio!"})
        return
    }

    // create

    try {
        // criando dados
        await Person.create(person)
        res.status(201).json({message: "Pessoa criado com sucesso!"})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

//read - leitura de dados

router.get('/', async (req, res)=>{
    try {
        const peaple = await Person.find()
        res.status(200).json(peaple)
    } catch (error) {
        res.status(500).json({ error: error})
    }
} )

//read one - leitura de dados por id

router.get('/:id', async (req, res)=>{
    const id = req.params.id
    try {
        const person = await Person.findOne({_id: id})
        if(!person){
            res.status(422).json({massege: "Usuario não encontrado"})
        }
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error})
    }
})

// update - atualizar cadastro parcial
router.patch('/:id', async (req, res)=>{
    const id = req.params.id
    const {name, salary, approved} = req.body
    const person = {
        name,
        salary,
        approved,
    }
    try {
        const updatePerson = await Person.updateOne({_id: id}, person)
        if(updatePerson.matchedCount === 0){
            res.status(422).json({message: "Usuario não foi encontrado!"})
            return
        }
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error})
    }
})
// deletando usuario

router.delete("/:id", async (req, res) =>{
    const id = req.params.id
    
    try {
        const person = await Person.findOne({_id: id})
        
        if(!person){
            res.status(422).json({message: "Usuario não encontrado!"})
            return
        }
        try {
            await Person.deleteOne({_id: id})
            res.status(200).json({message: "Usuario excluido com sucesso"})
        } catch (error) {
            res.status(500).json({ error: error.message})
        }
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
    
    
    
    

})
module.exports = router