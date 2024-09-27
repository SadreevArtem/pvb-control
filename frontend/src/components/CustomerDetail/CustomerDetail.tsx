
import { TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Customer } from "../../../shared/types";
import { useAuthStore } from "../../../shared/stores/auth";
import { Button } from "../Button";
import { appToast } from "../AppToast/components/lib/appToast";
import { api } from "../../../shared/api/api";
import { useTranslations } from "next-intl";


type Props = {
  id: number;
}

type Inputs = Customer;


export const CustomerDetail: React.FC<Props> = ({id}) => {
  const isEdit = id !== 0;
  const token = useAuthStore((state) => state.token);
  const t = useTranslations('CustomerDetail')
  const queryClient = useQueryClient();

    const getCustomerById = () => api.getCustomerByIdRequest(id, token);
    const getQueryKey = (id: number) => ['customer'].concat(id.toString());
    const router = useRouter();
    
   const { data: customer, isLoading } = useQuery<Customer>({
     queryKey: getQueryKey(id),
     queryFn: getCustomerById,
     enabled: id !== 0,
   });
   const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const updateCustomerFunc = (input: Customer)=> api.updateCustomerRequest(input, token);
  const createCustomerFunc = (input: Customer)=> api.createCustomerRequest(input, token);
  const deleteFunc = ()=> api.deleteCustomerRequest(id, token)
  
  const {mutate: mutation, isPending} = useMutation( {
    mutationFn: isEdit? updateCustomerFunc : createCustomerFunc,
    onSuccess: () => {
      appToast.success(isEdit ? "Успешно изменено" : "Успешно добавлено");
      queryClient.invalidateQueries({
        queryKey: ["customer"],
      });
      router.back()
    },
    onError: () => {
      appToast.error("Произошла ошибка");
    },
  })
 
  
  const deleteMutation  = useMutation( {
    mutationFn: deleteFunc,
    onSuccess: () => {
      appToast.success("Успешно удалено");
      queryClient.invalidateQueries({queryKey:['customer']});
      router.back()
    },
    onError: () => {
      appToast.error("Произошла ошибка");
    },
  })
  const onDeleteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    deleteMutation.mutate();
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation({
      ...data,
    });
  }
    
  useEffect(() => {
    if (!customer) return;
    Object.keys(customer).forEach((key) => {
      if (key in customer) {
        setValue(key as keyof Customer, customer[key as keyof Customer] as string);
      }
    });
  }, [customer, setValue]);

  return (
    <>
      {!isLoading && (
        <section className="container px-40 rounded-lg pt-4 mt-[60px]">
          <div className="flex mt-8 justify-between gap-4">
            <h2 className="text-xl">{isEdit ? t("edit") : t("add")}</h2>
            <Button
              onButtonClick={() => router.back()}
              title={t("back")}
            ></Button>
          </div>
          <div className="flex justify-between gap-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="md:w-[50%] py-4 flex flex-col md:gap-6 gap-4"
            >
              <TextField
                variant="outlined"
                label={t("username")}
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500">{t("required")}</span>
              )}
              {/* <Controller
                name="published"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    control={<Switch checked={value} />}
                    label="Опубликовано"
                    onChange={onChange}
                    value={value}
                  />
                )}
              /> */}

              <div className="flex gap-4">
                <Button disabled={isPending} title={t("save")} type="submit" />

                {id !== 0 && (
                  <Button title={t("delete")} onButtonClick={onDeleteClick} type="button" />
                )}
              </div>
            </form>
            <div className="flex w-full flex-col"></div>
          </div>
        </section>
      )}
    </>
  );
};
