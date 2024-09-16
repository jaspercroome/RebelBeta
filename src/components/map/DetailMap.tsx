import React, { useEffect, useRef } from "react";
import mapboxgl, { LngLatLike, Map, Marker } from "mapbox-gl";
import MapboxGeocoder, { Result } from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface DetailMapProps {
  value?: [number, number];
}

export const DetailMap: React.FC<DetailMapProps> = ({ value }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);

  const initializeMap = () => {
    if (!mapContainerRef.current || mapRef.current || !value) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: value,
      zoom: 4,
      minZoom: 2.5,
    });

    // Initialize marker
    markerRef.current = new Marker({ draggable: false })
      .setLngLat(value)
      .addTo(mapRef.current);

    mapRef.current.on("load", () => {
      if (!mapRef.current) return;

      mapRef.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      mapRef.current.setTerrain({
        source: "mapbox-dem",
        exaggeration: 1.5,
      });

      mapRef.current.flyTo({ center: value, pitch: 35, zoom: 14 });

      mapRef.current.on("error", (e) => {
        console.error("Mapbox error:", e);
      });
    });
  };

  useEffect(() => {
    initializeMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full flex flex-row justify-center p-4">
      <div
        ref={mapContainerRef}
        style={{ width: "85%", height: "400px", backgroundColor: "lightgrey" }}
      />
    </div>
  );
};
