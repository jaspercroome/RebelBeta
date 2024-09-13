import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { LngLatLike, Map, Marker } from "mapbox-gl";
import MapboxGeocoder, { Result } from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import {
  clearLocalForm,
  retrieveLocalForm,
  saveFormLocally,
} from "../beta/forms/utils";

interface FormMapProps {
  onLocationChange: (lngLat: [number, number]) => void;
  value?: [number, number];
}

export const FormMap: React.FC<FormMapProps> = ({
  onLocationChange,
  value = [-98, 35],
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const geocoderRef = useRef<MapboxGeocoder | null>(null);

  const initializeMap = () => {
    if (!mapContainerRef.current || mapRef.current) return;

    const savedLocationData = retrieveLocalForm("betaMap");

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: value,
      zoom: 2.5,
      minZoom: 2.5,
    });

    if (savedLocationData) {
      const data = savedLocationData.data as Result;
      mapRef.current.flyTo({
        center: data.center as LngLatLike,
        zoom: 15,
      });
    }

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

      geocoderRef.current = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl as any,
        marker: new Marker({
          draggable: true,
        }),
        clearOnBlur: false,
      });

      geocoderRef.current.on("result", ({ result }) => {
        console.log(result);
        const center = result.center as [number, number];
        onLocationChange(center);
        saveFormLocally(result, "betaMap");
      });

      mapRef.current.addControl(geocoderRef.current);
    });

    mapRef.current.on("error", (e) => {
      console.error("Mapbox error:", e);
    });
  };

  useEffect(() => {
    initializeMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "400px", backgroundColor: "lightgrey" }}
      />
    </div>
  );
};
