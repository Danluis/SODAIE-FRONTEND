import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export default function Slider({ height = 'h-[50vh]' }) {
    const slides = [
        {
            url: 'https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg',
            alt: 'Audience in a concert hall'
        },
        {
            url: 'https://cdn.pixabay.com/photo/2016/11/18/15/44/audience-1835431_1280.jpg',
            alt: 'Crowd at a concert'
        },
        {
            url: 'https://cdn.pixabay.com/photo/2014/05/21/15/18/musician-349790_960_720.jpg',
            alt: 'Musician playing guitar'
        },
        {
            url: 'https://cdn.pixabay.com/photo/2016/11/22/19/15/hand-1850120_1280.jpg',
            alt: 'Hand playing a piano'
        }
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
        <div className={`max-w-full ${height} mx-auto mt-12 relative group object-cover overflow-hidden`}>
            <div 
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className="w-full h-full bg-center bg-cover duration-500 rounded-lg"
                role="img"
                aria-label={slides[currentIndex].alt} // Añadir descripción alternativa para accesibilidad
            ></div>
            <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="hidden group-hover:block absolute top-1/2 left-5 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
            >
                <BsChevronCompactLeft />
            </button>
            <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="hidden group-hover:block absolute top-1/2 right-5 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
            >
                <BsChevronCompactRight />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, slideIndex) => (
                    <button
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        aria-label={`Go to slide ${slideIndex + 1}`}
                        className={`text-2xl cursor-pointer ${currentIndex === slideIndex ? 'text-blue-400' : 'text-white'}`}
                    >
                        <RxDotFilled />
                    </button>
                ))}
            </div>
        </div>
    );
}
