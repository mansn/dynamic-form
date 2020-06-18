import React from 'react'
import style from './styles.module.css'

const Input = ({ fieldName, type, name, label, handler, sortNo, value }) => (
  <label className={style.label} key={sortNo}>
    {label}
    <input
      className={`${style.input} ${type === 'checkbox' && style.checkbox}`}
      type={type}
      name={name}
      onChange={handler(fieldName)}
      value={value}
    />
  </label>
)

export default Input
