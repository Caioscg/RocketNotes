import { createContext, useContext } from "react"

import { api } from '../services/api'

const AuthContext = createContext({})

function AuthProvider({ children }) {
    async function singIn({ email, password }) {
        try {
            const response = await api.post("/sessions", { email, password })
            console.log(response)
        } catch(error) {  // tratamento de excessões
            if(error.response) {
                alert(error.response.data.message)
            }
            else {
                alert("Não foi possível entrar.")
            }
        }
    }

    return(
        <AuthContext.Provider value={{ singIn }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }