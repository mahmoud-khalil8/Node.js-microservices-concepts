const setRateLimit=require('express-rate-limit')

const rateLimitMiddleware= setRateLimit({
    windowMs:60*1000,
    max:5,
    message:'you have exceeded yout 5 requests limit',
    headers:true
})
module.exports=rateLimitMiddleware