"use client"

import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {getHardware, deleteHardware} from "actions/hardwareActions";
import Loader from "@/app/common/Loader";
import Link from "next/link";
import { enqueueSnackbar } from 'notistack';

const PAGE_SIZE = 50;

export default () => {
  const [page, setPage] = useState(1);
  const {data, isPending, refetch} = useQuery({queryKey: ["hardware", page], queryFn: () => getHardware({page})});
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil((data?.total || 0) / PAGE_SIZE);

  const handleDelete = async (id: number) => {
    if(confirm('Are you sure?')) {
      setLoading(true);
      await deleteHardware(id);
      enqueueSnackbar('Alright', {variant: "success"})
      await refetch();
      setLoading(false);
    }
  }

  return <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
    {isPending || loading ? <Loader/> : <>
    <h2 className="mb-4 text-2xl font-semibold leadi">Hardware</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full text-xs">
        <colgroup>
          <col/>
          <col/>
          <col/>
          <col className="w-24"/>
          <col className="w-60"/>
        </colgroup>
        <thead className="dark:bg-gray-700">
        <tr className="text-left">
          <th className="p-3">ID</th>
          <th className="p-3">Name</th>
          <th className="p-3">Location</th>
          <th className="p-3 text-right">Hash Rate</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {data?.hardware.map((h) => <tr key={h.id} className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
            <td className="p-3">
              <p>{h.id}</p>
            </td>
            <td className="p-3">
              <p>{h.name}</p>
            </td>
            <td className="p-3">
              <p>{h.location}</p>
            </td>
            <td className="p-3 text-right">
						  <p>{h.hashRate}</p>
            </td>
            <td className={"p-3 text-right"}>
              <Link href={`/hardware/${h.id}`}><button type="button" className="mr-4 px-8 py-3 font-semibold rounded dark:bg-green-700 dark:text-gray-800">Edit</button></Link>
              <button onClick={() => handleDelete(h.id)} type="button" className="px-7 py-3 font-semibold rounded dark:bg-red-400 dark:text-gray-800">Delete</button>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
    <div className="items-center justify-center mt-5 space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex">
      <span className="block">Page {page} of {totalPages}</span>
      <div className="space-x-1">
        <button onClick={() => setPage(page-1)} disabled={page === 1} title="previous" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow">
          <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button onClick={() => setPage(page+1)} disabled={page === totalPages} title="next" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow">
          <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
    </>
    }
  </div>
}