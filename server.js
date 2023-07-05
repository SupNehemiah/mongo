// dependenices //
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const ProfileModel =  require("./models/profileModel")

require('dotenv').config()

const app = express()
const PORT = process.env.PORT 

//middleware //
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//connect to Db//
mongoose.set('strictQuery', true)
async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('connected to DB')
    } catch(e){
        console.log(`connection failed ${e}`)
    }
}
connectToDB();
//get data form backend send to frontwend
app.get("/user", (req, res) => {
    async function users(){
        try{
            //find certain model
            const responese = await ProfileModel.find()

            res.status(200).send({
                 message: 'users found',
                 data: responese,
            })
        } catch(e){
            res.status(400).send({
                message: 'error in get request',
                data: e,
            })
        }
    }
    users()
})
//post request 
app.post('/create', (req, res) => {
    const data = req.body

async function createprofile(){
    try{
        const newprofile = ProfileModel.create({
            name: data,name,
            age: data,age,
            sex: data,sex,
        })

        res.status(200).send({
            message:'profile created',
            data: newprofile,
       
        })
   
    }catch(e){
        res.status(400).send({
            message: 'error in post request',
            data: e,
        })
    }
}

})
// delete request to delete a specific document
app.delete('/delete', (req, res) =>{
    const data = req.body

  async function deleteusers(){
    try{
        await ProfileModel.findByIdAndDelete(data._id)
        res.status(200).send({
            message: 'user deleted',
        })
    }catch(e){
        res.status(400).send({
            message:'server is delete request',
            data: e,
        })
    }
}
  deleteusers()
})
app.listen(PORT, () =>{
    console.log(`Server is Running on ${PORT}`)
})

