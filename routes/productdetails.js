var express = require('express');
var router = express.Router();
var fs = require('fs')
var pool = require('./pool');
const upload = require('./multer');

router.post('/submit_product', upload.any(), function (req, res, next) {
    try {
        // console.log(req.body)
        var filename = req.files.map((file, index) => file.filename)

        pool.query('insert into productdetail ( categoryid, brandid, productid, model, description, color, price, offerprice, stock,hsncode,status, picture) values(?,?,?,?,?,?,?,?,?,?,?,?)',
            [req.body.categoryid, req.body.brandid, req.body.productid, req.body.modelno, req.body.description, req.body.color, req.body.price, req.body.offerprice, req.body.stock, req.body.hsncode, req.body.status, filename + ''], function (error, result) {

                if (error) {
                    console.log('ERROR:', error)
                    res.status(200).json({ status: false, message: 'Database error , pls contact database admin' })
                }
                else {
                    console.log('RESULT:', result)
                    res.status(200).json({ status: true, message: ' Detail submitted Successfully' })
                }
            })
    }
    catch (e) {
        console.log('ERROR  xxxxx:', e)
        res.status(200).json({ status: false, massege: 'Server error.......' })
    }

});

router.post('/fetch_product_by_brand', function (req, res, next) {

    try {

        pool.query('select * from product where brandid=? ', [req.body.brandid], function (error, result) {
            if (error) {
                console.log('Error', error)
                res.status(200).json({ status: false, massege: 'Database error pls contect database admin' })
            }
            else {
                console.log('erult:', result)
                res.status(200).json({ data: result, status: true, massege: 'success' })
            }
        })
    }
    catch (e) {
        console.log('E', e)
        res.status(200).json({ status: false, massege: 'Server error.....' })
    }
})

router.get('/display_all_product_detail', function (req, res, next) {
    try {
        pool.query('select productdetail.*,category.categoryname,brand.brandname,product.productname from productdetail,category,brand,product where productdetail.categoryid=category.categoryid and productdetail.brandid=brand.brandid and productdetail.productid=product.productid', function (error, result) {
            if (error) {
                res.status(200).json({ status: false, message: 'Database error pls contect database admin' })
            }
            else {
                res.status(200).json({ status: true, data: result, message: 'success' })
            }
        })

    }
    catch (e) {
        res.status(200).json({ status: false, message: 'Server error.......' })
    }
})




router.post('/delete_productdetail', function (req, res, next) {
    try {
        pool.query('delete from productdetail where productdetailid=?', [req.body.productdetailid], function (error, result) {
            if (error) {
                console.log('error', error)
                res.status(200).json({ status: false, message: 'Database error,pls product database admin' })

            }
            else {
                console.log('error', result)
                // fs.unlinkSync(`public/images/${req.body.oldpicture}`)
                res.status(200).json({ status: true, message: 'Product Deleted Successfully' })
            }


        })
    }
    catch (e) {

        res.status(200).json({ status: false, message: 'Server Error....' })
    }

});


// router.post('/edit_product_detail_Picture', upload.single('picture'), function (req, res, next) {
//     try {
//         pool.query('update productdetail set picture=? where productdetailid=?', [req.file.filename, req.body.productdetailid], function (error, result) {
//             if (error) {
//                 console.log('Error:', error)
//                 res.status(200).json({ status: false, message: 'Database error , pls contact database admin' })
//             } else {
//                 console.log('RESULT:', result)
//                 fs.unlinkSync(`public/images/${req.body.oldpicture}`)
//                 res.status(200).json({ status: true, message: ' Picture Update  Successfully' })
//             }
//         });
//     }
//     catch (e) {
//         console.log('ERROR:', e)
//         res.status(200).json({ status: false, massege: 'Server error.......' })
//     }
// });


router.post('/edit_product_detail_Data', function (req, res, next) {
    console.log('req.body', req.body)
    try {
        // console.log('req.body', req.body)
        // console.log(req.file)
        pool.query('update productdetail set categoryid=?,brandid=?,productid=?,model=?,description=?,color=?,price=?,offerprice=?,stock=? , status=? , hsncode=? where productdetailid=?', [req.body.categoryid, req.body.brandid, req.body.productid, req.body.model, req.body.description, req.body.color, req.body.price, req.body.offerprice, req.body.stock, req.body.status, req.body.hsncode, req.body.productdetailid], function (error, result) {
            if (error) {
                console.log('Errorssss:', error)
                res.status(200).json({ status: false, message: 'Database error , pls contact database admin' })
            } else {
                console.log('RESULT xxxxx :', result)
                res.status(200).json({ status: true, data: result, message: ' Data Update  Successfully' })
            }
        });
    }
    catch (e) {
        console.log('ERROR:', e)
        res.status(200).json({ status: false, massege: 'Server error.......' })
    }
});


router.post('/edit_product_detail_Picture', upload.any(), function (req, res, next) {
    console.log('FILE :- ',req.files)
    try {
        // console.log("FILENAME",req.file.filename)
        // console.log(req.body.productdetailid)
        var filename = req.files.map((file,index) => file.filename)
        console.log("filename",filename)
        pool.query('update productdetail set picture=? where productdetailid=?', [filename + '',req.body.productdetailid], function (error, result) {

            if (error) {
                console.log('ERROR:', error)
                res.status(500).json({ status: false, message: 'Database error , pls contact database admin' })
            }
            else {
                console.log('RESULT:', result)
                res.status(200).json({ status: true, data:result , message: ' Detail submitted Successfully' })
            }
        })
    }
    catch (e) {
        console.log('ERROR  xxxxx:', e)
        res.status(500).json({ status: false, massege: 'Server error.......' })
    }

});
module.exports = router;
