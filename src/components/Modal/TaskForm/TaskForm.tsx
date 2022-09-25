import { useActions } from 'hooks/useActions'
import { useForm } from 'react-hook-form'
import { MyModal } from '../Modal'

type TaskProps = {
  email: string
  name: string
  task: string
}

export const TaskForm: React.FC<{
  setIsOpenModal: (value: boolean) => void
}> = ({ setIsOpenModal }) => {
  const { addTask } = useActions()
  const { register, handleSubmit } = useForm()

  const onSubmit = ({ email, name, task }: TaskProps) => {
    if ((email.length > 3, name.length > 2, task.length > 3)) {
      addTask(email, name, task)
      setIsOpenModal(false)
    } else {
      alert('Invalid data')
    }
  }

  return (
    <MyModal>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data as TaskProps))}
        className=" w-80 mx-4 card bg-white max-w-md h-max p-6 md:rounded-lg my-8 mx-auto border border-gray-300"
      >
        <button
          onClick={() => setIsOpenModal(false)}
          type="button"
          className="ml-64"
          data-modal-toggle="default-modal"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="title ">
          <h1 className="font-bold text-center">Create a new task</h1>
        </div>
        <div className="form mt-2">
          <div className="flex flex-col text-sm">
            <label className="font-bold mb-2">Email</label>
            <input
              type="email"
              {...register('email')}
              className="appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex mt-4 flex-col text-sm">
            <label className="font-bold mb-2">User name</label>
            <input
              type="text"
              {...register('name')}
              className="appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="text-sm flex flex-col">
            <label className="font-bold mt-4 mb-2">Description</label>
            <textarea
              {...register('task')}
              className=" appearance-none w-full border border-gray-200 p-2 h-20 focus:outline-none focus:border-gray-500"
              placeholder="Enter your description"
            ></textarea>
          </div>
        </div>
        <div className="submit">
          <button
            type="submit"
            className=" w-full bg-blue-600 shadow-lg text-white px-4 py-2 hover:bg-blue-700 mt-8 text-center font-semibold focus:outline-none "
          >
            +Add
          </button>
        </div>
      </form>
    </MyModal>
  )
}
