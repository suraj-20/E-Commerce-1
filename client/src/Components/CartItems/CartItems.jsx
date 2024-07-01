import React, { useContext, useEffect, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Contexts/ShopContext";
import toast from "react-hot-toast";
// import remove_icon from "../Assets/cart_cross_icon.png";
const CartItems = () => {
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  } = useContext(ShopContext);

  const [subtotal, setSubtotal] = useState(null);

  useEffect(() => {
    const calculateSubtotal = async () => {
      const totalAmount = await getTotalCartAmount();
      setSubtotal(totalAmount);
    };

    calculateSubtotal();
  }, [getTotalCartAmount]);
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Add/Remove</p>
      </div>
      <hr />
      {all_product.map((e, i) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={i}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${e.new_price * cartItems[e.id]}</p>

                <div className="addremove">
                  <button
                    onClick={() => {
                      addToCart(e.id);
                      toast.success("Added");
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      removeFromCart(e.id);
                      toast.success("Removed");
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartiems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${subtotal !== null ? subtotal : "Loading..."}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${subtotal !== null ? subtotal : "Loading..."}</h3>
            </div>
          </div>
          {subtotal ? (
            <button
              onClick={() => {
                toast.success("Order Successfully");
              }}
            >
              PROCEED TO CHECKOUT
            </button>
          ) : (
            <button
              onClick={() => {
                toast.error("Item not found");
              }}
            >
              PROCEED TO CHECKOUT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
