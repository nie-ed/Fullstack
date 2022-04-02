import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)


  let zeros = [0, 0, 0, 0, 0, 0, 0]

  let [points, setPoints] = useState(zeros) 

    
  
  const handleAnecdote = () => {
    setSelected(Math.floor(Math.random() * 7))
  }
  
  const handleVote = () => {
    const copy = [...points]
    copy[selected] +=1
    setPoints(copy)
  }

  
 
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={handleVote} text="vote"/>
      <Button handleClick={handleAnecdote} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <MostVotes score={points} text={anecdotes}/>
    </div>
  )
}

const MostVotes = (props) => {
  let largest = 0
    for (let i = 0; i < props.score.length; i++) {
      if (largest < props.score[i] ) {
        largest = props.score[i];
      }
    }
  const index = props.score.indexOf(largest)
  const anecdote = props.text[index]
  return (
    <div>
    <p>{anecdote}</p>
    <p>has {largest} votes </p>
    </div>
  )
}


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

export default App