const express=require('express');
const bodyParser=require('body-parser');
const{validationResult}=require("express-validator")
const repo=require('./repository')
const {validateDOB} =require('./validator');
const formTemplet=require('./form')

const app=express()
const port=process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send(formTemplet({}))
})
app.post('/info',[validateDOB],async(req,res)=>{
const errors = validationResult(req)
if(!errors.isEmpty()){
    return res.send(formTemplet({errors}))
}
const{email,name,phn,dob}=req.body
await repo.create({
    email,
    name,
    'phone number':phn,
    'Date of Birth':dob

})
res.send('<strong> Information is saved to'+ 'the database succesfully</strong>')
})
app.listen(port,()=>{
    console.log(`server start on port ${port}`)
})



