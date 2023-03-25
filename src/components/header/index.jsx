import { Container, Profile } from "./styles";

export function Header() {
    return(
        <Container>

            <Profile>
                <img src="https://github.com/Caioscg.png" alt="Foto do usuário" />
                <div>
                    <span>Bem-vindo,</span>
                    <strong>Caio Gonzaga</strong>
                </div>
            </Profile>

        </Container>
    )
}