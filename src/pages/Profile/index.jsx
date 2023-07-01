import { useState } from "react";
import { useAuth } from '../../hooks/auth'

import { api } from "../../services/api";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import avatarPlaceholder from '../../assets/avatar_placeholder.svg'

import { Input } from "../../components/Input";
import { Button } from "../../components/button";
import { Container, Form, Avatar } from "./styles";

export function Profile() {
    const { user, updateProfile } = useAuth()

    const [name, setName] = useState(user.name)  // user.name (estado inicial)
    const [email, setEmail] = useState(user.email)
    const [passwordOld, setPasswordOld] = useState()
    const [passwordNew, setPasswordNew] = useState()

    const avatarUrl = user.avatar? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder
    const [avatar, setAvatar] = useState(avatarUrl) // se ja tiver um avatar 
    const [avatarFile, setAvatarFile] = useState(null)

    const navigate = useNavigate()

    async function handleUpdate() {
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        }

        const userUpdated = Object.assign(user, updated)  // junta o user com as mudanças, sem perder o que não mudou

        await updateProfile({ user: userUpdated, avatarFile })
    }

    function handleChangeAvatar(event) {  // onChange passa o event de forma automática
        const file = event.target.files[0]   // 1a posição
        setAvatarFile(file)

        const imagePreview = URL.createObjectURL(file)
        setAvatar(imagePreview)
    }

    function handleBack() {
        navigate(-1)   // volta 1 no histórico
    }

    return(
        <Container>
            <header>
                <button type="button" onClick={handleBack}>
                    <FiArrowLeft />
                </button>
            </header>

            <Form>

                <Avatar> 
                    <img 
                        src={avatar} /* picture from github */
                        alt="Foto do usuário" 
                    />

                    <label htmlFor="avatar">
                        <FiCamera />

                        <input 
                            id="avatar"
                            type="file"
                            onChange={handleChangeAvatar}
                        />
                    </label>
                </Avatar>

                <Input 
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <Input 
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input 
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordOld(e.target.value)}
                />

                <Input 
                    placeholder="Nova senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordNew(e.target.value)}
                />

                <Button title="Salvar" onClick={handleUpdate}/>

            </Form>
        </Container>
    )
}