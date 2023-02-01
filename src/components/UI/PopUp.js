import classes from "./PopUp.module.css";
import ReactDOM from "react-dom";
import React from "react";

const PopUp = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <React.Fragment>
          <div className={classes.overlay} onClick={props.onClose}></div>
          <div className={classes["pop-up"]}>{props.children}</div>
        </React.Fragment>,
        document.getElementById("pop-up-root")
      )}
    </React.Fragment>
  );
};

export default PopUp;
