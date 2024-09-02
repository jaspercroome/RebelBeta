"use client";
import { useForm } from "react-hook-form";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { useRef } from "react";

export const NewBountyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const mapRef = useRef();
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <label htmlFor="location">Where do you want to look?</label>
      <div ref={mapRef} />
      <input name="location" type="text" />
      <label htmlFor="type">What are you wanting to do?</label>
    </form>
  );
};
