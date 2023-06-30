import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { FiPlus, FiSearch } from 'react-icons/fi'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { api } from '../../services/api'

import { Header } from '../../components/header'
import { Input } from '../../components/Input'
import { ButtonText } from '../../components/ButtonText'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'

export function Home() {
    const [search, setSearch] = useState("")
    const [tags, setTags] = useState([])
    const [tagsSelected, setTagsSelected] = useState([])
    const [notes, setNotes] = useState([])

    const navigate = useNavigate()

    function handleTagsSelected(tagName) {
        if (tagName === "all") {  // se clicar em todos desmarca as outras
            return setTagsSelected([])
        }

        const alreadySelected = tagsSelected.includes(tagName)

        if (alreadySelected) {
            const filteredTags = tagsSelected.filter(tag => tag !== tagName) // filtra deixando so as tags diferentes da passada
            setTagsSelected(filteredTags)
        } 
        else {
            setTagsSelected(prevState => [...prevState, tagName])  // prev state pra nao perder as tags q ja estavam selecionadas
        }
    }

    function handleNotesDetails(id) {
        navigate(`/details/${id}`)
    }

    useEffect(() => {
        async function fetchTags() {  // criei a função dentro do useEffect pq so vai usar dentro dele
            const response = await api.get("/tags")
            setTags(response.data)
        }

        fetchTags()
    }, [])  // array vazio, so atualiza uma vez(quando a page é recarregada)

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
            setNotes(response.data)
        }

        fetchNotes()

    }, [tagsSelected, search])  // executa ao entrar na aplicação e toda vez q mudar o search ou tagsSelected

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
                        onClick={() => handleTagsSelected("all")}
                        isActived={tagsSelected.length === 0} // nao tem tags selecionadas, ativa o "todos"
                    />
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText 
                                title={tag.name}
                                onClick={() => handleTagsSelected(tag.name)}
                                isActived={tagsSelected.includes(tag.name)}  // ativa e desativa se ja tiver a tag
                            />
                        </li>
                    ))
                }
            </Menu>

            <Search>
                <Input 
                    placeholder="Pesquisar pelo título" 
                    icon={FiSearch}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map(note => (
                            <Note 
                                key={String(note.id)}
                                data={note}
                                onClick={() => handleNotesDetails(note.id)}
                            />
                        ))
                    }
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus />
                Criar nota
            </NewNote>
        </Container>
    )
}