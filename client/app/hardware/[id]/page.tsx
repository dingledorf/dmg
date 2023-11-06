"use client"
import {useQuery} from "@tanstack/react-query"
import {findHardware, updateHardware} from "actions/hardwareActions";
import {FormEvent, useEffect, useState} from "react";
import Loader from "@/app/common/Loader";
import {useRouter} from "next/navigation";
import {enqueueSnackbar} from "notistack";
import HardwareForm from "@/app/hardware/HardwareForm";

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
      <HardwareForm name={name} location={location} hashRate={hashRate} setHashRate={setHashRate} setLocation={setLocation} setName={setName} handleSubmit={onSubmit} />
    </section>}
  </div>
}