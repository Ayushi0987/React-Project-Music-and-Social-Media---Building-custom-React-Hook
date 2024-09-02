import React, { createContext, useContext, useEffect, useState } from 'react'
const Authcontext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState('');
    const [name, setName] = useState('');

    function logout(){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('loggedInUser');
    }

    function login(token, name){
        console.log('login called')
        setToken(token);
        setName(name);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('loggedInUser', name);
    }

    useEffect(()=>{
        setToken(sessionStorage.getItem('token'));
        setName(sessionStorage.getItem('loggedInUser'));
    },[])

  return (
    <Authcontext.Provider value={{token, name, login, logout}}>
        {children}
    </Authcontext.Provider>
  )
}

export const useAuth = () =>{
    return useContext(Authcontext);
} 