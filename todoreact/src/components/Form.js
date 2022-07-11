import React from "react";
import styled from "styled-components";

const Form = ({
  setTitle,
  setBody,
  edit,
  setEdit,
  setTasks,
  idEdit,
  tasks,
  title,
  body,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValidation() === false) return;
    const newTask = { title, body, id: Math.random() * 1000 };
    setTasks([...tasks, newTask]);
    setTitle("");
    setBody("");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (formValidation() === false) return;
    const updateTasks = tasks.map((item) => {
      if (item.id === idEdit) {
        return { ...item, title: title, body: body };
      } else return item;
    });
    setTasks(updateTasks);
    setEdit(false);
    setTitle("");
    setBody("");
  };

  const formValidation = () => {
    if (title.length <= 2) {
      alert("Title must be at least 3 characters");
      return false;
    } else if (body.length <= 4) {
      alert("Body must be at least 5 characters");
      return false;
    }
  };

  return (
    <Wrapper>
      <form>
        <label>Title</label>
        <input
          type="text"
          className="title-input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Body</label>
        <textarea
          type="text"
          className="body-input"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        {edit ? (
          <button className="btn-add" onClick={handleEdit}>
            Edit Task
          </button>
        ) : (
          <button className="btn-add" onClick={handleSubmit}>
            Add Task
          </button>
        )}
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius);
  width: 100%;
  height: 15rem;

  form {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    input,
    textarea {
      border: 1px solid var(--primary-color);
      border-radius: var(--border-radius);
    }

    textarea,
    input:focus {
      outline-color: var(--primary-color);
    }

    .title-input {
      width: 40%;
    }

    .body-input {
      width: 80%;
      height: 40%;
      display: block;
      text-align: start;
      resize: none;
    }

    .btn-add {
      background-color: var(--primary-color);
      border: none;
      border-radius: var(--border-radius);
      padding: 0.5rem;
      color: var(--white-color);
    }
  }
`;
export default Form;
