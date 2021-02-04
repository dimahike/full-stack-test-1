import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskList } from '../reducer/actions/taskActions';
import SortPopup from '../components/SortPopup';
import Task from '../components/Task';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import CreatorTask from '../components/CreatorTask';
import Pagination from '../components/Pagination';
import { sortItems } from '../data.js';

const HomePage = () => {
  const [selectedPage, setSelectedPage] = useState();
  const [sortBy, setSortBy] = useState(0);
  const { loading: loadingStatus, success: successStatus, error: errorStatus } = useSelector(
    (state) => state.changeStatus,
  );

  const { loading, tasks, page, pages, error } = useSelector((state) => state.taskList);
  const { success } = useSelector((state) => state.createTask);

  const dispatch = useDispatch();

  useEffect(() => {
    const sortName = Object.keys(sortItems)[sortBy];
    dispatch(taskList({ pageNumber: selectedPage, sort: sortName }));
  }, [dispatch, success, selectedPage, sortBy]);

  const selectPage = (page) => {
    setSelectedPage(page);
  };

  const onSelectSortPopup = React.useCallback((index) => {
    setSortBy(index);
    console.log('sort', index);
  }, []);

  return (
    <div className="paper">
      <div>
        <CreatorTask />
        <div className="row space-btw">
          <h1>Task list</h1>
          <SortPopup
            onClickSortPopup={onSelectSortPopup}
            activeSortType={sortBy}
            items={sortItems}
          />
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
        <Pagination page={page} pages={pages} selectPage={selectPage} />
      </div>
    </div>
  );
};

export default HomePage;
