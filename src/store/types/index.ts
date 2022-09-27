export interface UserTask {
    email: string;
    name: string;
    task: string;
    time: string;
    edited: boolean;
    isDone: boolean;
    __v: number;
    _id: string;
}

export enum UserActionTypes {
    USER_LOGIN = 'USER_LOGIN',
    TASK_DATA_COUNT = 'TASK_DATA_COUNT',
    FETCH_USER_ERROR = 'FETCH_USER_ERROR',
    TASK_DATA_UPDATE = 'TASK_DATA_UPDATE',
    TASK_UPDATE_COUNT = 'TASK_UPDATE_COUNT',
    LOADING_START = 'LOADING_START',
    USER_LOGOUT = 'USER_LOGOUT',
    ADD_DATA = 'ADD_DATA',
    DELETE_USER_TASK = 'DELETE_USER_TASK',
}

interface LoadingStart {
    type: UserActionTypes.LOADING_START;
}

interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USER_ERROR;
    payload: string;
}

interface AddContactsData {
    type: UserActionTypes.ADD_DATA;
}

interface LoginUser {
    type: UserActionTypes.USER_LOGIN;
}

interface UserLogout {
    type: UserActionTypes.USER_LOGOUT;
}

interface UserUpdateCount {
    type: UserActionTypes.TASK_UPDATE_COUNT;
}

interface DeleteUserTask {
    type: UserActionTypes.DELETE_USER_TASK;
}

interface GetTaskData {
    type: UserActionTypes.TASK_DATA_UPDATE;
    payload: UserTask[];
}

interface GetTaskCount {
    type: UserActionTypes.TASK_DATA_COUNT;
    payload: number;
}

export type UserAction =
    | DeleteUserTask
    | UserUpdateCount
    | LoginUser
    | GetTaskData
    | GetTaskCount
    | FetchUserErrorAction
    | LoadingStart
    | UserLogout
    | AddContactsData;
