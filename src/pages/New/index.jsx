import { useState } from "react";
import { useAuth } from "../../hooks/auth";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Header } from "../../components/header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/button";

import { Container, Form } from "./styles";

export function New() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [links, setLinks] = useState([]) // começa como um array pq é um array de links
    const [newLink, setNewLink] = useState("") // começa como um texto pq é só um link

    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState("")

    const navigate = useNavigate()
    const { sendNewNote } = useAuth()

    function handleAddLink() {
        setLinks(previousState => [...previousState, newLink])  // adiciona o novo com o que ja tinha antes com o spread operator
        setNewLink("")  // reseta o estado do new
    }

    function handleRemoveLink(deleted) {
        setLinks(previousState => previousState.filter(link => link !== deleted))  // o filter retorna pro setLinks todos os links diferentes do que se quer remover
    }

    function handleAddTags() {
        setTags(previousState => [...previousState, newTag]) // com o spread operator ele não add o antigo array dentro do novo, só os elementos dele
        setNewTag("")  // limpa o value do newTag
    }

    function handleRemoveTag(deleted) {
        setTags(previousState => previousState.filter(tag => tag !== deleted))
    }

    async function handleNewNote() {
        if (!title) {  // tratamento de exceções
            return alert("Digite o título da nota!")
        }

        if (newLink) {
            return alert("Você tem um link no campo de adicionar não salvo. Clique para adicionar ou deixe o campo vazio.")
        }

        if (newTag) {
            return alert("Você tem uma tag no campo de adicionar não salva. Clique para adicionar ou deixe o campo vazio.")
        }

        await sendNewNote(title, description, tags, links)
        navigate("/") // depois de criar a nota, ir para a home
    }

    return(
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <Link to="/">voltar</Link>
                    </header>

                    <Input 
                        placeholder="Título" 
                        onChange={e => setTitle(e.target.value)}
                    />

                    <Textarea 
                        placeholder="Observações" 
                        onChange={e => setDescription(e.target.value)}
                    />

                    <Section title="Links úteis">
                        {  // coloca chaves pq ta usando o conteudo de uma variavel(lista) e percorrendo ela com o map
                            links.map((link, index) => (
                                <NoteItem
                                    key={String(index)} 
                                    value={link}
                                    onClick={() => handleRemoveLink(link)} // usa esse formato de arrow pq tem parâmetro na função
                                />
                            ))
                        }
                        <NoteItem 
                            isNew 
                            placeholder="Novo link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                ))
                            }

                            <NoteItem 
                                isNew 
                                placeholder="Novo marcador"
                                onChange={e => setNewTag(e.target.value)}
                                value={newTag}
                                onClick={handleAddTags}
                            />
                        </div>
                    </Section>

                    <Button 
                        title="Salvar"
                        onClick={handleNewNote}
                    />

                </Form>
            </main>
        </Container>
    )
}