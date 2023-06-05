import { useLoadScript } from "@react-google-maps/api"
import { useState, useMemo, useCallback, useRef } from "react"
import { GoogleMap, MarkerClusterer } from "@react-google-maps/api";


const center = {lat: 44.435569, lng: 26.099511};

export default function MainMap({ children }) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "",
    });

    if (!isLoaded) return <>loading...</>;

    return (<GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
        </GoogleMap>)
}
