//  Router Stored API Routes
const express = require('express')
const router = express.Router()

//  Modelo
const { Category } = require('../models/category')
//  aoi/v1/products
router.get('/', async (req, res) => {})
router.post('/', (req, res) => {})

//  Export
module.exports = router