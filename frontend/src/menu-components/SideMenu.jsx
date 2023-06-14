import "../assets/CSS/general-style.css";
import "./SideMenu.css";

export default function SideMenu({title, publicationDate, author, description, attractions}){
    return (
        <div className="side__menu">
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