import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../../services/api'

import { Container, Links, Content } from './styles'

import { Header } from '../../components/header'
import { Button } from '../../components/button'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'
import { ButtonText } from '../../components/ButtonText'

export function Details() {
  const [data, setData] = useState(null)

  const params = useParams()

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`)
      setData(response)
    }

    fetchNote()
  }, [])

  return (
    <Container>
      <Header />

      {
        data &&        // se tem conteudo mostra o data
        <main>
          <Content>

            <ButtonText title="Excluir nota" />
            
            <h1>
              {data.title}
            </h1>
            <p>
              {data.description}
            </p>

            {
              data.links &&
              <Section title="Links úteis">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a href={link.url}>
                          {link.url}
                        </a>
                      </li>
                    ))
                  }
                </Links>
              </Section>
            }

            <Section title="Marcadores">
              <Tag title="express" />
              <Tag title="nodejs" />
            </Section>

            <Button title="Voltar"/>

          </Content>
        </main>
      }

    </Container>
  )
}