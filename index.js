const express=require("express");
const {users}=require("./data/users.json")

const userRoutes=require('./routes/users.js')
const booksRoutes=require('./routes/books.js')


const app=express();

const PORT=8081;
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Home page"
    })
})

app.use('/users', userRoutes);
app.use('/books',booksRoutes);




/**
 * Route:/users/subscription-details/:id
 * Mehod: GET
 * Description: Get a user subscription details by theri id
 * Access:Public
 * Parameters:None
 */
app.get('/users/subscription-details/:id',(req,res)=>{
    const {id}=req.params;
    const user =users.find((each)=>each.id === Number(id))
    
    const sub=user.subscriptionDate
    const dat=user.returnDate


    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }

    res.status(200).json({
        success:true,
        data:{sub,dat}
    })
})






// app.all("*",(req,res)=>{
//     res.status(500).json({
//         message:"Not built yet"
//     })
// })

app.listen(PORT,()=>{
    console.log(`Server started ar http://localhost:${PORT}`);
})