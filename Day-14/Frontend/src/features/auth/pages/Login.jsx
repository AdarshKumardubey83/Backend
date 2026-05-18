import React from 'react'
import '../style/form.scss'

const login = () => {
  return (
    <main>
      <div className='form-container'>
        <h1>Login</h1>
        <form>
          <input type='text' name='username' placeholder='Enter username'></input>
          <input type='password' name='password' placeholder='Enter password'></input>
          <button type='submit'>Login</button>
        </form>
      </div>
    </main>
  )
}

export default login