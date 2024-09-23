import React from "react";
import { toast } from "react-toastify";
import { CustomToast } from "../CustomToast";

export const appToast = {
  success(message: string | React.ReactNode, title = "") {
    return toast(({ closeToast, toastProps, data }) => (
      <CustomToast
        type='success'
        message={message}
        title={title}
        closeToast={closeToast}
        toastProps={toastProps}
        data={data}
      />
    ));
  },
  error(message: string | React.ReactNode, title = "") {
    return toast(({ closeToast, toastProps, data }) => (
      <CustomToast
        type='error'
        message={message}
        title={title}
        closeToast={closeToast}
        toastProps={toastProps}
        data={data}
      />
    ));
  }
};
