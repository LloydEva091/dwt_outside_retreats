import React, { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Retreats from "./Retreats";
import Layout from "./components/Layout";

const DATA = JSON.parse(localStorage.getItem('retreats')) || []
// const DATA = JSON.parse(localStorage.getItem("tasks")) || [];

const DATA2 = [
  {
    id: "rt-0",
    name: "Eat Retreat",
    mobile: "07700 900453",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    location: [
      {
        lat: "55.7782",
        lng: "4.1041",
      },
    ],
    image: "url-test",
  },
  {
    id: "rt-1",
    name: "Sleep Retreat",
    mobile: "07700 900768",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
      location: [
        {
          lat: "55.7782",
          lng: "4.1041",
        },
      ],
      image: "url-test",
    },
  {
    id: "rt-2",
    name: "Repeat Retreat",
    mobile: "07700 900208",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
      location: [
        {
          lat: "55.7782",
          lng: "4.1041",
        },
      ],
      image: "url-test",
    },
];

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Home Page */}
        <Route index element={<Home retreats={DATA} />} />

        {/* Retreats Routes */}
        <Route path=":id">
          <Route index element={<Retreats />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
