import React from "react";
import "../styles/LandingPage.css";
import { sections } from "../data/data";
import Games from "./Games";

export default function LandingPage() {
  return (
    <div>
      <div className="LandingPageImage" />
      <p className="welcome">Welcome to English For Kids</p>
      <div>
        <div className="row">
          {sections.map((section) => (
            <Games
              key={section.id}
              id={section.id}
              alt={section.name}
              src={section.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
