import "../assets/CSS/general-style.css";
import "./SideMenu.css";
import React, { useState , useEffect} from "react";
import arrowDownImage from "../assets/images/arrows/arrow-down(1).png";
import arrowUpImage from "../assets/images/arrows/arrow-up(1).png";


export default function SideMenu({title, publicationDate, author, description, attractions}){
    const [y, setY] = useState(window.innerHeight / 2);
    const [prevY, setPrevY] = useState(window.innerHeight / 2 - 1);
    const [isExpanded, setIsExpanded] = useState(false);
    const [direction, setDirection] = useState("down");
    const [hamburgerImage, setHamburgerImage] = useState(arrowUpImage);
    

    const handleToggleMenu = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPrevY(y);
            if(!isExpanded)
                setY(e.pageY);
            
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isExpanded, y]);

    useEffect(() => {

        if (prevY < y) {
          setDirection("down");
          setHamburgerImage(arrowDownImage);
        }
        if (prevY > y) {
          setDirection("up");
          setHamburgerImage(arrowUpImage);
        }
      }, [prevY, y]);

    const hamburgerStyle = {
        transform: `translateY(${y}px)`,
    };


    return (
        <div 
        className={`side__menu ${isExpanded ? "expanded" : ""}`}>
            
            <img src = {hamburgerImage}  className="hamburger"  style = {hamburgerStyle} onClick={handleToggleMenu} />
            <div className="btn__wrapper">
                <div className="btn btn__edit">Edit</div>
                <div className="btn btn__delete">Delete</div>
            </div>

            <div className="route__informations">
                <h1 className="route__title">{title}</h1>
                <h5 className="route__publication">{publicationDate} - {author}</h5>
                <p className="route__description">{description}</p>

            </div>

            <div className="attractions">
                <div id="container">
                    <div id="monitor">
    
                        <div className="attraction">
                            <div className="attraction-inner">
                                <h3 className="attraction__title">Title</h3>
                                <p className="attraction__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum autem vel nobis odit at nemo!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="container">
                    <div id="monitor">
    
                        <div className="attraction">
                            <div className="attraction-inner">
                                <h3 className="attraction__title">Title</h3>
                                <p className="attraction__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum autem vel nobis odit at nemo!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="container">
                    <div id="monitor">
    
                        <div className="attraction">
                            <div className="attraction-inner">
                                <h3 className="attraction__title">Title</h3>
                                <p className="attraction__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum autem vel nobis odit at nemo!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="container">
                    <div id="monitor">
    
                        <div className="attraction">
                            <div className="attraction-inner">
                                <h3 className="attraction__title">Title</h3>
                                <p className="attraction__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum autem vel nobis odit at nemo!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum autem vel nobis odit at nemo!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum autem vel nobis odit at nemo!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}