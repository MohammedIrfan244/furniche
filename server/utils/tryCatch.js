const tryCatch=(func)=>async(req,res,next)=>{
    try{
        await func(req,res,next)
    }catch(err){
        console.log(err)
        next(err)
    }
}

export default tryCatch