import { createContext, useEffect, useState } from "react"

export const userContext = createContext()


export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        name: '',
        score: 0
    })

    // useEffect(() => {
    //     localStorage.setItem("user-data", JSON.stringify(user))
    // },[user])

    const saveUserName = (userName) => {
        let username = userName.charAt(0).toUpperCase() + userName.slice(1)

        setUser((prev) => ({...prev, name: username}))
        localStorage.setItem("username", JSON.stringify(userName))
    }

    const setUserScore = (userscore) => {
        setUser((prev) => ({...prev, score: userscore}))
        localStorage.setItem("userscore", JSON.stringify(userscore))
    }

    return (
        <userContext.Provider value={{user, setUser, saveUserName, setUserScore}}>
            {children}
        </userContext.Provider>
    )

}