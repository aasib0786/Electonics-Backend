var express = require('express');
var router = express.Router();
var pool = require ('./pool');
var upload = require ('./multer');
var fs = require('fs')


router.post('/Register',upload.single('picture'), function(req, res, next) {
   // fs.unlinkSync(`public/images/${req.body.oldpicture}`)
    try
    {
        pool.query('insert into admins (fistname, lastname, email, mobailno, password, picture) values(?,?,?,?,?,?)' , [req.body.fistname ,req.body.lastname,req.body.email ,req.body.mobailnumber,req.body.password , req.file.filename],function(error,result){
            if(error)
            {
                console.log('ERRORssss:',error)
               res.status(200).json({status:false, message:'Database error'})
            }
            else
            {   console.log('RESULT:',result)
                res.status(200).json({status:true, data:result, message:'Success'})
            }
        })
    }
    catch(e)
    {
        console.log('eeeeeeeeee:',e)
        res.status(200).json({status:false, message:'server error'})
    }

})

router.post('/check_admin_login',upload.single('image'), function(req, res, next) {
    
    pool.query('select *  from admins where (email=? or mobailno=?) and password=? ' ,[req.body.email,req.body.email,req.body.password],function(error,result){
        if(error)
            { console.log('ERROR:',error)
                res.status(200).json({message:'Database Error',status:false})}
            else
            { console.log('RESULT:',result)
             if(result.length==1)
             res.status(200).json({message:'Success',status:true,data:result[0]})
             else
             res.status(200).json({message:'Invalid Emailid/Mobileno/Password',status:false})
         }
           })
        })

module.exports = router;