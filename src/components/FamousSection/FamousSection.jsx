import React, { useState, useEffect } from 'react';
import './FamousSection.css';
import axios from 'axios';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  // TODO: on load, call the fetchPeople() function
  useEffect(() => {
    fetchPeople()
  }, [])


  const fetchPeople = () => {
    // TODO: fetch the list of people from the server
    axios.get('/people')
    .then((response) => {
      setPeopleArray(response.data)
    }).catch((error) => {
      console.log('Error with GET', error)
    })
  }

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);

    // TODO: create POST request to add this new person to the database

    // HINT: the server is expecting a person object 
    //       with a `name` and a `role` property

    axios.post('/people', {name: famousPersonName, role: famousPersonRole} 
    ).then((response) => {
      setPersonName('')
      setPersonRole('')
      fetchPeople()
    }).catch((error) => {
      console.log('Error with POST',  error)
    })

  }

  return (
    <section className="new-person-section">
      <form onSubmit={addPerson}>
        <label htmlFor="name-input">Name:</label>
        <input id="name-input" value = {famousPersonName} onChange={e => setPersonName(e.target.value)} />
        <label htmlFor="role-input">Famous for:</label>
        <input id="role-input" value = {famousPersonRole} onChange={e => setPersonRole(e.target.value)} />
        <button type="submit">Done</button>
      </form>
      <p>
        {famousPersonName} is famous for "{famousPersonRole}".
      </p>
      <ul>
        {/* TODO: Render the list of famous people */}
        {famousPeopleArray.map(famous => (
          <li key ={famous.id}>
            {famous.name} 
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FamousSection;
