import React from "react";

function ScrollMenuWithCategories({ options, name, placeholder, onSelect }) {
  return (
    <div className="scroll-menu">
      <select name={name} onChange={onSelect} className="scroll-menu-select">
        <option value="">{placeholder}</option>
        {Object.keys(options).map((categoria) => (
          <optgroup label={categoria} key={categoria}>
            {options[categoria].map((instrumento) => (
              <option value={instrumento} key={instrumento}>
                {instrumento}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

export default ScrollMenuWithCategories;
