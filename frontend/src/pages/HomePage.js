import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskList } from '../reducer/actions/taskActions';
import SortPopup from '../components/SortPopup';
import Task from '../components/Task';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const sortItems = ['userName', 'email', 'status'];

const HomePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const { loading: loadingStatus, success: successStatus, error: errorStatus } = useSelector(
    (state) => state.changeStatus,
  );

  const { loading, tasks, error } = useSelector((state) => state.taskList);

  console.log(tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(taskList({}));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const onSelectSortPopup = React.useCallback((index) => {
    // dispatch sort
    // dispatch(setSortBy(sortItems[index]));
    console.log('sort');
  }, []);

  return (
    <div className="paper">
      <form className="creater-task" onSubmit={submitHandler}>
        <h1 className={{ color: 'black' }}>Add your task</h1>
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

      <div>
        <div className="row">
          <h1>Task list</h1>
          <SortPopup onClickSortPopup={onSelectSortPopup} activeSortType={0} items={sortItems} />
        </div>
        {loadingStatus && <LoadingBox />}
        {errorStatus ? (
          <MessageBox variant="danger">{errorStatus}</MessageBox>
        ) : (
          successStatus && <MessageBox variant="success">{successStatus.message}</MessageBox>
        )}
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          tasks.map((task) => <Task key={task._id} task={task} />)
        )}
      </div>
    </div>
  );
};

export default HomePage;
