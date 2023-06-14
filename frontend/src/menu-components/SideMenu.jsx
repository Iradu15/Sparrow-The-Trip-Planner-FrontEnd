import "../assets/CSS/general-style.css";
import "./SideMenu.css";
import React, { useState , useEffect} from "react";

export default function SideMenu({title, publicationDate, author, description, attractions}){
    const [x, setX] = useState(window.innerWidth / 2);
    const [y, setY] = useState(window.innerHeight / 2);

    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleMenu = () => {
        setIsExpanded(!isExpanded);
    };
    
    useEffect(() => {
        const handleMouseMove = (e) => {
          if (!isExpanded) {
            setY(e.pageY);
          }
        };
    
        window.addEventListener("mousemove", handleMouseMove);
    
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isExpanded]);
    

    const hamburgerStyle = {
        transform: `translateY(${y}px)`, // Update the translateY property to move the hamburger vertically
    };

    return (
        <div 
        className={`side__menu ${isExpanded ? "expanded" : ""}`}>
            
            <div className="hamburger" style = {hamburgerStyle} onClick={handleToggleMenu}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
		    </div>

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
                <div className="attraction">
                    <div className="attraction-inner">
                        <h3 className="attraction__title">Title</h3>
                        <p className="attraction__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum autem vel nobis odit at nemo!</p>
                    </div>
                </div>
                <div className="attraction">
                    <div className="attraction-inner">
                        <h3 className="attraction__title">Title</h3>
                        <p className="attraction__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum autem vel nobis odit at nemo!</p>
                    </div>
                </div>
                <div className="attraction">
                    <div className="attraction-inner">
                        <h3 className="attraction__title">Title</h3>
                        <p className="attraction__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum autem vel nobis odit at nemo!</p>
                    </div>
                </div>
                <div className="attraction">
                    <div className="attraction-inner">
                        <h3 className="attraction__title">Title</h3>
                        <p className="attraction__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum autem vel nobis odit at nemo!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}