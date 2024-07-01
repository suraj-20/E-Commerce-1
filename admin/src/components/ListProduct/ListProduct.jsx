import React, { useEffect, useState } from "react";
import "./ListProduct.css";
const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  console.log(Array.isArray(allProducts));

  const fetchInfo = async () => {
    await fetch(`https://${import.meta.env.VITE_APP_BASE_URL}/getAllProducts`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.product);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch(`https://${import.meta.env.VITE_APP_BASE_URL}/deleteProduct`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product, index) => {
          return (
            <div
              key={index}
              className="listproduct-format-main listproduct-format"
            >
              <img
                src={product.image}
                alt=""
                className="listproduct-product-icon"
              />

              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <button
                onClick={() => {
                  removeProduct(product.id);
                }}
                className="listproduct-remove-btn"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
