"use client"
import {FormEvent, useState} from "react";
import {authenticate} from "actions/authActions";
import {useRouter} from "next/navigation";

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authenticate({username, password});
      await router.push('/');
    } catch (err: any) {
      if(err.response) {
        setError(err.response?.data?.error?.inner || 'Invalid credentials provided');
      } else {
        setError(err.message || 'Something happened');
      }
    } finally {
      setLoading(false);
    }
  }

  return <div className="flex flex-col items-center justify-self-center justify-center text-center dark:text-gray-100">
    <form onSubmit={onSubmit} className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg dark:text-gray-100">
      <label htmlFor="username" className="self-start text-xs font-semibold">Username</label>
      <input value={username} onChange={(e) => setUsername(e.target.value)} id="username" type="text" required className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ri dark:text-gray-900 focus:dark:border-violet-400 focus:ri"/>
      <label htmlFor="password" className="self-start mt-3 text-xs font-semibold">Password</label>
      <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" required className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ri dark:text-gray-900 focus:dark:border-violet-400 focus:ri"/>
      <button disabled={loading} type="submit" className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Login</button>
      {error && <span className={"mt-3 dark:text-red-600"}>{error}</span>}
    </form>
  </div>
}