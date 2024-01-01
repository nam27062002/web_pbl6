// Promo.js

import React, { useState } from "react";
import axios from "axios";
import "../../styles/Components/Promo.css";
import "./style.css";
import util from "../../util";

const Promo = () => {
  const [promoData, setPromoData] = useState({
    title: "",
    des: "",
    code: "",
    discount: "",
    image: "",
    url: "",
    quantity: 2,
    type: "all",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromoData({ ...promoData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (promoData.startDate >= promoData.endDate) {
      util.showToastWarning("Start date must be before the end date");
      return;
    }
    try {
      const response = await axios.post(
        "http://ridewizard.pro:9000/api/v1/promo",
        promoData
      );
      util.showToastSuccess("Successfully created promo");
      setPromoData({
        title: "",
        des: "",
        code: "",
        discount: "",
        image: "",
        url: "",
        quantity: 2,
        type: "all",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      util.showToastWarning("Failed to create promo.");
    }
  };

  return (
    <div className="container-content-history pb-2">
      <h1 className="promo-title text-light">Create Promo</h1>
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <div className="w-50 px-4 mt-1">
            <div className=" ">
              <label htmlFor="title" className="text-light">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={promoData.title}
                onChange={handleChange}
                required
                className="form-item-promo"
              />
            </div>
            <div className="">
              <label htmlFor="des" className="text-light">
                Description:
              </label>
              <input
                type="text"
                id="des"
                name="des"
                value={promoData.des}
                onChange={handleChange}
                className=" form-item-promo"
              />
            </div>
            <div className="">
              <label htmlFor="code" className="text-light">
                Code:
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={promoData.code}
                onChange={handleChange}
                required
                className="form-item-promo"
              />
            </div>
            <div className="">
              <label htmlFor="discount" className="text-light">
                Discount (%):
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={promoData.discount}
                onChange={handleChange}
                required
                className="form-item-promo"
              />
            </div>
            <div className="">
              <label htmlFor="image" className="text-light">
                Image URL:
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={promoData.image}
                onChange={handleChange}
                className="form-item-promo"
              />
            </div>
          </div>
          <div className="w-50 px-4 mt-2">
            <div className="">
              <label htmlFor="url" className="text-light">
                URL:
              </label>
              <input
                type="text"
                id="url"
                name="url"
                value={promoData.url}
                onChange={handleChange}
                className="form-item-promo"
              />
            </div>
            <div className="">
              <label htmlFor="quantity" className="text-light">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={promoData.quantity}
                onChange={handleChange}
                className="form-item-promo"
              />
            </div>
            <div className="">
              <label htmlFor="type" className="text-light">
                Type:
              </label>
              <select
                id="type"
                name="type"
                value={promoData.type}
                onChange={handleChange}
                className="form-item-promo"
              >
                <option value="all">All</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="">
              <label htmlFor="startDate" className="text-light">
                Start Date:
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={promoData.startDate}
                onChange={handleChange}
                className="form-item-promo"
              />
            </div>
            <div className="">
              <label htmlFor="endDate" className="text-light">
                End Date:
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={promoData.endDate}
                onChange={handleChange}
                className="form-item-promo"
              />
            </div>
          </div>
        </div>

        <div className="ms-4 mt-3">
          <button type="submit" className="submit-button button-style">
            Create Promo
          </button>
        </div>
      </form>
    </div>
  );
};

export default Promo;
