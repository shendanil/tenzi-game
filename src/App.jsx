import React, { useState } from 'react'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import Die from './components/Die'
import './App.css'

function App() {

  const [dice, setDice] = useState(newArray)
  const diceElements = dice.map(
      element => <Die key={element.id} value={element.value} isHeld={element.isHeld} holdDice={() => holdDice(element.id)} />
  )
  const [tenzi, setTenzi] = useState(false)

  const [rollsText, setRollsText] = useState("Make your first roll!")
  const [rolls, setRolls] = useState(1)


  function newDice() {
    return {
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }
  }
  

  function newArray() {
    const array = []
    for (let i = 0; i < 10; i++) {
      array.push(newDice())
    }
    return array
  }
  

  React.useEffect(() => {
    const firstValue = dice[0].value
    const allEqual = dice.every(die => die.value === firstValue)
    const allHeld = dice.every(die => die.isHeld)

    if (allHeld && allEqual) {
      setTenzi(true)
      setRollsText(`Congrats! You've won with ${rolls - 1} rolls.`)
    } else {
      setTenzi(false)
    }
  }, [dice])
  

  function roll() {
    if (tenzi) {
      setDice(oldDice => oldDice.map(() => newDice()))
      setRolls(1)
      setRollsText("Make your first roll!")
    } else {
      setDice(oldDice => oldDice.map(element => {
        return element.isHeld ?
        element :
        newDice()
      })
      )
      setRolls(prevRolls => prevRolls + 1)
      setRollsText(`You've maid ${rolls} ${rolls === 1 ? "roll" : "rolls"}.`)
      
    }  
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(element => {
      return id === element.id ?
        {...element, isHeld: !element.isHeld} :
        element
    }))
  }



  return (
    <>
      {tenzi && <Confetti />}
      <div className="container">
        <h1 className='title'>Tenzi game</h1>
        <p className='description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='wrapper'>
          {diceElements}
        </div>
        <p className='rolls'>{rollsText}</p>
        <button onClick={roll}>{tenzi ? "New game" : "Roll"}</button>
      </div>
    </>
  )
}

export default App