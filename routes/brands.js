var express = require ('express')
var router = express.Router()
var pool = require ('./pool');
var fs = require('fs')
const upload = require('./multer');

router.post('/submit_brand', upload.single('logo'), function(req, res, next) {
   try{
    console.log(req.body)
    console.log(req.file)
    pool.query('insert into brand (brandname,categoryid,logo)values(?,?,?)',[req.body.brandname,req.body.category,req.file.filename],function(error,result){
        if(error)
        {
            console.log('Error:',error)
            res.status(200).json({status:false , message:'Database error , pls contact database admin'})
        }else
        {
            console.log('RESULT:',result)
            res.status(200).json({status:true , message:'Brand submitted Successfully'})
        }
    });
}
catch(e)
{
    console.log('ERROR:',e)
    res.status(200).json({status:false , massege:'Server error.......'})
}
  });
 
  router.get('/display_all_brand', function(req, res, next) {
    try{
         pool.query('select B.*, (select C.categoryname from category C where C.categoryid = B.categoryid) as categoryname from brand B', function (error, result) {
             if(error)
        {
            console.log('Error',error)
            res.status(200).json({status:false,massege:'Database error pls contect database admin'})
        }
        else
        {
            res.status(200).json({ data:result , status:true,massege:'success'})
        }
    })
}
catch(e)
{ 
    console.log('E',e)
    res.status(200).json({status:false,massege:'Server error.....'})
}
})



router.post('/delete_brand', function(req, res, next) {
    try{
      pool.query('delete from brand where brandid=?',[req.body.brandid ],function(error,result){
        if(error)
        {
        res.status(200).json({status:false,message:'Database error,pls brand database admin'})
  
        }
        else
        {
            fs.unlinkSync(`public/images/${req.body.oldlogo}`)
          res.status(200).json({status:true,message:'Brand Deleted Successfully'})
        }
  
  
      })
  }
  catch(e)
  {
  
      res.status(200).json({status:false,message:'Server Error....'})
  }
    
  });
router.post('/edit_brand_data',function(req,res,next){
    try{
        pool.query('update brand set brandname=?,categoryid=?  where brandid=?',[req.body.brandname,req.body.categoryid,req.body.brandid],function(error,result){

            if(error)
            {
                res.status(200).json({status:false,message:'Database error pls contect database admin'})

            }
            else
            {
                console.log(result)
                res.status(200).json({status:true, message:'successfully update'})
            }
        
        })
    }catch(e)
    {
        res.status(200).json({status:false,message:'Server error..........'})
    }
    })


    router.post('/edit_brand_logo', upload.single('logo'), function(req, res, next) {
        try{
         console.log(req.body)
         console.log(req.file)
         console.log('hhaHHHHHHHHHHHHH',req.body.oldlogo)
         pool.query('update brand set logo=? where brandid=?',[req.file.filename,req.body.brandid],function(error,result){
             if(error)
             {
                 console.log('Error:',error)
                 res.status(200).json({status:false , message:'Database error , pls contact database admin'})
             }else
             {
                fs.unlinkSync(`public/images/${req.body.oldlogo}`)
                 res.status(200).json({status:true , message:' Logo Update  Successfully'})
             }
         });
     }
     catch(e)
     {
         console.log('ERROR:',e)
         res.status(200).json({status:false , massege:'Server error.......'})
     }
       });


       router.post('/fetch_brand_by_category', function(req, res, next) {
        
        try{
           
             pool.query('select B.*, (select C.categoryname from category C where C.categoryid = B.categoryid) as categoryname from brand B where B.categoryid=?',[req.body.categoryid], function (error, result) {
                 if(error)
            {
                console.log('Error',error)
                res.status(200).json({status:false,massege:'Database error pls contect database admin'})
            }
            else
            {
                console.log('RESULT:',result)
                res.status(200).json({data:result, status:true,massege:'success'})
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
  