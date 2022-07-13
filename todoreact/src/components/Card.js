import React from "react";
import styled from "styled-components";
import api from "../utils/api";
const Card = ({
  title,
  body,
  id,
  finished,
  setTitle,
  setBody,
  setEdit,
  setIdEdit,
  tasks,
  setTasks,
  edit,
}) => {
  const onEdit = () => {
    if (finished) return alert("You cannot edit finished tasks");
    window.scrollTo(0, 0);
    setEdit(true);
    setTitle(title);
    setBody(body);
    setIdEdit(id);
  };

  const handleFinish = async () => {
    if (edit)
      return alert("Please complete your editing before finishing a task");
    try {
      await api.put(`/tasks/${id}`, {
        title: title,
        body: body,
        finished: !finished,
      });
      const updateTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, finished: !finished };
        } else return task;
      });
      setTasks(updateTasks);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper style={finished ? { backgroundColor: " #44bba4" } : null}>
      <div className="card-title">
        <p>{title}</p>
      </div>
      <div className="card-body">
        <p>{body}</p>
      </div>
      <div className="icons">
        <button
          className="material-symbols-outlined icon done"
          onClick={handleFinish}
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
      text-align: justify;
      text-justify: auto;
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
