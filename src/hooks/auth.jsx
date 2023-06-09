import { createContext, useContext, useState, useEffect } from "react"

import { api } from '../services/api'

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [data, setData] = useState({})

    async function signIn({ email, password }) {
        try {
            const response = await api.post("/sessions", { email, password })
            const { user, token } = response.data

            localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
            localStorage.setItem("@rocketnotes:token", token)
            
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`  // aplica o token para todas no cabeçalho de todas requisições desse user
            setData({ user, token }) // armazena no estado

        } catch(error) {  // tratamento de excessões
            if(error.response) {
                alert(error.response.data.message)
            }
            else {
                alert("Não foi possível entrar.")
            }
        }
    }

    function signOut() {
        localStorage.removeItem("@rocketnotes:token")
        localStorage.removeItem("@rocketnotes:user")

        setData({}) // objeto vazio, pra levar pro authRoutes
    }

    async function updateProfile({ user, avatarFile }) {
        try {
            
            if (avatarFile) {
                const fileUploadForm = new FormData() // criando arquivo
                fileUploadForm.append("avatar", avatarFile)  // adicionando no campo "avatar" a foto

                const response = await api.patch("/users/avatar", fileUploadForm)
                user.avatar = response.data.avatar  // salva o avatar no backend
            }

            await api.put("/users", user)
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user)) // substituindo pelos dados atualizados

            setData({ user, token: data.token })
            alert("Perfil atualizado.")

        } catch(error) {  // tratamento de excessões
            if(error.response) {
                alert(error.response.data.message)
            }
            else {
                alert("Não foi possível atualizar o perfil.")
            }
        }
    }

    async function sendNewNote(title, description, tags, links){
        try{            
            await api.post("/notes", {
                title,
                description,
                tags,
                links
            })
            alert("Nota criada com sucesso")
        } catch(error) {
            if(error.response){
                alert(error.response.data.message)
            } else {
                alert("Nota não cadastrada")
            }
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("@rocketnotes:token")
        const user = localStorage.getItem("@rocketnotes:user")

        if (token && user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}` // aplica o token para todas no cabeçalho de todas requisições desse user

            setData({
                token,
                user: JSON.parse(user)
            })
        }

    }, [])  // 1 parte do useEffect -> o que ele irá executar
            // 2 parte -> o estado que quando mudar disparará o useEffect, neste caso vazio (rederizará 1 vez após a rederização da pagina)
            // se colocasse algo no [] o useEffect seria chamado sempre que esse estado mudasse + 1 vez após a renderização

    return(
        <AuthContext.Provider value={{ 
            signIn,
            signOut,
            updateProfile,
            user: data.user,
            sendNewNote
            }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }