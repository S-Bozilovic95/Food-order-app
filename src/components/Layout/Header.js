import React from "react";
import foodTable from "../../assets/table-food.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Heder = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>OrderFoodApp</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={foodTable} alt="Table full of food" />
      </div>
    </React.Fragment>
  );
};

export default Heder;
