import { Container } from './styles'

export function Tag({ title, ...rest }) {
    return(
        <Container {...rest}>
            <span>{title}</span>
        </Container>
    )
}