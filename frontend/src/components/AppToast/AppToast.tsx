import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppToast = () => {
  return (
    <ToastContainer
      className='!w-auto'
      toastClassName='!p-0 !min-h-0 !shadow-base !bg-transparent !rounded-3'
      bodyClassName='!p-0 !shadow-none !bg-transparent'
      closeButton={false}
      position='top-right'
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
