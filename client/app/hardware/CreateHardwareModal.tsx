import React, {ComponentType, FormEvent, useState} from "react";
import ReactModal from "react-modal"
import HardwareForm from "@/app/hardware/HardwareForm";
import {createHardware} from "actions/hardwareActions";
import {enqueueSnackbar} from "notistack";
import {useQueryClient} from "@tanstack/react-query"

const Modal = ReactModal as ComponentType<ReactModal['props']>;

export default ({isOpen, handleClose}: {isOpen: boolean, handleClose: () => void}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [hashRate, setHashRate] = useState(0);
  const qClient = useQueryClient();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createHardware({
        name,
        location,
        hashRate
      })
      await qClient.invalidateQueries({queryKey: ["hardware"]});
      enqueueSnackbar('Successfully saved.', {variant: 'success'});
      handleClose();
    } catch (err: any) {
      if(err.response) {
        enqueueSnackbar(err.response?.data?.error?.inner, {variant: 'error'});
      } else {
        enqueueSnackbar(err.message || 'Something happened', {variant: 'error'});
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} className={"w-fit h-fit p-0 mx-auto absolute inset-40"}>
      <div
        className="relative flex flex-col max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 dark:bg-gray-900 dark:text-gray-100">
        <button className="absolute top-2 right-2" onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"
               className="flex-shrink-0 w-6 h-6">
            <polygon
              points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
          </svg>
        </button>
        <HardwareForm name={name} location={location} hashRate={hashRate} setHashRate={setHashRate} setLocation={setLocation} setName={setName} handleSubmit={onSubmit} />
      </div>
    </Modal>
  )
}