import { useState } from "react"
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs"
import { RxDotFilled } from "react-icons/rx"

export default function Slider({height='h-[50vh]'}){
    const slides = [
        {
            url: 'https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg'
        },
        {
            url: 'https://cdn.pixabay.com/photo/2016/11/18/15/44/audience-1835431_1280.jpg'
        },
        {
            url: 'https://cdn.pixabay.com/photo/2014/05/21/15/18/musician-349790_960_720.jpg'
        },
        {
            url: 'https://cdn.pixabay.com/photo/2016/11/22/19/15/hand-1850120_1280.jpg'
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length -1 : currentIndex -1;
        setCurrentIndex(newIndex)
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length -1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    }

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }

    return(
        <div className={`max-w-[1050px] ${height} w-full m-44 mt-[8vh] relative group mb-20`}>
            <div style={{backgroundImage: `url(${slides[currentIndex].url})`}} className="rounded-lg w-full h-full bg-center bg-cover duration-500"></div>
        <div>
            <BsChevronCompactLeft onClick={prevSlide} size={30} className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white  cursor-pointer"/>
        </div>

        <div>
            <BsChevronCompactRight onClick={nextSlide} size={30} className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"/>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 ">
        <div className="flex top-4 justify-center py-2">
            {slides.map((slide, slideIndex) => (
                <div key={slideIndex} 
                onClick={() => goToSlide(slideIndex)} 
                className="text-2xl cursor-pointer">
                    <RxDotFilled className="text-white hover:text-blue-400" />
                </div>
            ))}
        </div>
        </div>

        </div> 
    )
}