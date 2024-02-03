var express = require('express')
const upload = require('./multer')
var router = express.Router()
var pool = require("./pool")


router.get('/fetch_all_banner', function (req, res, next) {
    try {
        pool.query("select * from banner", function (error, result) {
            if (error) {
                res.status(200).json({ status: false, message: 'Database Error , Please Contact Database Admin' })
            }
            else {
                res.status(200).json({ data: result, status: true, message: 'success' })
            }
        })
    }
    catch (e) {
        res.status(200).json({ message: 'Server Error', status: false })
    }
})


router.get('/fetch_all_category', function (req, res, next) {

    try {
        pool.query('select * from category', function (error, result) {
            if (error) {
                console.log('Database Error', error)
                res.status(200).json({ status: false, message: 'Database error , pls contact database admin' });
            }
            else {
                console.log('result', result)
                res.status(200).json({ data: result, status: true, message: ' Success' });
            }
        })
    }
    catch (e) {
        console.log('error', e)
        res.status(200).json({ status: false, message: 'Server error.....' });
    }

})



router.post('/display_all_product_by_status', function (req, res, next) {
    try {

        pool.query('select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brand B where B.brandid = P.brandid) as brandname, (select Pr.productname from product Pr where Pr.productid = P.productid) as productname,(select Pr.picture from product Pr where Pr.productid = P.productid) as productpicture from productdetail P where P.status=?', [req.body.status], function (error, result) {
            if (error) {
                console.log('Erroreeeeee', error)
                res.status(200).json({ status: false, massege: 'Database error pls contect database admin' })
            }
            else {
                console.log('RESULThhhhhhhhhhhh:', result)
                res.status(200).json({ data: result, status: true, massege: 'success' })
            }
        })
    }
    catch (e) {
        console.log('E', e)
        res.status(200).json({ status: false, massege: 'Server error.....' })
    }
})

router.get('/fetch_all_Brand', function (req, res, next) {

    try {
        pool.query('select * from brand  Group by brandname', function (error, result) {
            if (error) {
                console.log('Database Error', error)
                res.status(200).json({ status: false, message: 'Database error , pls contact database admin' });
            }
            else {
                console.log('result', result)
                res.status(200).json({ data: result, status: true, message: ' Success' });
            }
        })
    }
    catch (e) {
        console.log('error', e)
        res.status(200).json({ status: false, message: 'Server error.....' });
    }

})


router.post('/display_all_product_for_menu', function (req, res, next) {
    try {
        console.log('body.....', req.body.categoryid)
        pool.query('select product.*, category.categoryname,brand.brandname from product,category,brand where product.categoryid = category.categoryid and product.brandid=brand.brandid and product.categoryid=? ', [req.body.categoryid], function (error, result) {
            if (error) {
                console.log('Error', error)
                res.status(200).json({ status: false, massege: 'Database error pls contect database admin' })
            }
            else {
                console.log('RESULT:', result)
                res.status(200).json({ data: result, status: true, massege: 'success' })
            }
        })
    }
    catch (e) {
        console.log('E', e)
        res.status(200).json({ status: false, massege: 'Server error.....' })
    }
})


router.post('/display_all_product_detail_by_productid', function (req, res, next) {
    try {
        console.log('bodyyyyyyy', req.body.productid)
        pool.query('select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brand B where B.brandid = P.brandid) as brandname, (select Pr.productname from product Pr where Pr.productid = P.productid) as productname from productdetail P where P.productid=?', [req.body.productid], function (error, result) {
            if (error) {
                res.status(200).json({ status: false, message: 'Database error pls contect database admin' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: true, data: result, message: 'success' })
            }
        })

    }
    catch (e) {
        res.status(200).json({ status: false, message: 'Server error.......' })
    }
})



