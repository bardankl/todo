import React, { useState } from "react";
import styled from "styled-components";

const Card = ({ title, body, id, setTitle, setBody, setEdit, setIdEdit }) => {
  const [isFinished, setIsFinished] = useState(false);

  const onEdit = () => {
    if (isFinished) return alert("You cannot edit finished tasks");
    setEdit(true);
    setTitle(title);
    setBody(body);
    setIdEdit(id);
  };

  return (
    <Wrapper style={isFinished ? { backgroundColor: " #44bba4" } : null}>
      <div className="card-title">
        <p>{title}</p>
      </div>
      <div className="card-body">
        <p>{body}</p>
      </div>
      <div className="icons">
        <button
          className="material-symbols-outlined icon done"
          onClick={() => setIsFinished(!isFinished)}
        >
          done
        </button>
        <button className="material-symbols-outlined icon" onClick={onEdit}>
          edit
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div.attrs((props) => ({
  className: props.className,
}))`
  width: 100%;
  border: 1px solid #dfdfdf;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
  position: relative;

  .finished {
    background-color: var(--finished-color);
  }

  .card-title {
    font-weight: bold;
  }

  .card-title,
  .card-body {
    width: 70%;

    p {
      word-wrap: break-word;
    }
  }

  .icons {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    display: flex;
    gap: 0.5rem;

    .icon {
      background-color: var(--primary-color);
      color: var(--white-color);
      border-radius: var(--border-radius);
      cursor: pointer;
      border: none;
      padding: 0;
    }
  }
`;

export default Card;
