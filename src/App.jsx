import React, { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import {
  Input,
  Button,
  Modal,
  Icon,
  Container,
  List,
  Segment
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import copy from "copy-to-clipboard"

export default function App() {
  // data: {
  //         id: '',
  //         createdAt: '',
  //         content: ''
  // }
  const [savedData, setSavedData] = useState([]);
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

  function handleDelete(id) {
    console.log("Removing ", id);

    fetch('/api/delete?id=' + id, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) {
          throw Error("Response Code: ", res.status);
        }
      })
      .catch(err => {
        console.error(err);
      })

    setSavedData(saved => saved.filter(entry => entry.id !== id));
  }

  function handleSubmit() {
    fetch("/api/add", {
      method: 'POST',
      body: JSON.stringify({ content })
    })
      .then(async res => {
        if (!res.ok) {
          throw Error("Response Code: ", res.status);
        }

        console.log("Received");
        const { id, createdAt } = await res.json();
        console.log({ id, createdAt, savedData });
        setSavedData(data => data.map((entry) => {
          if (entry.content === content) {
            entry = {
              ...entry,
              id,
              createdAt
            }
          }
        }))
      })
      .catch(err => {
        setSavedData(data => data.filter(entry => entry.content !== content))
        console.error(err);
      })

    setSavedData(data => [...data, { content, createdAt: "Now", id: "" }])
    setContent("");
  }

  return (
    <Container style={{ margin: '20px' }}>
      <Segment>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Input
              label={{ tag: true, content: 'Add', style: { cursor: 'pointer' }, onClick: handleSubmit }}
              labelPosition='right'
              placeholder='Kuchh type kar...'
              value={content}
              style={{
                marginLeft: '20%',
                marginRight: '20%',
                width: '60%'
              }}
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Segment>
      <Container style={{ padding: '10px', fontSize: '1.1rem' }}>
        <List divided relaxed >
          {
            savedData.map((data, i) => (
              <List.Item key={i}>
                <List.Content>
                  <Input
                    value={data.content}
                    style={{
                      marginLeft: '10%',
                      marginRight: '10%',
                      width: '80%'
                    }}
                  >
                    <Icon color="orange" name="delete" style={{ margin: 'auto auto', marginRight: '10px', cursor: 'pointer' }} onClick={() => handleDelete(data.id)} />
                    <input />
                    <Button color="teal" icon labelPosition='right' onClick={ e => copy(data.content) }>
                      Copy
                      <Icon name="copy" />
                    </Button>
                  </Input>
                  <List.Description style={{ marginLeft: `${10 + 2}%`, fontSize: '0.8rem', color: 'rgb(111, 93, 93)' }}>
                    {data.createdAt}
                  </List.Description>
                </List.Content>
                {/* <List.Content>
                      <List.Icon name='github' size='large' verticalAlign='middle' />
                      <List.Header>
                          {data.content}
                      </List.Header>
                      <List.Description>
                          {data.createdAt}
                      </List.Description>
                  </List.Content> */}
              </List.Item>
            ))
          }
        </List>
      </Container>
    </Container>
  )
}
