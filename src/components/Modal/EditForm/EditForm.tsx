import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useActions } from 'hooks/useActions';
import { MyModal } from '../Modal';

type TaskProps = {
    task: string;
};
type editDataProps = {
    id: string;
    task: string;
};

export const EditForm: React.FC<{
    editData: editDataProps;
    setEditData: (editData: editDataProps) => void;
}> = ({ editData, setEditData }) => {
    const { editTask } = useActions();
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        setValue('task', editData.task);
    }, []);

    const onSubmit = ({ task }: TaskProps) => {
        editTask(editData.id, task);
        setEditData({ id: '', task: '' });
    };

    return (
        <MyModal>
            <form
                onSubmit={handleSubmit((data) => onSubmit(data as TaskProps))}
                className=" w-80 mx-4 card bg-white max-w-md h-max p-6 md:rounded-lg my-8 mx-auto border border-gray-300"
            >
                <button
                    onClick={() => setEditData({ id: '', task: '' })}
                    type="button"
                    className="ml-64"
                    data-modal-toggle="default-modal"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <div className="title ">
                    <h1 className="font-bold text-center">Edit task</h1>
                </div>
                <div className="form mt-2">
                    <div className="text-sm flex flex-col">
                        <label className="font-bold mt-4 mb-2">Description</label>
                        <textarea
                            {...register('task')}
                            className=" appearance-none w-full border border-gray-200 p-2 h-32 focus:outline-none focus:border-gray-500"
                            placeholder="Enter your description"
                        ></textarea>
                    </div>
                </div>
                <div className="submit">
                    <button
                        type="submit"
                        className=" w-full bg-blue-600 shadow-lg text-white px-4 py-2 hover:bg-blue-700 mt-8 text-center font-semibold focus:outline-none "
                    >
                        Edit
                    </button>
                </div>
            </form>
        </MyModal>
    );
};
