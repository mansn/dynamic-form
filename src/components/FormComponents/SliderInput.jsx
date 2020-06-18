import React from "react";
import style from "./styles.module.css";

const Slider = ({ fieldName, min, max, label, handler, sortNo, value }) => {
  return (
    <label key={sortNo}>
      {label}
      <input className={style.slidervalue} type="text" id="sliderValue" value={value} onChange={() => {}}></input>
      <input
        className={style.input}
        name="slider"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handler(fieldName)}
        step="1"
      />
    </label>
  );
};

export default Slider;
