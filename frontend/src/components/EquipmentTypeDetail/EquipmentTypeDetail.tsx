import { TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { EquipmentType } from "../../../shared/types";
import { useAuthStore } from "../../../shared/stores/auth";
import { Button } from "../Button";
import { appToast } from "../AppToast/components/lib/appToast";
import { api } from "../../../shared/api/api";
import { useTranslations } from "next-intl";

type Props = {
  id: number;
};

type Inputs = EquipmentType;

export const EquipmentTypeDetail: React.FC<Props> = ({ id }) => {
  const isEdit = id !== 0;
  const token = useAuthStore((state) => state.token);
  const t = useTranslations("EquipmentTypeDetail");
  const queryClient = useQueryClient();

  const getEquipmentTypeById = () => api.getEquipmentTypeByIdRequest(id, token);
  const getQueryKey = (id: number) => ["equipment-types"].concat(id.toString());
  const router = useRouter();

  const { data: equipmentType, isLoading } = useQuery<EquipmentType>({
    queryKey: getQueryKey(id),
    queryFn: getEquipmentTypeById,
    enabled: id !== 0,
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const updateEquipmentTypeFunc = (input: EquipmentType) =>
    api.updateEquipmentTypeRequest(input, token);
  const createEquipmentTypeFunc = (input: EquipmentType) =>
    api.createEquipmentTypeRequest(input, token);
  const deleteFunc = () => api.deleteEquipmentTypeRequest(id, token);

  const { mutate: mutation, isPending } = useMutation({
    mutationFn: isEdit ? updateEquipmentTypeFunc : createEquipmentTypeFunc,
    onSuccess: () => {
      appToast.success(isEdit ? "Успешно изменено" : "Успешно добавлено");
      queryClient.invalidateQueries({
        queryKey: ["equipment-types"],
      });
      router.back();
    },
    onError: () => {
      appToast.error("Произошла ошибка");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFunc,
    onSuccess: () => {
      appToast.success("Успешно удалено");
      queryClient.invalidateQueries({ queryKey: ["equipment-types"] });
      router.back();
    },
    onError: () => {
      appToast.error("Произошла ошибка");
    },
  });
  const onDeleteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    deleteMutation.mutate();
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation({
      ...data,
    });
  };

  useEffect(() => {
    if (!equipmentType) return;
    Object.keys(equipmentType).forEach((key) => {
      if (key in equipmentType) {
        setValue(
          key as keyof EquipmentType,
          equipmentType[key as keyof EquipmentType] as string
        );
      }
    });
  }, [equipmentType, setValue]);

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

              <div className="flex gap-4">
                <Button disabled={isPending} title={t("save")} type="submit" />

                {id !== 0 && (
                  <Button
                    title={t("delete")}
                    onButtonClick={onDeleteClick}
                    type="button"
                  />
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
