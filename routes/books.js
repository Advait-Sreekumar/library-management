const express=require("express");
const {books}=require("../data/books.json")
const {users}= require("../data/users.json");

const router =express.Router();


/**
 * Route:/books
 * Mehod: GET
 * Description: Get all the list of books in the system
 * Access:Public
 * Parameters:None
 */
router.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        data:books,
    })
})


router.post('/',(req,res)=>{
    //      "id":"1",
    //     "name":"BBT",
    //     "price":"300",
    //     "author":"Ram"
    const {id,name,price,author}= req.body;
    if(!id || !name || !price || !author){
        return res.status(400).json({
            success: false,
            message:"Please provide all the details"
        })
    }
    const book =books.find((each)=>each.id ===id)
    if(book){
        res.status(409).json({
            success:false,
            message:"Books already exists"
        })
    }
    books.push({
        id,
        name,
        price,
        author

    })
    res.status(201).json({
        success:"Book created successfully"
    })
})


/**
 * Route:/books: ID
 * Mehod: PUT
 * Description: Updating a book by ther id
 * Access:Public
 * Parameters:None
 */ 
router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    const book =books.find((each)=>each.id === id)
    
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book not found"
        })
    }

    const updatedBook= books.map((each)=>{
    if(each.id===id){
        return{
            ...each,
            ...data,
        }
    }
    return each
   })
    res.status(201).json({
        success:true,
        data:updatedBook,
        message:"Updated successfully"
    })
})


router.get('/:id',(req,res)=>{
    
    const {id}=req.params;
    const book =books.find((each)=>each.id === id)
    
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book not found"
        })
    }

    res.status(200).json({
        success:true,
        data:book
    })
})

/**
 * Route:/books: ID
 * Mehod: GET
 * Description: Deleting a book by their id(Check if the user still has an issued book)&&(is there any fine/penatlty to be collected)
 * Access:Public
 * Parameters:None
 */
router.delete('/:id',(req,res)=>{
    const {id}= req.params;
    const book=books.find((each)=>each.id===id)

    if(!book){
        return res.status(404).json({
            success:false,
            message:"Id not found in system"
        })
    }
    const updatedBook=books.filter((each)=>each.id!==id);


    res.status(200).json({
        success:true,
        data:updatedBook,
        message:"Id has been deleted"
    })

})

/**
 * Route:/issued
 * Mehod: GET
 * Description: Get all the issued books
 * Access:Public
 * Parameters:None
 */

router.get('/issued/for-user',(req,res)=>{
    const UserWithIssuedBooks=users.filter((each)=>{
        if(each.issuedBook){
            return each;
        }
    })

    const issuedBooks=[];

    UserWithIssuedBooks.forEach((each)=>{
        const book =books.find((book)=> book.id ===each.issuedBook);

        if(book){
            const bookWithUser ={
                ...book,
        issuedBy :each.name,
        issuedDate : each.issuedDate,
        returnDate :each.returnDate,
        };
        issuedBooks.push(bookWithUser);
        }
    });


    if(!issuedBooks.length===0){
        return res.status(404).json({
            success:false,
            message: " No books issued yet"
        });
    }

    res.status(200).json({
        success:true,
        data:issuedBooks
    });

});



module.exports= router;