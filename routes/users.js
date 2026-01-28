const express = require("express");
const {users}= require("../data/users.json")

const router = express.Router();


/**
 * Route:/users
 * Mehod: GET
 * Description: Get all the list of users in the system
 * Access:Public
 * Parameters:None
 */
router.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        data:users,
    })
})


/**
 * Route:/users
 * Mehod: POST
 * Description: POST: Create a new user
 * Access:Public
 * Parameters:None
 */
router.post('/',(req,res)=>{
    // "id": 4,
    // "name": "Rakesh",
    // "email": "rakesh@example.com"
    // "subscriptionType":"Standard",
    // "subscriptionDate":"05/08/2022"
    const {id,name,email,subscriptionType,subscriptionDate}= req.body;
    if(!id || !name || !email || !subscriptionType || !subscriptionDate ){
        return res.status(400).json({
            success: false,
            message:"Please provide all the details"
        })
    }
    const user=users.find((each)=>each.id ===id)
    if(user){
        res.status(409).json({
            success:false,
            message:"User already exists"
        })
    }
    users.push({
        id,
        name,
        email,
        subscriptionType,
        subscriptionDate

    })
    res.status(201).json({
        success:true,
        message:"User created successfully"
    })
})

/**
 * Route:/users: ID
 * Mehod: PUT
 * Description: Updating a user by ther id
 * Access:Public
 * Parameters:None
 */ 
router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    const user =users.find((each)=>each.id === Number(id))
    
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }

    const updatedUser= users.map((each)=>{
    if(each.id===Number(id)){
        return{
            ...each,
            ...data,
        }
    }
    return each
   })
    res.status(201).json({
        success:true,
        data:updatedUser,
        message:"Updated successfully"
    })
})


/**
 * Route:/users: ID
 * Mehod: GET
 * Description: Get a user by their id
 * Access:Public
 * Parameters:None
 */
router.get('/:id',(req,res)=>{
    
    const {id}=req.params;
    const user =users.find((each)=>each.id === Number(id))
    
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }

    res.status(200).json({
        success:true,
        data:user
    })
})




/**
 * Route:/users: ID
 * Mehod: GET
 * Description: Deleting a user by their id(Check if the user still has an issued book)&&(is there any fine/penatlty to be collected)
 * Access:Public
 * Parameters:None
 */
router.delete('/:id',(req,res)=>{
    const {id}= req.params;
    const user=users.find((each)=>each.id===Number(id))

    if(!user){
        return res.status(404).json({
            success:false,
            message:"Id not found in system"
        })
    }
    const updatedUser=users.filter((each)=>each.id!==Number(id));


    res.status(200).json({
        success:true,
        data:updatedUser,
        message:"Id has been deleted"
    })

})


/**
 * Route:/users/subscription-details/{id}
 * Mehod: GET
 * Description: Get a user subscription details by theri id
 * Access:Public
 * Parameters:None
 */
router.get('/subscription-details/:id',(req,res)=>{
    const {id}=req.params;
    const user = users.find((each) => each.id === Number(id));

    if(!user){
        return res.status(404).json({
            success:false,
            message:"No such user in the database"
        })
    }

    const getDateInDays=(data= '')=>{
        let date;
        if(data){
            date = new Date(data);
        }else{
            date= new Date();
        } 
        let days= Math.floor(date/(1000*60*60*24));
        return days;
    }

    const subscriptionType= (date)=>{
        if(user.subscriptionType==="Basic"){
            date= date+90;
        }else if(user.subscriptionType==="Standard"){
            date=date+180
        }else if(user.subscriptionType==="Premium"){
            date+=365
        }
        return date;
    }

    let returnDate= getDateInDays(user.returnDate);
    let currentDate= getDateInDays();
    let subscriptionDate= getDateInDays(user.subscriptionDate);
    let subscriptionExpiration= subscriptionType(subscriptionDate)

    const data={
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        subscriptionDaysLeft: subscriptionExpiration-currentDate,
        daysLeftForExpiration: returnDate - currentDate ? "Book is overdue" : returnDate,
        fine: returnDate< currentDate ? subscriptionExpiration <= currentDate ?200 :100: 0
    }

    res.status(200).json({
        success:true,
        data:data
    });
})

module.exports= router;