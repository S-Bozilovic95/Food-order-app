import React, { useContext, useState } from "react";
import PopUp from "../UI/PopUp";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { addNewOrder } from "../../api/orders/orders";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await addNewOrder(userData, cartCtx.items);

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartActionsBtns = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onShowCart}>
        Close
      </button>
      {cartCtx.items.length > 0 && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  // bind u ovoj funkciji omogucava da unesem potrebne
  // podatke funkciji pri samom prosledjivanju u props druge komponente
  // tako mi CartItem ostaje reusable
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartRegularContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Price</span>
        <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onShowCart} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && cartActionsBtns}
    </React.Fragment>
  );

  const isSubmittingContent = <p>Sending order...</p>;

  const didSubmitContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <button className={classes.button} onClick={props.onShowCart}>
        Close
      </button>
    </React.Fragment>
  );

  return (
    <PopUp onClose={props.onShowCart}>
      {!isSubmitting && !didSubmit && cartRegularContent}
      {isSubmitting && isSubmittingContent}
      {didSubmit && didSubmitContent}
    </PopUp>
  );
};

export default Cart;
