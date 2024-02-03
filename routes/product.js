var express = require ('express')
var router = express.Router()
var pool = require ('./pool');
var fs = require('fs')
const upload = require('./multer');


router.post('/submit_product',upload.single('picture'), function(req, res, next) {
       try{
        console.log(req.body)
        console.log(req.file)
      pool.query('insert into product (productname , categoryid , brandid , picture) values(?,?,?,?)',[req.body.productname,req.body.categoryid,req.body.brandid,req.file.filename],function(error,result){
    
        
          if(error)
          {   console.log('ERROR:',error)
              res.status(200).json({status:false , message:'Database error , pls contact database admin'})
          }
          else
          {
            console.log('RESULT:',result)
            res.status(200).json({status:true , message:' product submitted Successfully'})
          }
        })
    }
    catch(e)
    {
        console.log('ERROR:',e)
        res.status(200).json({status:false , massege:'Server error.......'})
    }
 
});


router.get('/display_all_product', function(req, res, next) {
  try{
       pool.query('select product.*, category.categoryname,brand.brandname from product,category,brand where product.categoryid = category.categoryid and product.brandid=brand.brandid ', function (error, result) {
           if(error)
      {
          console.log('Error',error)
          res.status(200).json({status:false,massege:'Database error pls contect database admin'})
      }
      else
      {
          console.log('RESULT:',result)
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



router.post('/delete_product', function(req, res, next) {
  try{
   
    pool.query('delete from product where productid=?',[req.body.productid],function(error,result){
      if(error)
      {
      res.status(200).json({status:false,message:'Database error,pls product database admin'})

      }
      else
      {
        fs.unlinkSync(`public/images/${req.body.oldpicture}`)
        res.status(200).json({status:true,message:'Product Deleted Successfully'})

      }


    })
}
catch(e)
{

    res.status(200).json({status:false,message:'Server Error....'})
}
  
});

router.post('/edit_product_picture',upload.single('picture'),function(req,res,next){
  try{
    pool.query('update product set  picture=? where productid=? ',[req.file.filename,req.body.productid],function(error,result){
      if(error)
      {
          console.log('Error:',error)
          res.status(200).json({status:false , message:'Database error , pls contact database admin'})
      }
      else
      {
        console.log('RESULT:',result)
        // fs.unlinkSync(`public/images/${req.body.oldpicture}`)
        res.status(200).json({status:true , message:' Picture Update  Successfully'})
      }
    })

  }catch(e)
  {      
    console.log('ERROR:',e)
    res.status(200).json({status:false , massege:'Server error.......'})
  }
});


router.post('/edit_product_data',function(req,res,next){
  try{
    pool.query('update product set  productname=? , categoryid=?, brandid=? where productid=? ',[req.body.productname,req.body.categoryid,req.body.brandid,req.body.productid],function(error,result){
      if(error)
      {
          console.log('Error:',error)
          res.status(200).json({status:false , message:'Database error , pls contact database admin'})
      }
      else
      {
        console.log('RESULT:',result)
        res.status(200).json({status:true , message:' Picture Update  Successfully'})
      }
    })

  }catch(e)
  {      
    console.log('ERROR:',e)
    res.status(200).json({status:false , massege:'Server error.......'})
  }
});

module.exports = router;
