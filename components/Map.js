import React, { useState, useRef, memo, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const Map = ({ markers }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBbN-R50057ZpqFT3mh4MjRWfc60JupK1A"
  })
  const mapRef = useRef(null);

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds(markers[0].position);
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  useEffect(() => {

  }, [markers])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      center={markers[0].position}
      zoom={2}
      ref={mapRef}
    >
      {markers.map(({ id, position }) => (
        <Marker key={id} position={position}></Marker>
        // <Circle
        //   key={id}
        //   center={position}
        //   radius={500000}
        //   options={{
        //     strokeColor: "#66009a",
        //     strokeOpacity: 0.8,
        //     strokeWeight: 2,
        //     fillColor: `#66009a`,
        //     fillOpacity: 0.35,
        //     zIndex: 1
        //   }}
        // />
      ))}
    </GoogleMap>
  ) : <></>
}

export default memo(Map)