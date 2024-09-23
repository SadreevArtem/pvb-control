
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { User, UserRole } from "../../../shared/types";
import { useAuthStore } from "../../../shared/stores/auth";
import { Button } from "../Button";
import { appToast } from "../AppToast/components/lib/appToast";
import { api } from "../../../shared/api/api";
import { useTranslations } from "next-intl";


type Props = {
  id: number;
}

type Inputs = User;


export const UserDetailAdmin: React.FC<Props> = ({id}) => {
  const isEdit = id !== 0;
  const token = useAuthStore((state) => state.token);
  const t = useTranslations('UserDetail')
  const queryClient = useQueryClient();
    const getUserById = () => api.getUserByIdAdminRequest(id, token);
    const getQueryKey = (id: number) => ['user'].concat(id.toString());
    const [role, setRole] = React.useState<UserRole | "">("");
    const router = useRouter();
    
   const { data: user, isLoading } = useQuery<User>({
     queryKey: getQueryKey(id),
     queryFn: getUserById,
     enabled: !!id,
   });
   const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const updateUserFunc = (input: User)=> api.updateUserRequest(input, token);
  const createUserFunc = (input: User)=> api.createUserRequest(input, token);
  
  const mutation = useMutation( {
    mutationFn: isEdit? updateUserFunc : createUserFunc,
    onSuccess: () => {
      appToast.success(isEdit ? "Успешно изменено" : "Успешно добавлено");
      queryClient.invalidateQueries();
      router.back()
    },
    onError: () => {
      appToast.error("Произошла ошибка");
    },
  })
 
  
  const deleteMutation  = useMutation( {
    mutationFn: ()=> api.deleteUserRequest(id, token),
    onSuccess: () => {
      appToast.success("Успешно удалено");
      queryClient.invalidateQueries();
      router.back()
    },
    onError: () => {
      appToast.error("Произошла ошибка");
    },
  })
  const onDeleteClick = () => deleteMutation.mutate();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const prepareData = {
        ...data,
    };
    if (data.password === "") delete prepareData.password;   
    mutation.mutate({
      ...prepareData,
    });
  }
  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as UserRole);
    setValue("role", event.target.value as UserRole);
  };
    
  useEffect(() => {
    if (!user) return;
    Object.keys(user).forEach((key) => {
      if (key in user) {
        setValue(key as keyof User, user[key as keyof User] as string);
      }
    });
    setRole(user.role as UserRole);
  }, [user, setValue]);
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
                {...register("username")}
              />
              {errors.username && (
                <span className="text-red-500">{t("required")}</span>
              )}
              <TextField
                variant="outlined"
                label={t("aboutUser")}
                {...register("about")}
              />
              <TextField
                variant="outlined"
                label={t("email")}
                {...register("email")}
              />
              <TextField
                variant="outlined"
                label={t("password")}
                {...register("password")}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("role")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  disabled={id === 1}
                  label={t("role")}
                  onChange={handleChange}
                >
                  {Object.values(UserRole)
                    .filter((el) => el !== "admin")
                    .map((role, i) => (
                      <MenuItem key={i} value={role}>
                        {t(role)}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

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
                <Button title={t("save")} type="submit" />

                {id !== 1 && (
                  <Button title={t("delete")} onButtonClick={onDeleteClick} />
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
