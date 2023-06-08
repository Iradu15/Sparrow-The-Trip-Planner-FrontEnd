import "./NavigationBar.css";
import "../assets/CSS/general-style.css";
import logo from "../assets/images/logo/logo.png";

export default function NavigationBar(){
    return(
        <div class="navigation__bar">
            <img src={logo} id="navigation__logo"/>
            <div class="navigation__links">
                <div className="navigation__link">Attraction +</div>
                <div className="navigation__link">Explore</div>
            </div>
        </div>
    )
}