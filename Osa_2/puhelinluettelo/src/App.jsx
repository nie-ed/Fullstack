import { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Error from './components/Error'

const Persons = ({personsToShow, deletePerson}) => {
  return (
    <ul>
    {personsToShow.map(person => 
      <Person key={person.name} person={person} deletePerson={() => deletePerson()}/>)}
  </ul>
  )
} 


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(list => {
        setPersons(list)
      })
    
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const check = persons.map(person => person.name)
    if (check.includes(newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        
        const found = persons.find(({name}) => name === newName)    
        personService
          .update(found, newNumber)
          .then((changedPerson) => {
            setPersons(persons.map (person => person.name !== newName ? person : changedPerson ))          
            
            setSuccessMessage(
              `Changed ${newName} number.`
            )
          
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
  
            setNewName('')
            setNewNumber('')          
          })

          .catch(error => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server.` 
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)

            
              setPersons(persons.filter((person) => person.name !== newName))
                  
              setNewName('')
              setNewNumber('')

            })

      }
      else {
        setNewName('')
        setNewNumber('')
      }
    }
    else {
      const person = {
        name: newName,
        number: newNumber
      }

      personService
        .create(person)
        .then(newList => {
          setPersons(persons.concat(newList))
        
        })

      setSuccessMessage(
          `Added ${newName}`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

        setNewName('')
        setNewNumber('')
      
    }
    



}

const deletePerson = delId => {
  const found = persons.find(({id}) => id === delId)
  if (window.confirm(`Delete ${found.name}?`)){
    personService
    .deletePerson(delId)
    .then(() => {
      setPersons(persons.filter((person) => person.id !== delId))
    })
  
    setSuccessMessage(
      `Deleted ${found.name}.`
    )
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    
  }

}


const handleNumberChange = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
}
  
const handleFilterChange = (event) => {
  console.log(event.target.value)
  setNewFilter(event.target.value)
}

const personsToShow = newFilter === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Error message={errorMessage}/>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange}/>

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>


      <h3>Numbers</h3>

      <ul>
        {personsToShow.map(person => 
          <Person
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person.id)}
          />
        )}
      </ul>
  
    </div>
    
  )

}

export default App