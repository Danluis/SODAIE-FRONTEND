const Slider = ({ min, max, value, onChange, className }) => {
  return (
    <div className="relative w-full">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className={`h-1 appearance-none cursor-pointer ${className}`}
        style={{
          WebkitAppearance: 'none',
          appearance: 'none',
          outline: 'none',
          background: `linear-gradient(to right, #096EA8 0%, #096EA8 ${(value - min) / (max - min) * 100}%, #4D4D4D ${(value - min) / (max - min) * 100}%, #4D4D4D 100%)`,
        }}
      />
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: white;
          transition: width 0.1s ease-in-out, height 0.1s ease-in-out;
        }
        input[type="range"]:hover::-webkit-slider-thumb {
          width: 14px;
          height: 14px;
        }

        input[type="range"]::-moz-range-thumb {
          appearance: none;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: white;
        }
        input[type="range"]:hover::-moz-range-thumb {
          width: 16px;
          height: 16px;
        }

        input[type="range"]::-ms-thumb {
          appearance: none;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: white;
          transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
        }
        input[type="range"]:hover::-ms-thumb {
          width: 16px;
          height: 16px;
        }

        input[type="range"]::-ms-fill-lower {
          background: #3b82f6;
        }
        input[type="range"]::-ms-fill-upper {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
};

export default Slider;
