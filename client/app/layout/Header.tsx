"use client"
import {logout} from "actions/serverActions";
import {useRouter, usePathname} from "next/navigation";
import Link from "next/link";

export default () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  }

  return <header className="p-4 dark:bg-gray-800 dark:text-gray-100">
    <div className="container flex justify-between h-16 mx-auto">
      <ul className="items-stretch hidden space-x-3 lg:flex">
        <li className="flex">
          <Link className={`flex items-center px-4 -mb-1 border-b-2 dark:border-transparent ${pathname.match(/^\/$/) && 'dark:text-violet-400 dark:border-violet-400'}`} href={'/'}>Home</Link>
        </li>
        <li className="flex">
          <Link className={`flex items-center px-4 -mb-1 border-b-2 dark:border-transparent ${pathname.match(/^\/hardware/) && 'dark:text-violet-400 dark:border-violet-400'}`} href={'/hardware'}>Hardware</Link>
        </li>
        <li className="flex">
          <Link className={`flex items-center px-4 -mb-1 border-b-2 dark:border-transparent ${pathname.match(/^\/analysis/) && 'dark:text-violet-400 dark:border-violet-400'}`} href={'/analysis'}>Analysis</Link>
        </li>
      </ul>
      <div className="flex items-center md:space-x-4">
        <button onClick={handleLogout} type="button" className="hidden px-6 py-2 font-semibold rounded lg:block dark:bg-violet-400 dark:text-gray-900">Log Out</button>
      </div>
      <button title="Open menu" type="button" className="p-4 lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
  </header>
}