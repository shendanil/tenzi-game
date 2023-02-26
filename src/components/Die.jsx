import React from "react"

export default function Die(props) {

    const style = props.isHeld ? "green-bg" : ""

    return (
        <div onClick={props.holdDice} id={`die-${props.value}`} className={`die ${style}`}></div>
    )
}