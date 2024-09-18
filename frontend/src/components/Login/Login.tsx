import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { PasswordTextField } from "../PasswordTextField/PasswordTextField";
import { AppTextField } from "../AppTextField/AppTextField";
import { useAuthStore } from "../../../shared/stores/auth";
import { api } from "../../../shared/api/api";
import Image from "next/image";


type Inputs = {
    username: string
  password: string
}


export const Login: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>()
  const auth = useAuthStore((state) => state.auth);
  const mutation = useMutation({
    mutationFn: api.signInRequest,
    onSuccess: async (data) => {
      const response = await data.json();
      const token = response.access_token;
      auth(token);
    },
    onError: () => window.alert("Ошибка авторизации"),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => mutation.mutate(data as Inputs);

  return (
    <>
      <div className="h-[100vh] flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-[30%] py-4 flex flex-col md:gap-6 gap-4"
        >
          <Image src="/logo-max.png" alt="logo" width={220} height={100} className="self-center"/>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <AppTextField tag="input" label="Имя" {...field} />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordTextField
                tag="input"
                label="Пароль"
                // disabled={isLoading}
                // error={getError("password")}
                {...field}
              />
            )}
          />
          {/* <PasswordTextField
            variant="filled"
            label="Пароль"
            {...register("password", { required: true })}
          /> */}
          {errors.password && (
            <span className="text-red-500">Обязательно для заполнения</span>
          )}
          <button
            className="text-white bg-primary uppercase text-[18px] rounded-full font-bold border-primary border-2 p-2 px-8 cursor-pointer hover:bg-white hover:text-primary"
            type="submit"
          >
            Войти
          </button>
        </form>
      </div>
    </>
  );
};
