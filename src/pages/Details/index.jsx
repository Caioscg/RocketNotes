import { Container, Links, Content } from './styles'

import { Header } from '../../components/header'
import { Button } from '../../components/button'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'
import { ButtonText } from '../../components/ButtonText'

export function Details() {

  return (
    <Container>
      <Header />

      <main>
        <Content>

          <ButtonText title="Excluir nota" />
          
          <h1>Introdução ao React</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Laborum provident fuga quibusdam non exercitationem, 
            dicta iste alias dolore accusamus quod quas beatae? 
            Deleniti ad eos expedita aut eaque a ipsam?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Blanditiis, laborum minus in deleniti quos quae fugiat harum commodi, 
            consequatur, culpa pariatur nam! Earum, voluptatem amet? 
            Quisquam est iste in corporis.
          </p>

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

        </Content>
      </main>

    </Container>
  )
}