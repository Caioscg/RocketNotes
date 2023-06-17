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

    function handleAddLink() {
        setLinks(previousState => [...previousState, newLink])  // adiciona o novo com o que ja tinha antes com o spread operator
        setNewLink("")  // reseta o estado do new
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
                        {
                            links.map((link, index) => (
                                <NoteItem
                                    key={String(index)} 
                                    value={link}
                                    onClick={() => { }}
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
                            <NoteItem value="react"/>
                            <NoteItem isNew placeholder="Novo marcador"/>
                        </div>
                    </Section>

                    <Button title="Salvar"/>

                </Form>
            </main>
        </Container>
    )
}