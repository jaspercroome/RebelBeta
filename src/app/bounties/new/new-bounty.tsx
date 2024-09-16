"use client";
import { useForm } from "react-hook-form";
import mapboxgl, { Map } from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

export const NewBountyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  const initializeMap = () => {
    if (!mapContainerRef.current || mapRef.current) return;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
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
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <label htmlFor="location">Where do you want to look?</label>
      <div
        ref={mapContainerRef}
        className="w-[800px] h-[400px] flex flex-col"
      />
      <Input name="location" type="text" />
      <label htmlFor="type">What are you wanting to do?</label>
    </form>
  );
};
