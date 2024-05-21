//For Async Function Errors in PropertyControllers
module.exports = func =>(req,res,next)=>{
    Promise.resolve(func(req,res,next)).catch(next);
}