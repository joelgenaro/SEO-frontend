import React, { useEffect, useState, useCallback, memo } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import Geocode from "react-geocode";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Map = ({ companies }) => {
  Geocode.setApiKey("AIzaSyBbN-R50057ZpqFT3mh4MjRWfc60JupK1A");

  let markers = [];
  markers = companies?.map((obj, key) => {
    if (obj["Company_Location_Geo"]) {
      let coordinate = obj["Company_Location_Geo"].split(",");

      let lat = Number(coordinate[0] ? coordinate[0].replace('"', "") : "");
      let lng = Number(coordinate[1] ? coordinate[1].replace('"', "") : "");

      return { id: key, position: { lat: lat, lng: lng } };
    } else if (obj["Company_Location_Name"] != "") {
      let city = obj["Company_Location_Name"]
        ? obj["Company_Location_Name"].replaceAll('"', "")
        : "";

      Geocode.fromAddress(city).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          return { id: key, position: { lat: lat, lng: lng } };
        },
        (error) => {
          console.error(error);
        }
      );
    }
  });

  // remove null
  markers = markers?.filter(function (element) {
    return element != undefined;
  });
  // map loading
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBbN-R50057ZpqFT3mh4MjRWfc60JupK1A",
  });

  const onLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return isLoaded && markers ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2}
      onLoad={onLoad}
    >
      {markers.map(({ id, position }) => (
        <Marker key={id} position={position}></Marker>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(Map);
