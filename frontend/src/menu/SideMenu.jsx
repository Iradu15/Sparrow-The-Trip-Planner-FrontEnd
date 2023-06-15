import "../assets/CSS/general-style.css";
import "./SideMenu.css";


export default function SideMenu({ title, publicationDate, description, attractions }) {

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const credentials = JSON.parse(localStorage.getItem('credentials'));

  return (
    <>
      <div className="side__menu">
        {isLoggedIn && ( // Only render the buttons if the user is logged in
          <div className="btn__wrapper">
            <div className="btn btn__edit">Edit</div>
            <div className="btn btn__delete">Delete</div>
          </div>
        )}

        <div className="route__informations">
          <h1 className="route__title">{title}</h1>
          <h5 className="route__publication">{publicationDate}</h5>
          <p className="route__description">{description}</p>
        </div>

        <div className="attractions">
          {attractions.map((attraction) => (
            <div className="attraction" key={attraction.id}>
              <div className="attraction-inner">
                <h4 className="attraction__title">{attraction.name}</h4>
                <p className="attraction__description">{attraction.generalDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
