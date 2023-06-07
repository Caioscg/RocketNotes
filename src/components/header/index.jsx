import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from "./styles";

import { useAuth } from '../../hooks/auth'

export function Header() {
    const { signOut } = useAuth()

    return(
        <Container>

            <Profile to="/profile">
                <img src="https://github.com/Caioscg.png" alt="Foto do usuário" />
                <div>
                    <span>Bem-vindo,</span>
                    <strong>Caio Gonzaga</strong>
                </div>
            </Profile>

            <Logout onClick={signOut}>
                <RiShutDownLine />
            </Logout>

        </Container>
    )
}