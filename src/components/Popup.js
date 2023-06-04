import { useState } from "react";
import Button from "./Button";

const Popup = ({ setShowPopup }) => {
  return (
    <div className="popup">
      <p>Are you sure?</p>
      <Button
        className={"btn"}
        type={"button"}
        onClick={console.log("Yes")}
        caption={"Yes"}
      />
      <Button
        className={"btn"}
        type={"button"}
        onClick={setShowPopup(false)}
        caption={"No"}
      />
    </div>
  );
};

export default Popup;
