import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Form from "./Form";
import WebcamCapture from "./WebcamCapture";

const ModalView = (props) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const btnStyle = props.actionType === "add" || props.actionType === "edit" ? "bg-orange-600 hover:bg-orange-700 border-orange-700 mb-2" : "bg-blue-500 hover:bg-blue-700 border-blue-700 mt-2";

  const content = (
    <>
      <div className="text-white max-w-full">
        <button
          type="button"
          onClick={openModal}
          className={`${btnStyle} text-white font-bold border rounded  py-2 px-4 w-full`}
        >
          {props?.title}
        </button>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <div className="z-50 fixed inset-0 overflow-y-auto">
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
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-gray-900 rounded-2xl p-6 text-left text-white align-middle shadow-xl transition-all z-50">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-white"
                      >
                        {props.actionType==="edit" || props.actionType==="add" ? props?.title : null}
                      </Dialog.Title>
                      <div className="mt-2"></div>

                      {props.actionType === "camera" ? (
                        <WebcamCapture id={props?.id} setImage={props?.setImage} image={props?.image} closeModal={closeModal}></WebcamCapture>
                      ) : props.actionType === "add" ||
                        props.actionType === "edit" ? (
                        <Form
                          closeModal={closeModal}
                          actionType={props.actionType}
                          retreatProp={props?.retreatProp}
                        />
                      ) : null}

                      <div>
                        <button
                          type="button"
                          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-800 rounded w-full"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );

  return content;
};

export default ModalView;
