import React from "react";
import style from "./styles.module.css";

const Input = ({ fieldName, name, label, handler, sortNo, value, defaultValue }) => (
  <label className={style.label} key={sortNo}>
    {label}
    <textarea
      className={style.input}
      placeholder={defaultValue}
      name={name}
      onChange={handler(fieldName)}
      value={value}
    />
  </label>
);

export default Input;
