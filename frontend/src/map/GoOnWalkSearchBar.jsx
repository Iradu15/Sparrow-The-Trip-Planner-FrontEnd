import "./GoOnWalkSearchBar.css";
import search_icon from "../assets/images/icons/search.png"
import { useState } from "react";

function GoOnWalkSearchBar({onSearchChange, onVerifiedChange}){
    const [isFocused, setIsFocused] = useState("search_bar");

    const inputIsFocused = () => {
        setIsFocused("search_bar search_bar__focused");
    }

    const inputIsNotFocused = () => {
        setIsFocused("search_bar");
    }

    const handleSearchInputChange = (event) => {
        onSearchChange(event.target.value);
    }

    const handleVerifyInputChange = (event) => {
        onVerifiedChange(event.target.checked);
    }

    return (
        <div className="search_section">
            <div className="search_bar_wrapper">
                <div className={isFocused}>
                    <img src={search_icon} alt="search"/>
                    <input type="text" 
                        onFocus={inputIsFocused}
                        onBlur={inputIsNotFocused}
                        onChange={handleSearchInputChange}    
                    />
                </div>
                <div className="search_checkbox">
                    <input type="checkbox" 
                        name="verified_route" 
                        id="verified_route"
                        onChange={handleVerifyInputChange}
                    />
                    Verified Route
                </div>
            </div>
            <button className="btn__search">Search</button>
        </div>
    )
}

export default GoOnWalkSearchBar;