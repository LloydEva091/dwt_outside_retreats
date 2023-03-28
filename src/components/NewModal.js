import React, { Fragment, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Form from "./Form";
import { addPhoto } from "../db";
import { RetreatContext } from "../context/RetreatContext";

const NewModal = (props) => {
  const { retreats, setRetreats } = useContext(RetreatContext);
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  // const setNewItem = props.setNewItem;
  // const item = props.item;

  const addRetreat = (obj) => {
    console.log(obj.image);
    const newRetreats = {
      id: obj.id,
      name: obj.name,
      address: obj.address,
      mobile: obj.mobile,
      description: obj.description,
      location: { latitude: obj.location.lat, longitude: obj.location.lng },
      image: obj.image,
    };

    addPhoto(obj.id, obj.image);
    setRetreats([...retreats, newRetreats]);
  };

  const content = (
    <>
      <div className="text-white max-w-full">
        <button
          type="button"
          onClick={openModal}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 border border-orange-700 rounded w-full mb-2"
        >
          {props.title.toUpperCase()}
        </button>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-gray-900 rounded-2xl p-6 text-left  text-white align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-white"
                    >
                      {props.title}
                    </Dialog.Title>
                    <div className="mt-2"></div>
                    {/* {props.modalContent} */}
                    <Form
                      addRetreat={addRetreat}
                      closeModal={closeModal}
                      actionType={"add"}
                    />
                    <div>
                      <button
                        type="button"
                        className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-800 rounded w-full"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );

  return content;
};

export default NewModal;
