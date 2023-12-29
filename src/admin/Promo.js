// Promo.js

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Components/Promo.css';

const Promo = () => {
    const [promoData, setPromoData] = useState({
        title: '',
        des: '',
        code: '',
        discount: '',
        image: '',
        url: '',
        quantity: 2,
        type: 'all',
        startDate: '',
        endDate: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPromoData({ ...promoData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://ridewizard.pro:9000/api/v1/promo', promoData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Failed to create promo.');
        }
    };

    return (
        <div className="promo-container">
            <h1 className="promo-title">Create Promo</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={promoData.title}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="des">Description:</label>
                    <input
                        type="text"
                        id="des"
                        name="des"
                        value={promoData.des}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="code">Code:</label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        value={promoData.code}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="discount">Discount (%):</label>
                    <input
                        type="number"
                        id="discount"
                        name="discount"
                        value={promoData.discount}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={promoData.image}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="url">URL:</label>
                    <input
                        type="text"
                        id="url"
                        name="url"
                        value={promoData.url}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={promoData.quantity}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <select
                        id="type"
                        name="type"
                        value={promoData.type}
                        onChange={handleChange}
                        className="form-input"
                    >
                        <option value="all">All</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={promoData.startDate}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={promoData.endDate}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="submit-button">
                        Create Promo
                    </button>
                </div>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );

};

export default Promo;
