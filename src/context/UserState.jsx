import { createContext, useState } from "react"

export const userContext = createContext()


export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        name: '',
        score: 0
    })

    const saveUserName = (userName) => {
        let username = userName.charAt(0).toUpperCase() + userName.slice(1)

        localStorage.setItem("username", username)
        setUser((prev) => ({...prev, name: username}))
    }

    const setUserScore = (userscore) => {
        setUser((prev) => ({...prev, score: userscore}))
    }

    return (
        <userContext.Provider value={{user, setUser, saveUserName, setUserScore}}>
            {children}
        </userContext.Provider>
    )

}