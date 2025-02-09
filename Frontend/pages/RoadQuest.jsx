"use client";

import { useState } from "react"
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps"

const RoadQuest = () => {
  const position = { lat: 53.54, lng: 10};

  return (
    <APIProvider apiKey={import.vite.env.GOOGLE_MAPS_API}>
      <div className="h-[100vh]">
        <Map zoom={9} center={position}></Map>
      </div>
    </APIProvider>
  )
}

export default RoadQuest