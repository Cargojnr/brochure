import React from 'react'

const Link = (props) => {
  return (
    <a className={props.class} href={props.href} aria-current={props.current} onClick={props.onClick} >{props.link}</a>
  )
}

export default Link