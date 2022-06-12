import React, { useState } from 'react'
import { Box, Button, Grid, Paper, TextField } from '@mui/material'
import { signOut } from 'firebase/auth'
import { useSelector } from 'react-redux'
import { selectUser } from './feature/userSlice'
import { auth, db } from './firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
// import { FirebaseApp } from 'firebase/app'

const Admin = () => {
    const user = useSelector(selectUser);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const sendInfo = (e) => {
        e.preventDefault();
        addDoc(collection(db, "testSubmit"), {
            name: name,
            email: email,
            timestamp: serverTimestamp()
        })
        setName("")
        setEmail("")
    }
  return (
    <Grid container component="main" justifyContent="center" alignItems="center" height="50vh">
        <Grid item sm={8} component={Paper}> 
            <h1>Admin</h1>
            <Box component="form" onSubmit={sendInfo}>       
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='name'
                  label='Name'
                  name='name'
                  autoComplete='name'
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  variant='contained'
                  type='submit'
                  disabled={!name && !email}
                >
                    Submit
                </Button>
                <Button
                  variant='outlined'
                  sx={{
                    margin: "20px"
                  }}
                  onClick={async () => await signOut(auth)}
                >
                  logout
                </Button>
            </Box>
        </Grid>   
    </Grid>
  )
}

export default Admin