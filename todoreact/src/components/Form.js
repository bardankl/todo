import React from "react";
import styled from "styled-components";
import api from "../utils/api";

const Form = ({
  setTitle,
  setBody,
  setTasks,
  setEdit,
  title,
  body,
  tasks,
  edit,
  idEdit,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValidation() === false) return;
    try {
      const newTask = { id: tasks.length + 1, title, body, finished: false }; // json web service generate ids, you don't need to do it on your own
      await api.post("/tasks", newTask);
      setTasks([...tasks, newTask]); // you shoub apdate state with response from BE, not with item generated on front end...
      setTitle("");
      setBody("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (formValidation() === false) return;
    try {
      await api.put(`/tasks/${idEdit}`, {
        title: title,
        body: body,
        finished: false,
      });
      const updateTasks = tasks.map((task) => {
        if (task.id === idEdit) {
          return { ...task, title: title, body: body };
        } else return task;
      });
      setTasks(updateTasks);
      setEdit(false);
      setTitle("");
      setBody("");
    } catch (err) {
      console.log(err);
    }
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
