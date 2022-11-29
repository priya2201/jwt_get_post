const express=require('express');
const bodyParser=require('body-parser');
const{check,validationResult}=require('express-validator');
const path=require('path')
const app=express()
var PORT=process.env.port || 3000

app.set("views",path.join(__dirname))
app.set("view engine","ejs")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get("/",function(req,res){
    res.render('SampleForm');
})
app.post('/saveData',[
    check('email','email length should be 10 to 30 characters')
                  .isEmail().isLength({min:10,max:30}),
    check('name','Name length ,must be 10 to 20 characters')
         .isLength({min:10,max:20}),
    check('mobile', 'Mobile number should contains 10 digits')
                    .isLength({ min: 10, max: 10 }),
    check('password','password length should be 8 to 10 characters')
    .isLength({min:8,max:10})


],(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        res.json(errors)
    }
    else{
        res.send("Successfully validated")
    }
});
app.listen(PORT,function(error){
    if(error)throw error
    console.log("server created successfully on POrt",PORT)
})