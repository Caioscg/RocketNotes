import { Container } from './styles'

export function ButtonText({ title, isActived = false, ...rest }) {
    return(
        <Container 
        type='button' 
        isActived={isActived}
        {...rest}
        >
            {title}
        </Container>
    )
}