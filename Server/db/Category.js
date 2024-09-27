const mongoose = require('mongoose');
const FilterSchema = new mongoose.Schema({
  filterName: {
    type: String,
    required: true,
  },
  filterList: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
});

const Category = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  keywords: {
    type: [String], 
  },
  filters: {
    type: Map, 
    of: FilterSchema,
  },
});

module.exports = mongoose.model('Category', Category);
