import { Container } from "./styles";

export function Button({ title, loading = false, ...rest }) {  //desestrutulizar props.title // se n passar loading é false

    return (
        <Container 
            type="button"
            disabled={loading}
            {...rest}  //! qlqr outra propriedade - usada e não passada - será executada aqui
        >
            { loading ? "Carregando..." : title }
        </Container>
    )
}