import React from "react";
import styled from "styled-components";
import Form from "./components/Form";
import CardContainer from "./components/CardContainer";
import { useState } from "react";
const App = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);

  return (
    <Wrapper>
      <Form
        tasks={tasks}
        title={title}
        body={body}
        edit={edit}
        idEdit={idEdit}
        setTasks={setTasks}
        setTitle={setTitle}
        setBody={setBody}
        setEdit={setEdit}
      />
      <CardContainer
        tasks={tasks}
        setTitle={setTitle}
        setBody={setBody}
        setEdit={setEdit}
        setIdEdit={setIdEdit}
      />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
`;

export default App;
