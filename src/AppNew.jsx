import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes.jsx'
import Menu from './Menu';
import { Context } from './context'
import axios from 'axios';


export default function AppNew() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error.message))
  }, [users]);

  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     firstName: "Даниил",
  //     lastName: "Лебедев"
  //   },
  //   {
  //     id: 2,
  //     firstName: "Николай",
  //     lastName: "Ашапатов"
  //   },
  //   {
  //     id: 3,
  //     firstName: "Максим",
  //     lastName: "Тарасов"
  //   },
  // ])

  function createUser(userData) {
    let formData = {};
    userData.forEach((value, key) => (formData[key] = value))
    setUsers([
      ...users,
      { 
        id: Date.now(),
        ...formData
      }
    ])
    console.log(users);
  }
  return (
    <Context.Provider value={{
      createUser
    }}>
      <Router>
        <Menu />
        <Routes users={users}/>
      </Router>
    </Context.Provider>
  );
}