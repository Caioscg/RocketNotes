import { Container, Links } from './styles'

import { Header } from '../../components/header'
import { Button } from '../../components/button'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'
import { ButtonText } from '../../components/ButtonText'

export function Details() {

  return (
    <Container>
      <Header />

      <ButtonText title="Excluir nota" />
      
      <Section title="Links úteis">
        <Links>
          <li><a href="#">https://www.rocketseat.com.br/</a></li>
          <li><a href="#">https://www.rocketseat.com.br/</a></li>
        </Links>
      </Section>

      <Section title="Marcadores">
        <Tag title="express" />
        <Tag title="nodejs" />
      </Section>

      <Button title="Voltar"/>
    </Container>
  )
}