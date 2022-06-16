//  Router Stored API Routes
const express = require('express')
const router = express.Router()
const { Product } = require('../models/products')
const { Category } = require('../models/category')

const mongoose = require('mongoose')

// http://localhost:3000/api/v1/products

// router.get(`/`, async (req, res) => {
//     const productList = await Product.find({}).select('name image -_id')
//     if (!productList) {
//         res.status(400).json({
//             message: 'Something When Wrong',
//             status: false,
//             products: [],
//         })
//     }
//     res.status(200).json({
//         message: 'Backend Response: everthing ok',
//         status: true,
//         products: productList,
//     })
// })
router.get(`/`, async (req, res) => {
    const productList = await Product.find({}).populate('category')
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

//  Recived a Query Params 
router.get(`/`, async (req, res) => {
    let filter = {}
    if ( req.params.categories  ){
        filter = { category : req.query.categories.split(',')}
    }
    const productList = await Product.find(filter).populate('category')
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
router.get('/:id', async (req, res) => {
    const getProduct = await Product.findById(req.params.id).populate(
        'category'
    )
    if (!getProduct) {
        return res.status(400).json({
            status: false,
            message: 'Backend Response: Not Match Product',
            product: [],
        })
    }

    res.status(200).json({
        status: true,
        message: 'Backend Response: Returning a Product',
        product: getProduct,
    })
})
router.get(`/get/count`, async (req, res) => {
    const productCount = await Product.countDocuments()
        .then((count) => {
            if (!count) {
                res.status(500).json({
                    status: false,
                    message: 'Backend Response: Something Went Wrong',
                })
            }

            return res
                .status(200)
                .json({
                    status: true,
                    message: 'Backend Response: Products Count',
                    count,
                })
        })
        .catch((err) => {
            return res
                .status(500)
                .json({
                    status: false,
                    message: 'Backend Response: Something Went Wrong',
                    error: err.message
                })
        })
    // console.log( productCount )
    // const productCount = await Product.countDocuments( ( count ) => count )
    // if (!productCount ) return res.status(500).json({ status: false, message: 'Backend Response: Something Went Wrong'})
    // res.send({
    //     productCount
    // })
})
router.get(`/get/featured`, async (req, res) => {
    const productCount = await Product.find({ isFeatured: true })
        .then((product) => {
            if (!product) {
                res.status(500).json({
                    status: false,
                    message: 'Backend Response: Something Went Wrong',
                    product: []
                })
            }
            return res
                .status(200)
                .json({
                    status: true,
                    message: 'Backend Response: Products Count',
                    product: product,
                })
        })
        .catch((err) => {
            return res
                .status(500)
                .json({
                    status: false,
                    message: 'Backend Response: Something Went Wrong',
                    error: err.message
                })
        })
    // console.log( productCount )
    // const productCount = await Product.countDocuments( ( count ) => count )
    // if (!productCount ) return res.status(500).json({ status: false, message: 'Backend Response: Something Went Wrong'})
    // res.send({
    //     productCount
    // })
})
router.get(`/get/featured/:count`, async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const productCount = await Product.find({ isFeatured: true }).limit(+count)
        .then((product) => {
            if (!product) {
                res.status(500).json({
                    status: false,
                    message: 'Backend Response: Something Went Wrong',
                    product: []
                })
            }
            return res
                .status(200)
                .json({
                    status: true,
                    message: 'Backend Response: Products Featured Limited by:'+ count ,
                    product: product,
                })
        })
        .catch((err) => {
            return res
                .status(500)
                .json({
                    status: false,
                    message: 'Backend Response: Something Went Wrong',
                    error: err.message
                })
        })
    // console.log( productCount )
    // const productCount = await Product.countDocuments( ( count ) => count )
    // if (!productCount ) return res.status(500).json({ status: false, message: 'Backend Response: Something Went Wrong'})
    // res.send({
    //     productCount
    // })
})

router.post(``, async (req, res) => {
    const category = await Category.findById(req.body.category)
    if (!category)
        return res.status(400).json({
            status: false,
            message: 'Backend Response: Invalid Category',
        })

    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        images: req.body.images,
        price: req.body.price,
        description: req.body.description,
        richDescription: req.body.richDescription,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        category: req.body.category,
        dateCreated: Date.now(),
    })

    const response = await product.save()
    if (!response) {
        return res.status(400).json({
            status: false,
            message: 'Backend Response: Cannot Create a Product',
            product: [],
        })
    }
    res.status(201).json({
        status: true,
        message: 'Backend Response: Create a new One Product',
        product,
    })
})

router.put('/:id', async (req, res) => {
    if (mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({
            status: false,
            message: 'Backend Response: Invalid ID ',
        })
    }
    const category = await Category.findById(req.body.category)
    if (!category)
        return res.status(400).json({
            status: false,
            message: 'Backend Response: Invalid Category',
        })
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            image: req.body.image,
            images: req.body.images,
            price: req.body.price,
            description: req.body.description,
            richDescription: req.body.richDescription,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
            category: req.body.category,
            dateCreated: Date.now(),
        },
        { new: true }
    )

    if (!product) {
        return res.status(404).json({
            status: false,
            message: 'Backend Response: Cannot be updated',
            category: [],
        })
    }
    res.status(200).json({
        status: true,
        message: 'Backend Response: Updated Product',
        category: product,
    })
})

router.delete('/:id', async (req, res) => {
    await Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            if (product) {
                res.status(200).json({
                    status: true,
                    message: 'Backend Response: Product Delete Succesfull',
                })
            }

            return res.status(404).json({
                status: false,
                message: 'Backend Response: Cannot Delete a Product',
            })
        })
        .catch((err) => {
            return res.status(400).json({
                status: false,
                message: `Backend Response: Error ${err.message}`,
            })
        })
})



module.exports = router
