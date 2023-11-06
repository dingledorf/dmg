import Link from "next/link";
import {Hardware} from "actions/hardwareActions";

type Props = {
  hardware: Hardware[],
  handleDelete: (id: number) => void;
}

export default ({hardware, handleDelete}: Props) => (
  <table className="min-w-full text-xs">
  <colgroup>
    <col/>
    <col/>
    <col/>
    <col />
    <col />
    <col className="w-60"/>
  </colgroup>
  <thead className="dark:bg-gray-700">
  <tr className="text-left">
    <th className="p-3 text-center">ID</th>
    <th className="p-3 text-center">Name</th>
    <th className="p-3 text-center">Location</th>
    <th className="p-3 text-center">Hash Rate</th>
    <th className="p-3 text-center">Created</th>
    <th></th>
  </tr>
  </thead>
  <tbody>
  {hardware.map((h) => <tr key={h.id} className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
    <td className="p-3 text-center">
      <p>{h.id}</p>
    </td>
    <td className="p-3 text-center">
      <p>{h.name}</p>
    </td>
    <td className="p-3 text-center">
      <p>{h.location}</p>
    </td>
    <td className="p-3 text-center">
      <p>{h.hashRate} TH/S</p>
    </td>
    <td className="p-3 text-center">
      <p>{h.createdAt}</p>
    </td>
    <td className={"p-3 text-right"}>
      <Link href={`/hardware/${h.id}`}><button type="button" className="mr-4 px-8 py-3 font-semibold rounded dark:bg-green-700 dark:text-gray-800">Edit</button></Link>
      <button onClick={() => handleDelete(h.id)} type="button" className="px-7 py-3 font-semibold rounded dark:bg-red-400 dark:text-gray-800">Delete</button>
    </td>
  </tr>)}
  </tbody>
</table>)