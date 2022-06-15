//  Router Stored API Routes
const express = require('express')
const router = express.Router()
const {Product} = require( '../models/products' )
//  aoi/v1/products
router.get(`/`, async (req, res) => {
    const productList = await Product.find({})
    if (!productList) {
        res.status(400).json({
            message: 'Something When Wrong',
            status: false,
            products: [],
        })
    }
    res.status(200).json({
        message: 'Backend Response: everthing ok',
        status: true,
        products: productList,
    })
})
router.post(``, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
    })

    product
        .save()
        .then((createProduct) => {
            res.status(201).json({ createProduct })
        })
        .catch((err) => {
            res.status(400).json({ err: err, success: false })
        })
})

module.exports = router;
