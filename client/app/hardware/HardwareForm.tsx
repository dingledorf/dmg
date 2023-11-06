import {FormEvent, useState} from "react";

type Props = {
  name: string,
  location: string,
  hashRate: number,
  setName: (val: string) => void,
  setHashRate: (val: number) => void,
  setLocation: (val: string) => void,
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}



export default ({
  name,
  location,
  hashRate,
  setName,
  setLocation,
  setHashRate,
  handleSubmit
}: Props) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    await handleSubmit(e)
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="container flex flex-col mx-auto space-y-12">
      <fieldset className="grid grid-cols-3 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
        <div className="space-y-2 col-span-full lg:col-span-1">
          <h2>Mining Hardware</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 col-span-full lg:col-span-3">
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="name" className="text-sm">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required id="name" type="text"
                   placeholder="Antminer"
                   className="w-full h-10 pl-4 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"/>
          </div>
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="location" className="text-sm">Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} required id="location" type="text"
                   placeholder="Mining Facility"
                   className="w-full h-10 pl-4 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"/>
          </div>
          <div className="col-span-full">
            <label htmlFor="hashRate" className="text-sm">Hash Rate</label>
            <input value={hashRate} onChange={(e) => setHashRate(parseFloat(e.target.value))} required id="hashRate"
                   min={0} step={0.000000000000001} type="number" placeholder="50"
                   className="w-full h-10 pl-4 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"/>
          </div>
          <div className="col-span-full">
            <div className="flex items-center space-x-2">
              <button disabled={loading} type="submit" className="px-4 py-2 border rounded-md dark:border-gray-100">Save</button>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  )
}