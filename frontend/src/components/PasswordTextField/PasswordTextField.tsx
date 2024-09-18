import React, { useState } from "react";
import { AppIcon } from "../AppIcon";
import { AppTextField, AppTextFieldProps } from "../AppTextField/AppTextField";

export const PasswordTextField: React.FC<AppTextFieldProps> = ({ disabled, ...props }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !disabled && setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const toggleIcon = showPassword ? (
    <AppIcon type='password-hide' className='w-5 h-5' />
  ) : (
    <AppIcon type='password-show' className='w-5 h-5' />
  );

  return (
    <AppTextField
      suffix={
        <div
          aria-hidden
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >
          {toggleIcon}
        </div>
      }
      {...props}
      disabled={disabled}
      type={showPassword ? "text" : "password"}
    />
  );
};
