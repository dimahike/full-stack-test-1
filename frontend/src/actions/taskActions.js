import Axios from 'axios';
import {
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAIL,
  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_FAIL,
} from '../../constants/taskListConstants.js';

export const taskList = ({ pageNumber = 1, sort = 'name', order = 1 }) => async (dispatch) => {
  dispatch({
    type: TASK_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/api/tasks/?pageNumber=${pageNumber}&sortBy=${sort}&order=${order}`,
    );

    dispatch({
      type: TASK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const changeStatus = (status, taskId) => async (dispatch) => {
  dispatch({ type: CHANGE_STATUS_REQUEST });

  try {
    const { data } = await Axios.put(`/api/tasks/${taskId}/status`, { status });

    dispatch({
      type: CHANGE_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_STATUS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
