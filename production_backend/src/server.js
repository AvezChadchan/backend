import express from 'express'

const app=express();

app.get('/',(req,res)=>{
    res.send("SERver is READY")
});
const port =3000;
app.listen(port,()=>{
    console.log("http://localhost:3000");
    
})