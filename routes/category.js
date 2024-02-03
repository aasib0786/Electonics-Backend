var express = require('express');
var router = express.Router();
var pool = require ('./pool');
var upload = require ('./multer');


router.post('/submit_category',upload.single('image'), function(req, res, next) {
    try{
    pool.query('insert into category (categoryname,image) values(?,?)',[req.body.categoryname,req.file.filename],function(error,result){
        if(error)
        {
            res.status(200).json({status:false,message:'Database error , pls contact database admin'});
        }
        else
        {
            res.status(200).json({status:true,message:'Category submitted Successfully'});
        }
    })
}
catch(e)
{
    res.status(200).json({status:false,message:'Server error.....'});
}
});

router.get('/display_all_category',function(req, res, next){

      try{
    pool.query('select * from category',function(error,result){
        if(error)
        {    console.log('Database Error',error)
            res.status(200).json({status:false,message:'Database error , pls contact database admin'});
        }
        else
        {
            console.log('result',result)
            res.status(200).json({data: result, status:true,message:' Success'});
        }
    })
}
catch(e)
{
    console.log('error',e)
    res.status(200).json({status:false,message:'Server error.....'});
}

})


router.post('/edit_category_data', function(req, res, next) {
    try{
    pool.query('update category set categoryname=? where categoryid=?',[req.body.categoryname,req.body.categoryid],function(error,result){
        if(error)
        {
            console.log('Error:',error)
            res.status(200).json({status:false,message:'Database error , pls contact database admin'});
        }
        else
        {
            console.log('Result:',result)
            res.status(200).json({status:true,message:'Category Updated Successfully'});
        }
    })
}
catch(e)
{
    console.log('E',e)
    res.status(200).json({status:false,message:'Server error.....'});
}
});


router.post('/edit_category_image',upload.single('image'), function(req, res, next) {
    try{
    pool.query('update category set image=? where categoryid=?',[req.file.filename,req.body.categoryid],function(error,result){
        if(error)
        {
            console.log("Error",error)
            res.status(200).json({status:false,message:'Database error , pls contact database admin'});
        }
        else
        {
           // fs.unlinkSync(`public/images/${req.body.oldimage}`)
            res.status(200).json({status:true,message:'Image Updated Successfully'});
        }
    })
}
catch(e)
{
    res.status(200).json({status:false,message:'Server error.....'});
}
});


router.post('/delete_category', function(req, res, next) {
    try{
      pool.query('delete from category where categoryid=?',[req.body.categoryid],function(error,result){
        if(error)
        {
        res.status(200).json({status:false,message:'Database error,pls contact database admin'})
  
        }
        else
        {
           // fs.unlinkSync(`public/images/${req.body.oldimage}`)
          res.status(200).json({status:true,message:'Category Deleted Successfully'})
        }
  
  
      })
  }
  catch(e)
  {
  
      res.status(200).json({status:false,message:'Server Error....'})
  }
    
  });

module.exports = router;
