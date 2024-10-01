import React, { useState } from 'react';
type Categories = {
    categories: string[],
    onFilter: any,
    onSort: any,
}
const Filters: React.FC<Categories> = ({ categories, onFilter, onSort }) => {
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [availability, setAvailability] = useState(false);

    const handleFilter = () => {
        onFilter({
            category,
            priceRange,
            availability
        });
    };

    return (
        <div className="filters">
            <h2>Filters</h2>

            <div>
                <label>Category</label>
                <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>Price Range</label>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                />
                <p>Max Price: ${priceRange[1]}</p>
            </div>

            <div>
                <label>Availability</label>
                <input
                    type="checkbox"
                    checked={availability}
                    onChange={(e) => setAvailability(e.target.checked)}
                />
                <span>In Stock Only</span>
            </div>

            <button onClick={handleFilter}>Apply Filters</button>

            <div className="sorting">
                <h2>Sort by Price</h2>
                <button onClick={() => onSort('asc')}>Low to High</button>
                <button onClick={() => onSort('desc')}>High to Low</button>
            </div>
        </div>
    );
};

export default Filters;
