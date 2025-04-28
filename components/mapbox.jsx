import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import Head from "next/head";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ._n1sQH1YbwS8XZ9LzP7Z1A";

const Mapbox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const markers = [
    { id: 1, lng: -74.006, lat: 40.7128, title: "New York" },
    { id: 2, lng: -118.2437, lat: 34.0522, title: "Los Angeles" },
    { id: 3, lng: -87.6298, lat: 41.8781, title: "Chicago" },
  ];

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-98.5795, 39.8283],
      zoom: 3,
    });

    markers.forEach((marker) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundColor = "red";
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.borderRadius = "50%";

      const popup = new mapboxgl.Popup({ offset: 25 }).setText(marker.title);

      new mapboxgl.Marker(el)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(map.current)
        .getElement()
        .addEventListener("click", () => {
          map.current.flyTo({
            center: [marker.lng, marker.lat],
            zoom: 10,
            essential: true,
          });
        });
    });
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.1.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div
        ref={mapContainer}
        style={{ width: "100%", height: "100vh", position: "relative" }}
      />
    </>
  );
};

export default Mapbox;
