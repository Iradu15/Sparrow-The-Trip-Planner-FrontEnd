import "./assets/CSS/general-style.css";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import MarkerStatic from "./map-components/MarkerStatic";
import GoOnWalkSearchBar from "./map/GoOnWalkSearchBar";
import {isLoggedIn, credentials} from './components/MainPage2'

// when no markers are provided, the map will be centered so that the whole world is visible
const defaultCenter = { lat: 45, lng: 0 };
// 'travel' map style; disable map type switch buttons
const options = { mapId: "77ee2dda51aa3d0d", mapTypeControl: false };

export default function Home() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDDSZwOALrOAUzlAspZcreypL-i1ewGXWE",
  });

  const [error, setError] = useState(false);
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [routes, setRoutes] = useState([]);

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };

  const handleVerifiedChange = (value) => {
    setIsVerified(value);
  };

  // delay data fetching by 0.5s after the user stopped typing
  useEffect(() => {
    const timeout = setTimeout(fetchRoutes, 500);
    return () => clearTimeout(timeout);
  }, [searchQuery, isVerified]);

  const fetchRoutes = () => {
    if (isLoggedIn) {
      // Make the authenticated fetch request
      const credentialsString = `${credentials.username}:${credentials.password}`;
      const encodedCredentials = btoa(credentialsString);

      fetch(
        `http://localhost:8000/route/list/?search=${searchQuery}&verified=${isVerified}`,
        { method: "GET", credentials: "include", headers: {
            Authorization: `Basic ${encodedCredentials}`,
            // Other headers if needed
          }, }
      )
        .then((data) => data.json())
        .then((data) => setRoutes(data.results))
        .catch((error) => setError(error));
        console.log('fetch ok, is loggedIn')
    } 
    else {
      // Handle the case when the user is not logged in
      // You can show an error message or redirect to the login page
      console.log('User not logged in')
      setError("User not logged in.");
    }
  };


  
  if (error) {
    return <></>;
  }

  let markers = null;
  if (routes && routes.length > 0 && map) {
    markers = routes.map((route) => (
      <MarkerStatic
        key={route.id}
        lat={route.startingPointLat}
        lng={route.startingPointLon}
        title={route.title}
        map={map}
      />
    ));
  }

  return (
    <>
      <GoOnWalkSearchBar
        onSearchChange={handleSearchQueryChange}
        onVerifiedChange={handleVerifiedChange}
      />

      {!isLoaded ? (
        "loading..."
      ) : (
        <GoogleMap
          zoom={3.35}
          center={defaultCenter}
          mapContainerClassName="map-container"
          options={options}
          onLoad={(map) => setMap(map)}
        >
          {markers}
        </GoogleMap>
      )}
    </>
  );
}
