import React, { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { clsx } from "clsx";
import { omit } from "rambda";

type CommonProps = {
  label?: string;
  type?: string;
  className?: string;
  inputClassName?: string;
  ref?: React.ForwardedRef<HTMLDivElement>;
  suffix?: ReactNode;
  error?: string;
  required?: boolean;
};

type InputProps = {
  tag: "input";
} & InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = {
  tag: "textarea";
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export type AppTextFieldProps = CommonProps & (InputProps | TextareaProps);

export const AppTextField: React.FC<AppTextFieldProps> = ({
  label,
  type = "text",
  className = "",
  inputClassName = "",
  suffix,
  error,
  required,
  ...props
}) => {
  const commonClassNames = clsx(
    "w-full px-4 text-sm md:text-base bg-white rounded-3 border border-gray placeholder:text-gray",
    "hover:border-gray-2 focus:border-primary disabled:bg-gray-5 disabled:border-gray-4 disabled:text-gray",
    {
      "pt-5 md:pt-6": label,
      "!border-danger": !props.disabled && error
    },
    inputClassName
  );

  return (
    <label className={clsx("block relative", className)}>
      {label && (
        <span
          className={clsx("absolute text-gray left-[17px] top-2 md:top-3 block text-xs", {
            "pt-2 md:pt-3 pl-4 pb-2 !left-[1px] !top-[1px] right-2 md:right-5 bg-white rounded-3":
              props.tag === "textarea",
            "!bg-gray-5": props.tag === "textarea" && props.disabled,
            "text-red-500": error
          })}
        >
          {label}
          {required && <span className='!text-danger'>{" *"}</span>}
        </span>
      )}
      {props.tag === "input" ? (
        <>
          <input
            type={type}
            {...omit("tag", props)}
            className={clsx(
              "md:h-[68px] h-[56px] outline-none",
              { "md:h-[64px] ": !label },
              commonClassNames
            )}
          />
          {suffix && (
            <div
              className={clsx(
                "absolute top-[18px] md:top-[24px] right-[16px] text-primary hover:cursor-pointer",
                {
                  "!text-gray hover:cursor-auto": props.disabled,
                  "!text-red-500": !props.disabled && error
                }
              )}
            >
              {suffix}
            </div>
          )}
          {error && <div className='text-red-500 mt-1'>{error}</div>}
        </>
      ) : (
        <>
          <textarea
            {...omit("tag", props)}
            className={clsx(
              "h-[100px] md:h-[120px] !pb-4 resize-none outline-none",
              { "!pt-[30px] md:!pt-[34px]": label },
              { "!pt-2 md:!pt-3": !label },
              commonClassNames
            )}
          />
          {error && <div className='text-red-500'>{error}</div>}
        </>
      )}
    </label>
  );
};
