const Category = require("../db/Category");

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        if (!categories) {
            res.json({ categories: [] });
        } else (
            res.json({ categories })
        )
    } catch (err) {
        console.error(err);
        res.json({error: err.message})
    }
}