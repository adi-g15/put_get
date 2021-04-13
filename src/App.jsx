import React, { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import {
    Container,
    List,
    Segment
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default function App() {
    const [savedData, setSavedData] = useState(["Mesad2", "resf4 43", "34534 fas"]);
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch("/api/index")
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw Error("Response Code: ", res.status);
                }
            })
            .then(data => {
                if (Array.isArray(data))
                    setSavedData(data);
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    function handleSubmit() {
        console.log("Submitted");
        fetch("/api/add", {
            method: 'POST',
            body: JSON.stringify({ content })
        })
            .then(res => {
                if (!res.ok) {
                    throw Error("Response Code: ", res.status);
                }
            })
            .catch(err => {
                setSavedData(data => data.filter(str => str !== content))
                console.error(err);
            })

        setSavedData(data => [...data, content])
        setContent("");    
        }

    return (
        <Container style={{ margin: '20px' }}>
            <Segment>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Input
                            placeholder='Kuchh type kar...'
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                        <Form.Button content='Submit' />
                    </Form.Group>
                </Form>
            </Segment>
            <Container style={{padding: '10px', fontSize: '1.1rem'}}>
                <List divided relaxed >
                    {
                        savedData.map((data, i) => (
                            <List.Item>
                                {data}
                            </List.Item>
                        ))
                    }
                </List>
            </Container>
        </Container>
    )
}
