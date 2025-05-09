import { useState } from "react";
import "./slider.scss";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  const changeSlide = (direction) => {
    if (direction === "left") {
      setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  // Limit to a maximum of 4 images
  const limitedImages = images.slice(0, 4);

  return (
    <div className="slider">
      {/* Fullscreen View */}
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow" onClick={() => changeSlide("left")}>
            <img src="/arrow.png" alt="Left" />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt={`Image ${imageIndex + 1}`} />
          </div>
          <div className="arrow" onClick={() => changeSlide("right")}>
            <img src="/arrow.png" className="right" alt="Right" />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>X</div>
        </div>
      )}

      {/* Main Image */}
      <div className="bigImage">
        <img
          src={limitedImages[0]}
          alt="Main Image"
          onClick={() => setImageIndex(0)}
        />
      </div>

      {/* Thumbnail Images */}
      <div className="smallImages">
        {limitedImages.slice(1).map((image, index) => (
          <img
            src={image}
            alt={`Thumbnail ${index + 1}`}
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
