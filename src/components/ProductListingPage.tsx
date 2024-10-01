import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import '../styles/styles.css';
import SearchAndSort from './SearchAndSort';

type Product = {
    id: number,
    price: number,
    category: string,
    rating: {
        rate: number,
        count: number
    }
    description: string,
    title: string,
    image: string
}

const ProductListingPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSort, setSelectedSort] = useState('Price: Low to High');
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]); // Categories

    const productsPerPage = 10;

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // Fetch all products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
            setFilteredProducts(response.data.slice(0, productsPerPage));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    // Fetch product categories for filtering
    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products/categories');
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Handle Load More for lazy loading
    const loadMoreProducts = () => {
        const nextPageProducts = products.slice(page * productsPerPage, (page + 1) * productsPerPage);
        setFilteredProducts([...filteredProducts, ...nextPageProducts]);
        setPage(page + 1);
    };

    // Handle sorting by price
    const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const order = event.target.value;
        setSortOrder(order);
        const sortedProducts = [...filteredProducts].sort((a, b) =>
            order === 'asc' ? a.price - b.price : b.price - a.price
        );
        setFilteredProducts(sortedProducts);
    };

    // Handle filtering by category, price, and availability

    const handleCategoryChange = (category: string) => {
        const isSelected = selectedCategory.includes(category);
        const newCategories = isSelected
            ? selectedCategory.filter(cat => cat !== category)
            : [...selectedCategory, category];

        setSelectedCategory(newCategories);
        filterProductsByCategory(newCategories);
    };

    const filterProductsByCategory = (categories: string[]) => {
        if (categories.length === 0) {
            setFilteredProducts(products.slice(0, productsPerPage)); // Show all if no filter
        } else {
            const filtered = products.filter(product =>
                categories.includes(product.category)
            );
            setFilteredProducts(filtered.slice(0, productsPerPage));
        }
    };

    // Handle searching by product name or keyword
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const searchResults = products.filter(product =>
            product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
        );
        setFilteredProducts(searchResults.slice(0, productsPerPage)); // Reset with search results
    };

    return (
        <div className="container">
            <div className="top-bar">
                <div className="product-count">Showing {filteredProducts.length} products</div>
                <SearchAndSort
                    searchTerm={searchQuery}
                    onSearch={handleSearch}
                    selectedSort={selectedSort}
                    onSortChange={handleSort}
                />
            </div>
            <div className="main-content">
                <div className="filters">
                    <h3>Categories</h3>
                    {categories.map(category => (
                        <div key={category}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedCategory.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                />
                                {category}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="products">
                    {loading ? (
                        <div className="shimmer-container">
                            {/* Shimmer effect */}
                            <div className="shimmer-card"></div>
                            <div className="shimmer-card"></div>
                            <div className="shimmer-card"></div>
                        </div>
                    ) : (
                        <ProductCard products={filteredProducts} />
                    )}
                    {!loading && filteredProducts.length < products.length && (
                        <button className="load-more" onClick={loadMoreProducts}>
                            Load More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListingPage;
