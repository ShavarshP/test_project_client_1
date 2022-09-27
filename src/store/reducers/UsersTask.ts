import { UserAction, UserActionTypes, UserTask } from 'store/types';

interface StateTyp {
    isLoading: boolean;
    count: number;
    isAuth: boolean;
    updateCount: number;
    countPageTask: number;
    tasks: UserTask[];
}

const initialState: StateTyp = {
    isLoading: true,
    count: 0,
    updateCount: 0,
    countPageTask: 3,
    isAuth: false,
    tasks: [],
};

export const usersTask = (state = initialState, action: UserAction): StateTyp => {
    switch (action.type) {
        case UserActionTypes.TASK_DATA_UPDATE:
            return { ...state, isLoading: false, tasks: action.payload };
        case UserActionTypes.FETCH_USER_ERROR:
            return { ...state, isLoading: true };
        case UserActionTypes.TASK_DATA_COUNT:
            return { ...state, count: action.payload };
        case UserActionTypes.USER_LOGIN:
            return { ...state, isAuth: true };
        case UserActionTypes.LOADING_START:
            return { ...state, isLoading: true };
        case UserActionTypes.USER_LOGOUT:
            return { ...state, isAuth: false };
        case UserActionTypes.TASK_UPDATE_COUNT:
            return { ...state, updateCount: state.updateCount + 1 };
        case UserActionTypes.ADD_DATA:
            return {
                ...state,
                count: state.count + 1,
                updateCount: state.updateCount + 1,
            };
        case UserActionTypes.DELETE_USER_TASK:
            return {
                ...state,
                count: state.count - 1,
                updateCount: state.updateCount + 1,
            };
        default:
            return state;
    }
};
