const express = require('express');
const router = express.Router();

const passport = require('passport');
// const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Category = require('../../models/category');
const env = require('../../config/.env');


// www.domain.com/api/v1/categories

//add new category
router.post('/', (req, res, next) => {
    let newCategory = new Category({
        name: req.body.name,
        discount: req.body.discount || 0
    });

    Category.addCategory(newCategory, (err, category) => {
        if (err) {
            res
            .status(500)
            .json({
                success: false,
                msg: 'failed to add product'
            });
        } else {
            res
            .status(200)
            .json({
                success: true,
                msg: 'Category added successfully'
            });
        }

    });

}); //end of add products


router.post('/purchase', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let user = req.user;
    let amount = req.body.product.totalAmount;


});

router.get('/', (req, res, next) => {
    Category.getCategories((err, categories) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Error getting categories'
            });
        } else {
            res.json({
                success: true,
                categories: categories
            });
        }
    });
});

router.get('/single/:id', (req, res, next) => {
    let categoryId = req.params.id;
    Category.getCategoryById(categoryId, (err, category) => {
        if (err) {
            res.json({
                success: false,
                msg: 'error getting category'
            });
        } else {
            res.json({
                success: true,
                category: category
            });
        }
    });

});

module.exports = router;