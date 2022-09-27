import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { useActions } from 'hooks/useActions';
import { EditForm, TaskForm } from 'components/Modal';
import { Pagination } from 'components/Pagination';
import { SortDropdown } from 'components/SortDropdown';
import { Loading } from 'components/Loading';

const UsersTask: React.FC = (): JSX.Element => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [editData, setEditData] = useState({ id: '', task: '' });
    const { tasks, isAuth, updateCount, countPageTask, isLoading } = useTypedSelector((state) => state.usersTask);

    const { logOut, updateUserStatus, deleteData, getCount, getTask } = useActions();
    let { search } = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(search);
    const providerParams = searchParams.get('page');
    const sortNameParams = searchParams.get('name');
    const sortEmailParams = searchParams.get('email');

    useEffect(() => {
        getCount();
    }, []);

    useEffect(() => {
        if (updateCount) {
            getTask(countPageTask, Number(providerParams) - 1, sortNameParams, sortEmailParams);
            alert('Request was successful');
        }
    }, [updateCount]);

    useEffect(() => {
        getTask(countPageTask, Number(providerParams) - 1, sortNameParams, sortEmailParams);
    }, [providerParams, sortNameParams, sortEmailParams]);

    return (
        <>
            {editData.id && <EditForm editData={editData} setEditData={setEditData} />}
            {isOpenModal && <TaskForm setIsOpenModal={setIsOpenModal} />}
            <div className="flex justify-center pt-10 items-center my-8">
                <Pagination />
                <button
                    onClick={() => {
                        setIsOpenModal(true);
                    }}
                    className="ml-6 h-max shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-6 rounded"
                >
                    + Add
                </button>
                <button
                    onClick={() => {
                        isAuth ? logOut() : navigate('/login');
                    }}
                    className=" ml-6 h-max shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-6 rounded"
                >
                    {isAuth ? 'Log out' : 'Log in as admin'}
                </button>
            </div>
            <div className="container flex justify-center">
                <div className="w-full  max-w-md min-w-80 px-2  h-full flex flex-col">
                    <div className="px-4 container  flex justify-between items-center py-2 shadow border-b border-gray-300">
                        <div className=" bg-white text-sm text-gray-500 font-bold ">Тasks</div>
                        <SortDropdown />
                    </div>
                    <div className="w-full h-full overflow-auto shadow bg-white">
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <table className="w-full">
                                <tbody className="h-30">
                                    {tasks.map(({ email, name, task, time, _id, isDone, edited }) => (
                                        <tr
                                            key={_id}
                                            className="relative transform scale-100 text-xs py-1 border-b-2 border-blue-100 cursor-default bg-blue-200 bg-opacity-25"
                                        >
                                            <td className="pl-3 pr-3 min-w-max whitespace-no-wrap">
                                                <div className="text-gray-400  pb-1">{name}</div>
                                                <div className="min-w-max whitespace-no-wrap">
                                                    {moment(time).format('M.D.YYYY')}
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        isAuth && updateUserStatus(_id, !isDone);
                                                    }}
                                                    className="my-2 flex items-center h-max shadow text-gray-400 hover:bg-gray-00 focus:shadow-outline focus:outline-none text-white text-xs py-1 px-1 rounded"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={`w-2 h-2 ${
                                                            isDone ? 'text-green-500' : 'text-gray-400'
                                                        } sm:h-6 sm:w-6`}
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <label
                                                        className={`ml-2 cursor-pointer ${
                                                            isDone ? 'text-green-500' : 'text-gray-400'
                                                        } w-full text-sm font-medium`}
                                                    >
                                                        done
                                                    </label>
                                                </button>
                                                {edited && <div className="text-red-400  pb-1">edited</div>}
                                            </td>
                                            <td className="px-2 py-4 whitespace-no-wrap">
                                                <div className="leading-5 text-sm text-gray-500 font-medium pb-2">
                                                    {email}
                                                </div>
                                                <div className="leading-5 text-xs text-gray-900">{task}</div>
                                                {isAuth && (
                                                    <div className="flex justify-end pt-2 items-center">
                                                        <button
                                                            onClick={() => {
                                                                setEditData({ id: _id, task });
                                                            }}
                                                            className="whitespace-no-wrap  h-max shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-1 px-3 rounded"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                deleteData(_id);
                                                            }}
                                                            className="whitespace-no-wrap h-max shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white text-xs py-1 px-3 rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UsersTask;
