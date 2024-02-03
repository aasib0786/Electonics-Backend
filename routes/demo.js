var express = require ('express')
var router = express.Router()
var pool = require ('./pool');


  router.get('/displaydata1', function(req, res, next) {
    try{
         pool.query('select * from brand ', function (error, result) {
             if(error)
        {
            console.log('Error',error)
            res.status(200).json({status:false,massege:'Database error pls contect database admin'})
        }
        else
        {
            res.status(200).json({ data:result , status:true,massege:'successfully fetch first Data'})
        }
    })
}
catch(e)
{ 
    console.log('E',e)
    res.status(200).json({status:false,massege:'Server error.....'})
}
})


router.get('/displaydata2', function(req, res, next) {
    try{
         pool.query('select * from category ', function (error, result) {
             if(error)
        {
            console.log('Error',error)
            res.status(200).json({status:false,massege:'Database error pls contect database admin'})
        }
        else
        {
            res.status(200).json({ data:result , status:true,massege:'successfully fetch Second Data'})
        }
    })
}
catch(e)
{ 
    console.log('E',e)
    res.status(200).json({status:false,massege:'Server error.....'})
}
})

router.get('/displaydata3', function(req, res, next) {
    try{
         pool.query('select image from image where productid in (select productid from product)', function (error, result) {
             if(error)
        {
            console.log('Error',error)
            res.status(200).json({status:false,massege:'Database error pls contect database admin'})
        }
        else
        {
            res.status(200).json({ data:result , status:true,massege:'successfully fetch third Data'})
        }
    })
}
catch(e)
{ 
    console.log('E',e)
    res.status(200).json({status:false,massege:'Server error.....'})
}
})
  
  module.exports = router;
  