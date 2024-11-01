"use client";
import React from "react";

const MemeGallery: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index}`}
          className="w-full h-auto"
        />
      ))}
    </div>
  );
};

export default MemeGallery;
