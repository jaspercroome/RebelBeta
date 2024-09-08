"use client";
import { Geocoder } from "@mapbox/search-js-react";
import mapboxgl, { LngLat, LngLatLike, Map } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

interface FormMapProps {
  onClick: (lngLat: [number, number]) => void;
}

export const FormMap = ({ onClick }: FormMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [centroid, setCentroid] = useState<[number, number]>([-120, 45]);
  const [pitch, setPitch] = useState<number>(0);

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: centroid,
      zoom: 7,
      pitch,
    });

    mapRef.current.on("style.load", () => {
      mapRef.current?.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      mapRef.current?.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
    });

    mapRef.current.on("load", () => {
      setMapLoaded(true);
    });
  }, []);

  return (
    <>
      <div className="h-full w-full flex flex-col justify-center align-middle items-start">
        <Geocoder
          accessToken={accessToken}
          map={mapRef.current}
          mapboxgl={mapboxgl}
          value={inputValue}
          onChange={(d) => {
            setInputValue(d);
          }}
          onRetrieve={(location) => {
            const coordinates = location.properties.coordinates;
            const lngLat: [number, number] = [
              coordinates.latitude,
              coordinates.longitude,
            ];
            mapRef.current?.setPitch(60);
            onClick(lngLat);
          }}
          marker
        />
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </>
  );
};
