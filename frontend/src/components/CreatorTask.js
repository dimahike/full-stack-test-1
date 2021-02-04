import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../reducer/actions/taskActions';

const CreatorTask = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('work sumit');
    dispatch(createTask({ userName: name, email, text }));
  };

  return (
    <form className="creater-task" onSubmit={submitHandler}>
      <h1>Create your task</h1>
      <div>
        <div>
          <input type="text" name="q" id="q" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <input type="text" name="q" id="q" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <textarea
            type="text"
            name="q"
            id="q"
            rows="3"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <button className="primary" type="submit">
            ADD TASK
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatorTask;
