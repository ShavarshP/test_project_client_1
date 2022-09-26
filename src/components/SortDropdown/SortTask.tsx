import { Link, useLocation } from 'react-router-dom';

const SortDropdown: React.FC = (): JSX.Element => {
    let { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const providerParams = searchParams.get('page');

    return (
        <div className="group inline-block">
            <button className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32">
                <span className="pr-1 font-semibold flex-1">Sort by</span>
                <span>
                    <svg
                        className="fill-current h-5 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </span>
            </button>
            <ul className="z-10 bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32">
                <li className="cursor-pointer px-3 py-1 hover:bg-gray-100">
                    <Link to={`/home?page=${Number(providerParams)}&name=A-Z`}>User name A-Z</Link>
                </li>
                <li className="cursor-pointer px-3 py-1 hover:bg-gray-100">
                    <Link to={`/home?page=${Number(providerParams)}&name=Z-A`}>User name Z-A</Link>
                </li>
                <li className="cursor-pointer px-3 py-1 hover:bg-gray-100">
                    <Link to={`/home?page=${Number(providerParams)}&email=A-Z`}>Email A-Z</Link>
                </li>
                <li className="cursor-pointer px-3 py-1 hover:bg-gray-100">
                    <Link to={`/home?page=${Number(providerParams)}&email=Z-A`}>Email Z-A</Link>
                </li>
                <li className="cursor-pointer rounded-sm px-3 py-1 hover:bg-gray-100">
                    <Link to={`/home?page=${Number(providerParams)}`}>Default</Link>
                </li>
            </ul>
        </div>
    );
};

export default SortDropdown;
