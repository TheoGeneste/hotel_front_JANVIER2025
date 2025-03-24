import React from 'react'

const AuthContext = React.createContext({
    // key : value
    isConnected: false,
    // Function to set the value of isConnected
    setIsConnected: () => {},
    role : '',
    setRole: () => {},
    user: {},
    setUser: () => {}
})

export default AuthContext;