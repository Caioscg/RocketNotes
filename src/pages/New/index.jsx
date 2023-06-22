import { useState } from "react";

import { Link } from "react-router-dom";

import { Header } from "../../components/header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/button";

import { Container, Form } from "./styles";

export function New() {
    const [links, setLinks] = useState([]) // começa como um array pq é um array de links
    const [newLink, setNewLink] = useState("") // começa como um texto pq é só um link

    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState("")

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

    return(
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <Link to="/">voltar</Link>
                    </header>

                    <Input placeholder="Título" />

                    <Textarea placeholder="Observações" />

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
                        <div class="tags">
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

                    <Button title="Salvar"/>

                </Form>
            </main>
        </Container>
    )
}