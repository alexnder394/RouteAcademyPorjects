import React, { useState } from "react";
import pic1 from "../assets/poert1.png";
import pic2 from "../assets/port2.png";
import pic3 from "../assets/port3.png";

function Gallery() {
  const images = [pic1, pic2, pic3, pic1, pic2, pic3];
  const [layer, setLayer] = useState(null);

  const handleClick = (index) => {
    layer === index ? setLayer(null) : setLayer(index);
  };

  return (
    <>
      <h2 color="dark" className="text-center my-4 fw-bold">
        PORTFOLIO COMPONENT
      </h2>
      <div className="d-flex align-items-center justify-content-center mb-3">
        <i className="fa-solid fa-star d-block text-center"></i>
      </div>
      <div className="container">
        <div className="row gy-3">
          {images.map((img, index) => (
            <div
              className="col-md-4"
              key={index}
              onClick={() => handleClick(index)}
            >
              <img src={img} alt="" className="w-100" />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`position-fixed top-0 start-0 w-100 h-100 z-1 bg-bg-transparent d-flex align-items-center justify-content-center ${
          layer === null ? "d-none" : ""
        }`}
      >
        {layer !== null && (
          <img
            src={images[layer]}
            alt=""
            className="w-50 shadow shadow-lg"
            onClick={() => setLayer(null)}
          />
        )}
      </div>
    </>
  );
}
export default Gallery;
