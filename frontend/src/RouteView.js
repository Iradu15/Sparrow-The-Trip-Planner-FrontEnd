import { useState, useEffect, useRef } from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import MarkerStatic from "./map-components/MarkerStatic";

// when no markers are provided, the map will be centered so that the whole world is visible
const defaultCenter = { lat: 45, lng: 0 };
// 'travel' map style; disable map type switch buttons
const options = { mapId: "77ee2dda51aa3d0d", mapTypeControl: false };

export default function RouteView({ routeId }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [error, setError] = useState(false);
  const [map, setMap] = useState(null);
  const [route, setRoute] = useState({});
  const [attractions, setAttractions] = useState([]);

  const markers = attractions.map((attraction) => (
    <MarkerStatic
      key={attraction.id}
      lat={attraction.latitude}
      lng={attraction.longitude}
      title={attraction.name}
      map={map}
    />
  ));

  useEffect(() => {
    fetch(`http://localhost:8000/route/detail/${routeId}/`)
      .then((data) => data.json())
      .then((data) => setRoute(data))
      .catch((error) => setError(error));

    // fetch the associated attractions
    fetch(
      `http://localhost:8000/attraction/list/?isWithin__route_id=${routeId}`,
      { method: "GET", credentials: "include" }
    )
      .then((data) => data.json())
      .then((data) => setAttractions(data.results))
      .catch((error) => setError(error));
  }, [routeId]);

  if (error) {
    return <></>;
  }

  return (
    <>
      <div>
        console.log(route);
        {route.verified && <h4>verified!</h4>}
        <h3>{route.title}</h3>
        <h5>{route.publicationDate}</h5>
        <h6>{route.description}</h6>
      </div>

      {isLoaded && (
        <GoogleMap
          zoom={3.35}
          center={defaultCenter}
          mapContainerClassName="map-container"
          options={options}
          onLoad={(map) => setMap(map)}
        >
          {isLoaded && markers}
        </GoogleMap>
      )}
    </>
  );
}
