var express = require('express');
var router = express.Router();
var pool = require ('./pool');
const upload = require('./multer');

/* GET home page. */
router.post('/submit_banner',upload.any() , function(req, res, next) {
  try
  { 
    var filename = req.files.map((file,index)=>file.filename)
    console.log("filename xxxxx",filename)
        pool.query('insert into categorybanner (categoryid,brandid,files) value(?,?,?) ' , [req.body.categoryid,req.body.brandid,filename+''],function(error,result){
        if(error)
        {
              console.log(error)
             res.status(200).json({status:false,message:'Database error pls contacte admin'})
        }
        else
        {
            res.status(200).json({status:true,message:'successfull'})
        }
      })
  }
  catch(e)
  {
    res.status(200).json({status:false,message:'server error'})
  }

});

module.exports = router;
