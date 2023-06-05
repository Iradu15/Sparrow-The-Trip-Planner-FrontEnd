import "./PinPoint.css";
import { useState } from "react";

function PinPointDynamic(){
    const [addButtonVisibility, setAddButtonVisibility] = useState("pin-point__add pin_point__add_hidden");
    const [addedAttraction, setAddedAttraction] = useState("pin-point");
    const [isClickable, setIsClickable] = useState(true);

    // Function that will be activated when the ADD button is clicked
    const changeVisibility = () => {
        if(addButtonVisibility === "pin-point__add pin_point__add_hidden")
            setAddButtonVisibility("pin-point__add pin_point__add_visible");
        else
            setAddButtonVisibility("pin-point__add pin_point__add_hidden");
    }

    // Change the color of the pin point and make it unclickable until
    // the attraction is removed from the list
    const addAttraction = () => { 
        if(addedAttraction === "pin-point"){
            setAddedAttraction("pin-point pin-point__added");
            // Hide the ADD button
            setAddButtonVisibility("pin-point__add pin_point__add_hidden");
            // The pin-point won't be clickable if the attraction is already added
            setIsClickable(false);
        }
    }

    return(
        <div class="pin-point__wrapper">
            <button class={addButtonVisibility} onClick={addAttraction}>ADD</button>

            {isClickable ? (
                <div class={addedAttraction} onClick={changeVisibility}></div>
            ) : (
                <div class={addedAttraction}></div>
            )}
        </div>
    )
}

export default PinPointDynamic;