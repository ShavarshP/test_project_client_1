import { Link, useLocation } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const Pagination: React.FC = (): JSX.Element => {
  let { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const providerParams = searchParams.get('page')

  const { count, countPageTask } = useTypedSelector((state) => state.usersTask)



  return (
    <div className=" inline-flex  border border-[#e4e4e4] bg-white p-2 rounded-xl ">
      <ul className="flex items-center -mx-[6px]">
        <li className="px-[6px]">
          {Number(providerParams) - 1 ? (
            <Link
              to={`/home?page=${Number(providerParams) - 1}`}
              className=" w-8 h-8 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary "
            >
              <span>
                <svg
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  className="fill-current stroke-current"
                >
                  <path
                    d="M7.12979 1.91389L7.1299 1.914L7.1344 1.90875C7.31476 1.69833 7.31528 1.36878 7.1047 1.15819C7.01062 1.06412 6.86296 1.00488 6.73613 1.00488C6.57736 1.00488 6.4537 1.07206 6.34569 1.18007L6.34564 1.18001L6.34229 1.18358L0.830207 7.06752C0.830152 7.06757 0.830098 7.06763 0.830043 7.06769C0.402311 7.52078 0.406126 8.26524 0.827473 8.73615L0.827439 8.73618L0.829982 8.73889L6.34248 14.6014L6.34243 14.6014L6.34569 14.6047C6.546 14.805 6.88221 14.8491 7.1047 14.6266C7.30447 14.4268 7.34883 14.0918 7.12833 13.8693L1.62078 8.01209C1.55579 7.93114 1.56859 7.82519 1.61408 7.7797L1.61413 7.77975L1.61729 7.77639L7.12979 1.91389Z"
                    strokeWidth="0.3"
                  ></path>
                </svg>
              </span>
            </Link>
          ) : null}
        </li>
        <li className="px-[6px]">
          <span className=" w-8 h-8 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base ">
            {providerParams}
          </span>
        </li>

        <li className="px-[6px]">
          {count / (countPageTask * Number(providerParams)) > 1 ? (
            <Link
              to={`/home?page=${Number(providerParams) + 1}`}
              className=" w-8 h-8 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary "
            >
              <span>
                <svg
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  className="fill-current stroke-current"
                >
                  <path
                    d="M0.870212 13.0861L0.870097 13.086L0.865602 13.0912C0.685237 13.3017 0.684716 13.6312 0.895299 13.8418C0.989374 13.9359 1.13704 13.9951 1.26387 13.9951C1.42264 13.9951 1.5463 13.9279 1.65431 13.8199L1.65436 13.82L1.65771 13.8164L7.16979 7.93248C7.16985 7.93243 7.1699 7.93237 7.16996 7.93231C7.59769 7.47923 7.59387 6.73477 7.17253 6.26385L7.17256 6.26382L7.17002 6.26111L1.65752 0.398611L1.65757 0.398563L1.65431 0.395299C1.454 0.194997 1.11779 0.150934 0.895299 0.373424C0.695526 0.573197 0.651169 0.908167 0.871667 1.13067L6.37922 6.98791C6.4442 7.06886 6.43141 7.17481 6.38592 7.2203L6.38587 7.22025L6.38271 7.22361L0.870212 13.0861Z"
                    strokeWidth="0.3"
                  ></path>
                </svg>
              </span>
            </Link>
          ) : null}
        </li>
      </ul>
    </div>
  )
}

export default Pagination