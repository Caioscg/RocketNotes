import { Container } from "./styles";

export function Input({icon: Icon, ...rest}) {  // conversão pra usar letra maiuscula
    return( //se existir o icone ele é mostrado se nao nao
        <Container>
            {Icon && <Icon size={20} />} 
            <input {...rest}/>

        </Container>
    )
}