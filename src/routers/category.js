//  Router Stored API Routes
const express = require('express')
const router = express.Router()

//  Modelo
const { Category } = require('../models/category')

// http://localhost:3000/api/v1/categories
router.get('/', async (req, res) => {
    const categoryList = await Category.find()
    if (!categoryList) {
        res.status(400).json({
            status: false,
            message: 'Something Went Wrong',
            categories: [],
        })
        // return res.status(404).send('Backend Response: Something went wrong')
    }

    res.status(200).json({
        status: true,
        message: 'Backend Response: Returning a Category List',
        categories: categoryList,
    })
})

router.get('/:id', async (req, res) => {
    const getCategory = await Category.findById(req.params.id)
    if (!getCategory) {
        return res.status(400).json({
            status: false,
            message: 'Backend Response: Not Match Category',
            category: [],
        })
    }

    res.status(200).json({
        status: true,
        message: 'Backend Response: Returning a Category',
        category: getCategory,
    })
})

router.post('/', async (req, res) => {
    const NewOnecategory = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    })

    const response = await NewOnecategory.save()
    if (!response) {
        return res.status(404).json({
            status: false,
            message: 'Backend Response: Cannot be created',
            category: [],
        })
        // return res.status(404).send('Backend Response: Something went wrong')
    }

    res.status(200).json({
        status: true,
        message: 'Backend Response: Created new One Category',
        category: response,
    })
})

router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    }, { new: true })

    if (!category) {
        return res.status(404).json({
            status: false,
            message: 'Backend Response: Cannot be created',
            category: [],
        })
    }
    res.status(200).json({
        status: true,
        message: 'Backend Response: Updated Category',
        category: category,
    })
})

router.delete('/:id', async (req, res) => {
    await Category.findByIdAndRemove(req.params.id)
        .then((category) => {
            if (category) {
                res.status(200).json({
                    status: true,
                    message: 'Backend Response: Category Delete Succesfull',
                })
            }

            return res.status(404).json({
                status: false,
                message: 'Backend Response: Cannot Delete a Category',
            })
        })
        .catch((err) => {
            return res.status(400).json({
                status: false,
                message: `Backend Response: Error ${err.message}`,
            })
        })
})

//  Export
module.exports = router
