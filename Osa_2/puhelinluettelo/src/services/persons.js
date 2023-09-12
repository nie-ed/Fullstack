import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request =  axios.get(baseUrl)
  return request.then(response => response.data)

}

const create = newObject => {
  const request =  axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (person, newNumber) => {
  const request = axios.put(`${baseUrl}/${person.id}`, {...person, number: newNumber})
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll: getAll, 
  create: create, 
  deletePerson: deletePerson, 
  update: update
}
