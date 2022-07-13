import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { useEffect } from "react";
import api from "../utils/api";

const CardContainer = ({
  tasks,
  edit,
  setTitle,
  setBody,
  setEdit,
  setIdEdit,
  setTasks,
}) => {
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        console.log(res.data);
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <Wrapper>
      {tasks.map((task) => {
        return (
          <Card
            id={task.id}
            title={task.title}
            body={task.body}
            finished={task.finished}
            key={task.id}
            tasks={tasks}
            edit={edit}
            setTitle={setTitle}
            setBody={setBody}
            setEdit={setEdit}
            setIdEdit={setIdEdit}
            setTasks={setTasks}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  margin-top: 1rem;
`;

export default CardContainer;
