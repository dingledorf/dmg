"use client"

import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {deleteHardware, getHardware} from "actions/hardwareActions";
import Loader from "@/app/common/Loader";
import {enqueueSnackbar} from 'notistack';
import HardwareTable from "@/app/hardware/HardwareTable";
import CreateHardwareModal from "@/app/hardware/CreateHardwareModal";

const PAGE_SIZE = 50;

export default () => {
  const [page, setPage] = useState(1);
  const {data, isPending, refetch} = useQuery({queryKey: ["hardware", page], queryFn: () => getHardware({page})});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
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
    <div className={"flex justify-between"}>
      <h2 className="mb-4 text-2xl font-semibold leadi">Hardware</h2>
      <button onClick={() => setModalOpen(true)} type="button" className="px-7 py-3 relative bottom-2 right-3 font-semibold rounded dark:bg-gray-100 dark:text-gray-800">Create</button>
    </div>

    <div className="overflow-x-auto">
      <HardwareTable hardware={data?.hardware || []} handleDelete={handleDelete}/>
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
      <CreateHardwareModal isOpen={isModalOpen} handleClose={() => setModalOpen(false)}/>
    </>
    }
  </div>
}