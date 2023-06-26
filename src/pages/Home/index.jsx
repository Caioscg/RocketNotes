import { useState, useEffect } from 'react'

import { FiPlus, FiSearch } from 'react-icons/fi'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { api } from '../../services/api'

import { Header } from '../../components/header'
import { Input } from '../../components/Input'
import { ButtonText } from '../../components/ButtonText'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'

export function Home() {
    const [tags, setTags] = useState([])

    useEffect(() => {
        async function fetchTags() {  // criei a função dentro do useEffect pq so vai usar dentro dele
            const response = await api.get("/tags")
            setTags(response.data)
        }

        fetchTags()
    }, [])  // array vazio, so atualiza uma vez(quando a page é recarregada)

    return (
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>

            <Header />

            <Menu>
                <li>
                    <ButtonText 
                        title="Todos" 
                        isActived
                    />
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText 
                                title={tag.name}
                            />
                        </li>
                    ))
                }
            </Menu>

            <Search>
                <Input placeholder="Pesquisar pelo título" icon={FiSearch}/>
            </Search>

            <Content>
                <Section title="Minhas notas">
                    <Note data={{
                        title: "React",
                        tags: [
                            {id: '1', name: 'react'},
                            {id: '2', name: 'nodejs'}
                        ]
                    }}></Note>
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus />
                Criar nota
            </NewNote>
        </Container>
    )
}