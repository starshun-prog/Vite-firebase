import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from './firebase'

const Admin = () => {
  return (
    <>      
      <h1>Admin</h1>
      <button onClick={async () => await signOut(auth)}>logout</button>
    </>
  )
}

export default Admin