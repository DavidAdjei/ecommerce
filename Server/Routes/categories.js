const { getAllCategories } = require('../Controllers/categoryController')

const router = require('express').Router()


router.get('/', getAllCategories)

module.exports  = router