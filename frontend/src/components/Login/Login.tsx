import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { PasswordTextField } from "../PasswordTextField/PasswordTextField";
import { AppTextField } from "../AppTextField/AppTextField";
import { useAuthStore } from "../../../shared/stores/auth";
import { api } from "../../../shared/api/api";
import Image from "next/image";
import { getErrorMessage } from "../../../shared/lib/getError";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";


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
  const t = useTranslations('Login');
  const { mutate: mutation, isPending } = useMutation({
    mutationFn: api.signInRequest,
    onSuccess: async (data) => {
      const token = data.access_token;

      if (!token) {
        throw new Error();
      }
      auth(token);
    },
    onError: () => window.alert("Ошибка авторизации"),
  });
  const getError = getErrorMessage(errors);
  const onSubmit: SubmitHandler<Inputs> = (data) => mutation(data as Inputs);

  return (
    <>
      <div className="h-[100vh] flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-[30%] py-4 flex flex-col md:gap-6 gap-4"
        >
          <LocaleSwitcher className="" />
          <Image
            src="/logo-max.png"
            alt="logo"
            width={220}
            height={100}
            className="self-center"
          />
          <Controller
            name="username"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <AppTextField tag="input" label={t("name")} {...field} />
            )}
          />
          {errors.username && (
            <span className="text-red-500">{t("requiredName")}</span>
          )}

          <Controller
            name="password"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <PasswordTextField
                tag="input"
                label={t("password")}
                disabled={isPending}
                error={getError("password")}
                {...field}
              />
            )}
          />
          {errors.password && (
            <span className="text-red-500">{t("requiredPassword")}</span>
          )}
          <button className="button" type="submit">
            {t("signIn")}
          </button>
        </form>
      </div>
    </>
  );
};
