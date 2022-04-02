import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const setValueGood = (newValue) => {
    setGood(newValue)
  }
  const setValueNeutral = (newValue) => {
    setNeutral(newValue)
  }
  const setValueBad = (newValue) => {
    setBad(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setValueGood(good + 1)}
        text="good"/>
        <Button handleClick={() => setValueNeutral(neutral + 1)}
        text="neutral"/>
      <Button handleClick={() => setValueBad(bad + 1)}
        text="bad"/>  
      <Statistics good={good} neutral={neutral} bad={bad}/>      
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const Statistics = (props) => {
  <h1>statistics</h1>
  if (props.good != 0 || props.neutral != 0 || props.bad != 0) {
    return(
      <div>
        <h2>statistics</h2>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={props.good+props.neutral+props.bad} />
        <StatisticLine text="average" value={(props.good-props.bad)/(props.good+props.neutral+props.bad)} />
        <StatisticLine text="positive" value={(props.good/(props.good+props.neutral+props.bad))*100}/>
      </div>
    )
  }
  else {
    return (
    <div>
      <h2>statistics</h2>
      <p>No feedback given</p>
    </div>
    )
  }
}




const StatisticLine = (props) => {
  if (props.text=="positive") {
    return (
    <div>
      <table>{props.text} {props.value} %</table>
    </div>
    )
  }
  else {
    return (
      <div>
        <table>{props.text} {props.value}</table>
      </div>
    )
  }
}

/*
<p>all {props.value.good+props.value.neutral+props.value.bad}</p>
      <p>average {(props.value[0]-props.value[2])/(props.value[0]+props.value[1]+props.value[2])}</p>
      <p>positive {(props.value[0]/(props.value[0]+props.value[1]+props.value[2]))*100} %</p>
   */

export default App