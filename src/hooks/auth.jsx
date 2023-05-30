import { createContext, useContext } from "react"

const AuthContext = createContext({})

function AuthProvider({ children }) {
    return(
        <AuthContext.Provider value={{ name: "Caio Gonzaga", email: 'caio@email.com' }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }