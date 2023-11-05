"use client"
import {useQuery} from "@tanstack/react-query"
import {findHardware, getHardware, updateHardware} from "actions/hardwareActions";
import {FormEvent, useEffect, useState} from "react";
import Loader from "@/app/common/Loader";
import {authenticate} from "actions/authActions";
import {useRouter} from "next/navigation";
import {enqueueSnackbar} from "notistack";

export default function Page({params}: { params: { id: number } }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [hashRate, setHashRate] = useState(0);

  const {data, isPending} = useQuery({queryKey: [`hardware-${params.id}`, ], queryFn: () => findHardware(params.id)});
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  useEffect(() => {
    if(data) {
      setName(data!.name);
      setLocation(data!.location);
      setHashRate(parseFloat(data!.hashRate.split(" ")[0]));
    }
  }, [data])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateHardware(params.id, {
        name,
        location,
        hashRate
      })
      enqueueSnackbar('Successfully saved.', {variant: 'success'});
      await router.push('/hardware');
    } catch (err: any) {
      if(err.response) {
        enqueueSnackbar(err.response?.data?.error?.inner, {variant: 'error'});
      } else {
        enqueueSnackbar(err.message || 'Something happened', {variant: 'error'});
      }
    } finally {
      setLoading(false);
    }
  }

  return <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
    {isPending || loading ? <Loader/> : <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
      <form onSubmit={onSubmit} className="container flex flex-col mx-auto space-y-12">
        <fieldset className="grid grid-cols-3 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Mining Hardware</p>
          </div>
          <div className="grid grid-cols-3 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="name" className="text-sm">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)}required id="name" type="text" placeholder="Antminer"
                     className="w-full h-10 pl-4 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"/>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="location" className="text-sm">Location</label>
              <input value={location} onChange={(e) => setLocation(e.target.value)} required id="location" type="text" placeholder="Mining Facility"
                     className="w-full h-10 pl-4 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"/>
            </div>
            <div className="col-span-full">
              <label htmlFor="hashRate" className="text-sm">Hash Rate</label>
              <input value={hashRate} onChange={(e) => setHashRate(parseFloat(e.target.value))} required id="hashRate" min={0} step={0.000000000000001} type="number" placeholder="50"
                     className="w-full h-10 pl-4 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"/>
            </div>
            <div className="col-span-full">
              <div className="flex items-center space-x-2">
                <button type="submit" className="px-4 py-2 border rounded-md dark:border-gray-100">Save</button>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </section>}
  </div>
}