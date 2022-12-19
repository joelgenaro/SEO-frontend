import React, { useEffect, useState, useCallback, memo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Map = ({ companies }) => {
  let markers = [];

  markers = companies?.map((obj, key) => {
    if (obj["Company_Location_Geo"]) {
      let coordinate = obj["Company_Location_Geo"].split(",");

      let lat = Number(coordinate[0].slug.replace('"', ""));
      let lng = Number(coordinate[1].slug.replace('"', ""));

      return { id: key, position: { lat: lat, lng: lng } };
    } else if (obj["Company_Location_Name"] != "") {
      let geocoder = new window.google.maps.Geocoder();
      let city = obj["Company_Location_Name"]?.slug.replace('"', "");

      geocoder.geocode(
        {
          address: city,
        },
        function (results, status) {
          if (status === "OK") {
            const result = results[0].geometry.location;
            const lat = result.lat();
            const lng = result.lng();
            return { id: key, position: { lat: lat, lng: lng } };
          }
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
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} onLoad={onLoad}>
      {markers.map(({ id, position }) => (
        <Marker key={id} position={position}></Marker>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(Map);
