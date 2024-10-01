import React from 'react';
import '../styles/header.css';
import { MdShoppingCart } from 'react-icons/md';

const Header = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <div className="nav-left">
                    <a href="https://www.goggle.com" className="nav-link">Home</a>
                    <a href="https://www.goggle.com" className="nav-link">Women</a>
                    <a href="https://www.goggle.com" className="nav-link">Men</a>
                    <a href="https://www.goggle.com" className="nav-link">Smart Gear</a>
                    <a href="https://www.goggle.com" className="nav-link">Accessories</a>
                </div>
                <div className="nav-right">
                    <a href="https://www.goggle.com" className="nav-link">
                        <MdShoppingCart size={24} />
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Header;
