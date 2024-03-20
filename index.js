const bodyparser =require('body-parser')
const cors = require('cors')
const express=require('express')
const mongoose=require('mongoose')
const {Expense}=require('./schema.js')

const app=express()
app.use(bodyparser.json())
app.use(cors())
async function connectToDb(){
    try{
        await mongoose.connect('mongodb+srv://arunmozhidevant:Arun1312@cluster0.mqhcwfk.mongodb.net/ExpenseTrakerdb?retryWrites=true&w=majority&appName=Cluster0')
        console.log("db connection established")

        const port=process.env.PORT || 8000
        app.listen(port,function(){
        console.log(`listen to port ${port}...`)
       })
    }catch(error){
        console.log(error)
        console.log("Connection not established")
    }
}

connectToDb()


app.get('/get-expenses', async function(req,res){
    try {
        const expensesData = await Expense.find()
        res.status(200).json(expensesData)
    } catch(error) {
        res.status(500).json({
            "status" : "failure",
            "message" : "could not fetch details",
            "error" : error
        })
    }
})


app.post('/add-expenses', async function(req,res){
        
    try{
        await Expense.create({
            "amount" : req.body.amount,
            "category" : req.body.category,
            "date" : req.body.date
         })
         res.status(201).json({
            "status": "Success",
            "message": "entry created"
         })
    }catch(error){
        res.status(500).json({
            "status": "failed",
            "message": "entry not created",
            "error":error
         })
    }
})
    
app.delete('/delete-expense/:id', async function(req, res) {
    try {
        const expenseEntry = await Expense.findById(req.params.id)
        if(expenseEntry) {
            await Expense.findByIdAndDelete(req.params.id)
            res.status(200).json({
                "status" : "success",
                "message" : "successfully deleted the entry"
            })
        } else {
            res.status(404).json({
                "status" : "failure",
                "message" : "could not find the entry"
            })
        }
    } catch(error) {
        res.status(500).json({
            "status" : "failure",
            "message" : "could not delete entry",
            "error" : error
        })
    }
})

app.patch('/update-expense/:id', async function(req, res) {
    try {
        const expenseEntry = await Expense.findById(req.params.id)
        if(expenseEntry) {
            await expenseEntry.updateOne({
                "amount" : req.body.amount,
                "category" : req.body.category,
                "date" : req.body.date
            })
            res.status(200).json({
                "status" : "success",
                "message" : "successfully updated the entry"
            })
        } else {
            res.status(404).json({
                "status" : "failure",
                "message" : "could not find the entry"
            })
        }
    } catch(error) {
        res.status(500).json({
            "status" : "failure",
            "message" : "could not update entry",
            "error" : error
        })
    }
})



