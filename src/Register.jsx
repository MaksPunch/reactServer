import React from 'react'
import { useContext } from 'react'
import { Form } from 'react-router-dom';
import { Axios } from 'axios';
import { Context } from './context';

export default function Register() {
  const { createUser } = useContext(Context);
  return (
    <form className="register" method='post' onSubmit={(event) => {createUser(new FormData(event.target)); event.preventDefault();}}>
      <h2>Регистрация</h2>
      <input className="form-control" type="text" name="name" placeholder='Имя и фамилия'/>
      <input className="form-control" type="text" name="username" placeholder='Логин'/>
      <input className="form-control" type="password" name="password" placeholder='Пароль'/>
      <button className="btn" type="submit">Зарегистрироваться</button>
    </form>
  )
}