router.post('/display_all_productdetail_by_productdetailid', function (req, res, next) {
    try {

        pool.query('select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brand B where B.brandid = P.brandid) as brandname, (select Pr.productname from product Pr where Pr.productid = P.productid) as productname,(select Pr.picture from product Pr where Pr.productid = P.productid) as productpicture from productdetail P where P.productdetailid=?', [req.body.productdetailid], function (error, result) {
            if (error) {
                console.log('Erroreeeeee', error)
                res.status(200).json({ status: false, massege: 'Database error pls contect database admin' })
            }
            else {
                console.log('RESULThhhhhhhhhhhh:', result)
                res.status(200).json({ data: result, status: true, massege: 'success' })
            }
        })
    }
    catch (e) {
        console.log('E', e)
        res.status(200).json({ status: false, massege: 'Server error.....' })
    }
})


//   router.post('/add_producte',function(req,res,next){
//     try
//     {
//        pool.query('select * from brand where brandid=?',[req.body.brandid],function(result,error){
//           if(error)
//           {
//               res.status(200).json({status:false , massege:'Database Error Pls Contect database admin'})
//           }
//           else 
//           {
//                 res.status(200).json({status:true , massege:'Succese',data:result})
//           }
//        })
//     }
//     catch(e)
//     {
//         res.status(200).json({status:false , massege:'Server Error'})
//     }
//   })

router.post('/submit_useraccount', function (req, res, next) {
    try {
        console.log('body body body:', req.body)
        pool.query('insert into useraccount (username, mobileno , emailid , addres) values(?,?,?,?)', [req.body.username, req.body.mobileno, req.body.emailid, req.body.addres], function (error, result) {
            if (error) {
                console.log('ERROR', error)
                res.status(200).json({ status: false, massege: 'Database Error Pls Contect database admin' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: true, data: result, massege: ' submit Succesefull' })
            }
        })
    }
    catch (e) {
        res.status(200).json({ status: false, massege: 'server error' })

    }

})

router.post('/check_Account', function (req, res, next) {
    try {
        // console.log('body ', req.body)
        pool.query('select * from useraccount where emailid=? or mobileno=?', [req.body.mobileno, req.body.mobileno], function (error, result) {

            if (error) {
                console.log(error)
                res.status(200).json({ status: false, massege: 'database error pls contect database admin' })
            }
            else {

                if (result.length == 1) {
                    console.log('RESULTRESULTRESULTRESULT', result)
                    res.status(200).json({ status: true, data: result, massege: 'succesess' })

                } else {
                    console.log(result)
                    res.status(200).json({ status: false, data: [], massege: 'number is not found' })

                }

            }
        })
    } catch (e) {
        console.log('eeeeeeeee', e)
        res.status(200).json({ status: false, massege: 'server error' })
    }
})


router.post('/submit_order', function (req, res, next) {
    try {
        console.log('body body body', req.body)
        var q = 'insert into orders (orderdate, productdetailid, qty, paymentstatus, deliverystatus, username, emailid, mobileno, addres) values?'
        pool.query(q, [req.body.cart.map((item) => { return [new Date(), item.productdetailid, item.Qty, req.body.paymentstatus, "undeliverd", req.body.user.username, req.body.user.emailid, req.body.user.mobileno, req.body.user.addres] })], function (error, result) {

            if (error) {
                console.log('ERRORERROR', error)
                res.status(200).json({ status: false, massege: 'database error pls contect database admin' })
            }
            else {
                // console.log('RESULTRESULTRESULT ', result)
                res.status(200).json({ status: true, data: result, massege: 'succesess' })
            }
        })
    } catch (e) {
        console.log('eeeeeeeee', e)
        res.status(200).json({ status: false, massege: 'server error' })
    }
})

router.post('/filter_search', function (req, res, next) {

     console.log('BODY:-', req.body.text)
    try {
        var q = `select PD. * , P. *, B. * from productdetail PD , product P , brand B where PD.brandid = B.brandid and PD.productid = P.productid  and (PD.model like '%${req.body.text}%' or P.productname like '%${req.body.text}%' or B.brandname like '%${req.body.text}%')`
        pool.query(q,function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'databace error pls contect admin', status: false })
            }
            else {
                console.log(result)
                res.status(200).json({ data: result, message: 'succesess', status: true })
            }
        })
    } catch (e) {
        console.log(e)
        res.status(200).json({ message: 'server error', status: false })
    }
})

module.exports = router