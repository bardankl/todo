import React from "react";
import styled from "styled-components";
import Card from "./Card";
const CardContainer = ({
  tasks,
  edit,
  setTitle,
  setBody,
  setEdit,
  setIdEdit,
}) => {
  return (
    <Wrapper>
      {tasks.map((item) => {
        return (
          <Card
            title={item.title}
            body={item.body}
            id={item.id}
            edit={edit}
            key={item.id}
            setTitle={setTitle}
            setBody={setBody}
            setEdit={setEdit}
            setIdEdit={setIdEdit}
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
