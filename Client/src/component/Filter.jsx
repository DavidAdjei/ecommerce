import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Filter.module.css'; 

const Filter = ({ setVisible, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filtersData, setFiltersData] = useState({});
    const [selectedFilters, setSelectedFilters] = useState({});
    const navigate = useNavigate(); 

    const handleCategoryChange = (event) => {
        const title = event.target.value;
        if (title === "") {
            setSelectedCategory("");
            setFiltersData({});
            setSelectedFilters({});
            return;
        }
        setSelectedCategory(title);
        const selectedCat = categories.find(cat => cat.title === title);
        setFiltersData(selectedCat);
        setSelectedFilters({});
    };

    const handleFilterChange = (filterCategory, option) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filterCategory]: {
                ...prevFilters[filterCategory],
                [option]: !prevFilters[filterCategory]?.[option],
            }
        }));
    };

    const handleFilterSubmit = () => {
        const query = new URLSearchParams({
            category: selectedCategory,
            filters: JSON.stringify(selectedFilters),
        });
        setVisible(false);
        navigate(`/all-products?${query.toString()}`); // Navigate to all-products with query params
    };

    return (
        <div className={styles.filterContainer}>
            <button onClick={() => setVisible(false)} className={styles.toggleButton}>Close Filters</button>
            <div>
                <label htmlFor="categorySelect" style={{ display: 'block', marginBottom: '5px' }}>Select Category:</label>
                <select id="categorySelect" onChange={handleCategoryChange} value={selectedCategory} className={styles.categorySelect}>
                    <option value="">--Select a category--</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat.title}>
                            {cat.title}
                        </option>
                    ))}
                </select>
            </div>
            {Object.values(filtersData).length > 0 && (
                <div>
                    <h4 style={{ marginBottom: '10px' }}>Filter Options:</h4>
                    {Object.keys(filtersData.filters).map((filterCategory) => (
                        <div key={filterCategory} style={{ marginBottom: '15px' }}>
                            <h4 style={{ marginBottom: '10px' }}>{filtersData.filters[filterCategory].filterName}</h4>
                            {filtersData.filters[filterCategory].filterList.map((option) => (
                                <div key={option} style={{ marginBottom: '8px' }}>
                                    <label style={{ fontSize: '14px' }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedFilters[filterCategory]?.[option] || false}
                                            onChange={() => handleFilterChange(filterCategory, option)}
                                            style={{ marginRight: '5px' }}
                                        />
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
            <button onClick={handleFilterSubmit} className={styles.applyButton}>Apply Filters</button>
        </div>
    );
};

Filter.propTypes = {
    categories: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    categories: state.product.categories
});

export default connect(mapStateToProps, {})(Filter);