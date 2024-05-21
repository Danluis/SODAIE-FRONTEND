import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export default function Slider() {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://i.imgur.com/zZTPoFK.png",
    },
    {
      url: "https://wallpaperaccess.com/full/4849378.jpg",
    },
    {
      url: "https://images.unsplash.com/photo-1433622070098-754fdf81c929?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[1400px] h-[270px] w-full m-auto mt-[8vh] relative group">
      <div className="relative w-full h-full flex justify-center items-center overflow-hidden rounded-lg">
        <img
          src={slides[currentIndex].url}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <BsChevronCompactLeft
          onClick={prevSlide}
          size={30}
          className="hidden group-hover:block absolute top-[50%] -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        />
      </div>
      <div>
        <BsChevronCompactRight
          onClick={nextSlide}
          size={30}
          className="hidden group-hover:block absolute top-[50%] -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        />
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div className="flex top-4 justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            >
              <RxDotFilled className="text-white hover:text-blue-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
