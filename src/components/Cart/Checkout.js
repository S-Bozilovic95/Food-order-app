import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const isEmpty = (value) => value.trim() === "";
  const isFiveChars = (value) => value.trim().length === 5;

  const confirmHandler = (event) => {
    event.preventDefault();
    const eneteredName = nameInputRef.current.value;
    const eneteredStreet = streetInputRef.current.value;
    const eneteredPostal = postalInputRef.current.value;
    const eneteredCity = cityInputRef.current.value;

    setFormInputsValidity({
      name: !isEmpty(eneteredName),
      street: !isEmpty(eneteredStreet),
      postal: isFiveChars(eneteredPostal),
      city: !isEmpty(eneteredCity),
    });

    const formIsValid =
      !isEmpty(eneteredName) &&
      !isEmpty(eneteredStreet) &&
      !isEmpty(eneteredCity) &&
      isFiveChars(eneteredPostal);

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: eneteredName,
      street: eneteredStreet,
      postal: eneteredPostal,
      city: eneteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !formInputsValidity.name && classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputsValidity.street && classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputsValidity.postal && classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postal && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !formInputsValidity.city && classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
