import React from 'react';
import '../styles/styles.css';

type SearchAndSortProps = {
    searchTerm: string;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedSort: string;
    onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Newest First'];

const SearchAndSort: React.FC<SearchAndSortProps> = ({
    searchTerm,
    onSearch,
    selectedSort,
    onSortChange,
}) => {
    return (
        <div className="search-sort-container">
            <input
                type="text"
                value={searchTerm}
                onChange={onSearch}
                placeholder="Search products..."
                className="search-bar"
            />
            <select value={selectedSort} onChange={onSortChange} className="sort-dropdown">
                {sortOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SearchAndSort;
