import React from 'react';

type PropProduct = {
    products: {
        id: number,
        price: number,
        category: string,
        rating: {
            rate: number,
            count: number
        }
        image?: string,
        title?: string,
        description: string
    }[]

}

const ProductCard: React.FC<PropProduct> = ({ products }) => {

    const truncateDescription = (desc: string, maxLength: number) => {
        return desc.length > maxLength ? `${desc.substring(0, maxLength)}...` : desc;
    };

    return (
        <div className="product-grid">
            {products.map(product => (
                <div className="product-card">
                    <img src={product.image} alt={product.title} />
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-price">Price: ${product.price}</p>
                    <p className="product-price">Category: {product.category}</p>
                    <p className="product-description">{truncateDescription(product.description, 100)}</p>
                </div>))
            }</div>
    )
};

export default ProductCard;
