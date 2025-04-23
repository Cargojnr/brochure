import React from 'react'

const Button = (props) => {
  return (
    <button className={props.class} onClick={props.onClick}>
      {props.btn}
    </button>
  )
}

export default Button