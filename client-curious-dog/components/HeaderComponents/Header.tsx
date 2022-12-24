import { useAtom } from 'jotai';
import { BiWorld } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';
import { MdFeed } from 'react-icons/md';
import { VscAccount } from 'react-icons/vsc';
import { userDataAtom } from '../userData/userState';
import HeaderItem from './HeaderItem';
import Link from 'next/link';
import { SiDatadog } from 'react-icons/si';

interface headerProps {
  page: string;
}
const Header = ({ page }: headerProps) => {
  const [userData, setUserData] = useAtom(userDataAtom);

  return (
    <div className="w-full bg-zinc-200 h-18 lg:px-16">
      <div className="flex justify-between lg:px-16 lg:mx-16 mx-10">
        <Link href={userData ? '/feed' : '/'}>
          <h1 className="text-5xl mt-3 mb-2">
            Curious
            <SiDatadog style={{ fontSize: '2.2rem', display: 'inline-block' }} />
            Dog
          </h1>
        </Link>

        {!!userData ? (
          <nav>
            <label htmlFor="collpase-btn-check" className="collpase-btn mt-6 mb-2">
              <FaBars style={{ fontSize: '2.2rem' }} />
            </label>
            <input type="checkbox" id="collpase-btn-check" />
            <ul className="header md:flex justify-center md:space-x-11">
              <HeaderItem IconComp={<MdFeed style={{ fontSize: '2rem' }} />} text="Feed" active={page === 'feed' ? true : false} url="/feed" />
              <HeaderItem IconComp={<BiWorld style={{ fontSize: '2rem' }} />} text="Explore" active={page === 'explore' ? true : false} url="/explore" />
              <HeaderItem IconComp={<VscAccount style={{ fontSize: '2rem' }} />} text="Account" active={page === 'me' ? true : false} url="/me" />
            </ul>
          </nav>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
