import React, { useEffect } from 'react'
import { useAuthStore } from '../../../shared/stores/auth';
import { useTranslations } from 'next-intl';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/api/api';
import { Complect, EquipmentType } from '../../../shared/types';
import { Button } from '../Button';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { appToast } from '../AppToast/components/lib/appToast';

type Props = {
    id: number;
  };

  type Inputs = Complect & { equipmentTypeId: number; orderId: number };

export const ComplectDetail: React.FC<Props> = ({ id }) => {
    const isEdit = id !== 0;
    const token = useAuthStore((state) => state.token);
    const t = useTranslations("ComplectDetail");
    const router = useRouter();
    const { id: orderId } = router.query;
    const queryClient = useQueryClient();

    const [equipmentType,setEquipmentType] = React.useState<number>(0);

    const getComplectById = () => api.getComplectByIdRequest(id, token);
    const getQueryKey = (id: number) => ["complect"].concat(id.toString());

    const getEquipmentType = () => api.getAllEquipmentTypesRequest(token);
    const { data: equipmentTypes = [], isLoading: isLoadingEquipmentType } = useQuery<EquipmentType[]>({
      queryKey: ["equipment-type"],
      queryFn: getEquipmentType,
    });
  
    const { data: complect, isLoading } = useQuery<Complect>({
      queryKey: getQueryKey(id),
      queryFn: getComplectById,
      enabled: isEdit,
    });
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<Inputs>();

    const updateComplectFunc = (input: Inputs) =>
      api.updateComplectRequest(input, token);
    const createComplectFunc = (input: Inputs) =>
      api.createComplectRequest(input, token);
    const deleteFunc = () => api.deleteComplectRequest(id, token);
  
    const { mutate: mutation, isPending } = useMutation({
      mutationFn: isEdit ? updateComplectFunc : createComplectFunc,
      onSuccess: () => {
        appToast.success(isEdit ? t("updated") : t("added"));
        queryClient.invalidateQueries({ queryKey: ["Complect"] });
        router.back();
      },
      onError: () => {
        appToast.error(t("error"));
      },
    });
    const deleteMutation = useMutation({
      mutationFn: deleteFunc,
      onSuccess: () => {
        appToast.success(t("deleted"));
        queryClient.invalidateQueries({ queryKey: ["order"] });
        router.back();
      },
      onError: () => {
        appToast.error(t("error"));
      },
    });
    const handleChangeEquipmentType = (event: SelectChangeEvent) => {
      setEquipmentType(+event.target.value as number);
      setValue("equipmentTypeId", +event.target.value as number);
    };
    const onDeleteClick = (event: React.MouseEvent) => {
      event.preventDefault();
      deleteMutation.mutate();
    };
    const onSubmit: SubmitHandler<Inputs> = (data) => {
      if (!orderId) {
        appToast.error(t("order_id_required"));
        return;
      }
      mutation({ ...data, orderId: +orderId, diameter: +data.diameter, workingPressure: +data.workingPressure});
    };
    useEffect(() => {
      if (!complect) return;
      Object.keys(complect).forEach((key) => {
        if (key in complect) {
          setValue(key as keyof Inputs, complect[key as keyof Complect] as string);
        }
      });
      if (complect.equipmentType) {
        setEquipmentType(complect.equipmentType.id);
        setValue("equipmentTypeId", complect.equipmentType.id);
      }
  
     
    }, [complect, setValue]);
  return (
    <>
    {!isLoading && (
      <section className="container px-40 rounded-lg pt-4 mt-[60px]">
        <div className="flex mt-8 justify-between gap-4">
          <h2 className="text-xl">{ t("edit")}</h2>
          <Button
            onButtonClick={() => router.back()}
            title={t("back")}
          ></Button>
        </div>
        <form
              onSubmit={handleSubmit(onSubmit)}
              className="md:w-[50%] py-4 flex flex-col md:gap-6 gap-4"
            >
              <TextField
                variant="outlined"
                label={t("name")}
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red">{t("required")}</span>
              )}
              <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">
                  {t("equipmentType")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={equipmentType.toString()}
                  disabled={isLoadingEquipmentType}
                  label={t("equipmentType")}
                  onChange={handleChangeEquipmentType}
                >
                  {equipmentTypes.map((type, i) => (
                    <MenuItem key={i} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                variant="outlined"
                label={t("manufacturer")}
                {...register("manufacturer", { required: true })}
              />
              {errors.manufacturer && (
                <span className="text-red">{t("required")}</span>
              )}
               <TextField
                variant="outlined"
                label={t("technicalSpecifications")}
                {...register("technicalSpecifications", { required: true })}
              />
              {errors.technicalSpecifications && (
                <span className="text-red">{t("required")}</span>
              )}
               <TextField
                variant="outlined"
                label={t("brand")}
                {...register("brand", { required: true })}
              />
              {errors.brand && (
                <span className="text-red">{t("required")}</span>
              )}
               <TextField
                variant="outlined"
                label={t("model")}
                {...register("model", { required: true })}
              />
              {errors.model && (
                <span className="text-red">{t("required")}</span>
              )}
              <TextField
              type='number'
                variant="outlined"
                label={t("diameter")}
                {...register("diameter", { required: true })}
              />
              {errors.diameter && (
                <span className="text-red">{t("required")}</span>
              )}
               <TextField
              type='number'
                variant="outlined"
                label={t("workingPressure")}
                {...register("workingPressure", { required: true })}
              />
              {errors.workingPressure && (
                <span className="text-red">{t("required")}</span>
              )}
               <TextField
                variant="outlined"
                label={t("ballType")}
                {...register("ballType", { required: true })}
              />
              {errors.ballType && (
                <span className="text-red">{t("required")}</span>
              )}
               <TextField
                variant="outlined"
                label={t("seatType")}
                {...register("seatType", { required: true })}
              />
              {errors.seatType && (
                <span className="text-red">{t("required")}</span>
              )}
              <TextField
                variant="outlined"
                label={t("execution")}
                {...register("execution", { required: true })}
              />
              {errors.execution && (
                <span className="text-red">{t("required")}</span>
              )}
              <TextField
                variant="outlined"
                label={t("trTs")}
                {...register("trTs", { required: true })}
              />
              {errors.trTs && (
                <span className="text-red">{t("required")}</span>
              )}
                    <div className="flex gap-4">
                <Button disabled={isPending} title={t("save")} type="submit" />

                {(
                  <Button
                    title={t("delete")}
                    onButtonClick={onDeleteClick}
                    type="button"
                  />
                )}
              </div>
            </form>
        </section>)}
  </>
  )
}
