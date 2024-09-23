import React from "react";
import clsx from "clsx";
import { ToastContentProps } from "react-toastify";
import { AppIcon } from "@/components/AppIcon";

type Props = {
  type: "success" | "error";
  message: string | React.ReactNode;
  title?: string;
} & ToastContentProps;

export const CustomToast: React.FC<Props> = ({ type, message, title, closeToast }) => {
  return (
    <div
      className={clsx("flex items-start justify-between gap-6 py-4 px-6 rounded-3 lg:w-[532px]", {
        "bg-success-light": type === "success",
        "bg-danger-light": type === "error"
      })}
    >
      <div className='flex items-start gap-3'>
        <div
          className={clsx(
            "flex items-center justify-center w-5 h-5 mt-[2px] rounded-full shrink-0",
            {
              "bg-success": type === "success",
              "bg-danger": type === "error"
            }
          )}
        >
          <AppIcon type={type === "success" ? "check" : "block"} className='text-white w-3 h-3' />
        </div>

        <div className='flex flex-col gap-1'>
          {title && <div className='text-base font-semibold text-black'>{title}</div>}
          <div className='text-base whitespace-break-spaces'>{message}</div>
        </div>
      </div>

      <button className='hover:opacity-70' onClick={closeToast}>
        <AppIcon type='close' className='w-4 h-4 text-gray' />
      </button>
    </div>
  );
};
