const express=require("express");

const app=express();

const PORT=8081;
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Home page"
    })
})
app.all("*",(req,res)=>{
    res.status(500).json({
        message:"Not built yet"
    })
})

app.listen(PORT,()=>{
    console.log(`Server started ar http://localhost:${PORT}`);
})