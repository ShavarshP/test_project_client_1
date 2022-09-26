import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';

type Login = {
    user: string;
    password: string;
};

const Auth: React.FC = () => {
    const { isAuth } = useTypedSelector((state) => state.usersTask);
    const { login } = useActions();

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: Login) => {
        login(data.user, data.password);
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/home?page=1');
        }
    }, [isAuth]);

    return (
        <>
            <div className="w-full min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <h1 className="font-bold text-center text-2xl mb-5">Your Logo</h1>
                    <form
                        onSubmit={handleSubmit((data) => onSubmit(data as Login))}
                        className="bg-white shadow w-full rounded-lg divide-y divide-gray-200"
                    >
                        <div className="px-5 py-7">
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">User</label>
                            <input
                                type="name"
                                {...register('user')}
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            />
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                            <input
                                type="password"
                                {...register('password')}
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            />
                            <button
                                type="submit"
                                className={`transition duration-200 bg-blue-500 focus:bg-blue-700 hover:bg-blue-600 focus:shadow-sm focus:ring-4  focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block`}
                            >
                                <span className="inline-block mr-2">Login</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Auth;
