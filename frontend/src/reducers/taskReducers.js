import {
  CHANGE_STATUS_FAIL,
  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS_SUCCESS,
  TASK_LIST_FAIL,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
} from '../reducer/constants/taskListConstantsnts';

export const taskListReducer = (state = { loading: true, task: {} }, action) => {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return { loading: true };
    case TASK_LIST_SUCCESS:
      return {
        loading: false,
        tasks: action.payload.tasks,
      };
    case TASK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const changeStatusReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case CHANGE_STATUS_REQUEST:
      return { loading: true };
    case CHANGE_STATUS_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case CHANGE_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
