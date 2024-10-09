import { FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Customer, Order, OrderStatus, User } from "../../../shared/types";
import { useAuthStore } from "../../../shared/stores/auth";
import { Button } from "../Button";
import { appToast } from "../AppToast/components/lib/appToast";
import { api } from "../../../shared/api/api";
import { useTranslations } from "next-intl";
import { formatDate } from "../../../shared/lib/formatDate";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useJwtToken } from "../../../shared/hooks/useJwtToken";


type Props = {
  id: number;
}

type Inputs = Order & {customerId: number, ownerId: number};

export const OrderDetail: React.FC<Props> = ({ id }) => {
  const isEdit = id !== 0;
  const token = useAuthStore((state) => state.token);
  const t = useTranslations('OrderDetail');
  const queryClient = useQueryClient();
  const [status, setStatus] = React.useState<OrderStatus | "">("");
  const [customer, setCustomer] = React.useState<number>(0);
  const [owner, setOwner] = React.useState<number>(0);
  const [isEditMode, setIsEditMode] = useState(false || id===0); // Состояние для режима редактирования
  const router = useRouter();
  const { sub } = useJwtToken();
  const isAdmin = Number(sub) === 1;

  const getCustomers = () => api.getAllCustomersRequest(token);
   const {data: customers = [], isLoading:isLoadingCustomers } = useQuery<Customer[]>({queryKey:['customer'], queryFn: getCustomers});
   
   const getUsers = () => api.getAllUsersRequest(token);
   const {data: owners = [], isLoading: isLoadingOwners } = useQuery<User[]>({queryKey:['user'], queryFn: getUsers, enabled: isAdmin}); 

  const getOrderById = () => api.getOrderByIdRequest(id, token);
  const getQueryKey = (id: number) => ['order'].concat(id.toString());

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: getQueryKey(id),
    queryFn: getOrderById,
    enabled: id !== 0,
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const updateOrderFunc = (input: Order) => api.updateOrderRequest(input, token);
  const createOrderFunc = (input: Order) => api.createOrderRequest(input, token);
  const deleteFunc = () => api.deleteOrderRequest(id, token);

  const { mutate: mutation, isPending } = useMutation({
    mutationFn: isEdit ? updateOrderFunc : createOrderFunc,
    onSuccess: () => {
      appToast.success(isEdit ? t("updated") : t("added"));
      queryClient.invalidateQueries({ queryKey: ["order"] });
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
      queryClient.invalidateQueries({ queryKey: ['order'] });
      router.back();
    },
    onError: () => {
      appToast.error(t("error"));
    },
  });
  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value as OrderStatus);
    setValue("status", event.target.value as OrderStatus);
  };

  const handleChangeCustomer = (event: SelectChangeEvent) => {
    setCustomer(+event.target.value as number);
    setValue("customerId", +event.target.value as number);
  };

  const handleChangeOwner = (event: SelectChangeEvent) => {
    setOwner(+event.target.value as number);
    setValue("ownerId", +event.target.value as number);
  };

  const onDeleteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    deleteMutation.mutate();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation({ ...data });
  };

  useEffect(() => {
    if (!order) return;
    Object.keys(order).forEach((key) => {
      if (key in order) {
        setValue(key as keyof Inputs, order[key as keyof Order] as string);
      }
    });
    if (order.customer) {
      setCustomer(order.customer.id);
      setValue("customerId", order.customer.id);
    }
  
    if (order.owner) {
      setOwner(order.owner.id);
      setValue("ownerId", order.owner.id);
    }
  
    setStatus(order.status as OrderStatus);
  }, [order, setValue]);

  // Функция для переключения в режим редактирования
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <>
      {!isLoading && (
        <section className="container px-40 rounded-lg pt-4 mt-[60px]">
          <div className="flex mt-8 justify-between gap-4">
            <h2 className="text-xl">{isEditMode ? t("edit") : t("view")}</h2>
            <Button
              onButtonClick={() => router.back()}
              title={t("back")}
            ></Button>
          </div>

          {!isEditMode ? (
            // Режим просмотра
            <div className="py-4">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {t("contractNumber")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order?.contractNumber}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {t("contractSigningDate")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {formatDate(order?.contractSigningDate)}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {t("contractExecutionDate")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {formatDate(order?.contractExecutionDate)}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {t("contractText")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order?.contractText}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {t("complectID")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order?.complectID}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {t("complectName")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order?.complectName}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {t("status")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order?.status}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {t("customer")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order?.customer?.name}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {t("owner")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order?.owner?.about}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {t("createdAt")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {formatDate(order?.createdAt)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                className="mt-8"
                title={t("edit")}
                onButtonClick={toggleEditMode}
                type="button"
              />
            </div>
          ) : (
            // Режим редактирования
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="md:w-[50%] py-4 flex flex-col md:gap-6 gap-4"
            >
              <TextField
                variant="outlined"
                label={t("contractNumber")}
                {...register("contractNumber")}
              />
              {errors.contractNumber && (
                <span className="text-red-500">{t("required")}</span>
              )}
              <Controller
                name="contractSigningDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label={t("contractSigningDate")}
                    value={dayjs(field.value)}
                    onChange={(date) => field.onChange(date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "outlined",
                        error: !!errors.contractSigningDate,
                        helperText: errors.contractSigningDate
                          ? t("required")
                          : "",
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="contractExecutionDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label={t("contractExecutionDate")}
                    value={dayjs(field.value)}
                    onChange={(date) => field.onChange(date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "outlined",
                        error: !!errors.contractExecutionDate,
                        helperText: errors.contractExecutionDate
                          ? t("required")
                          : "",
                      },
                    }}
                  />
                )}
              />

              <TextField
                variant="outlined"
                label={t("contractText")}
                {...register("contractText")}
              />
              {errors.contractText && (
                <span className="text-red-500">{t("required")}</span>
              )}
              <TextField
                variant="outlined"
                label={t("complectID")}
                {...register("complectID")}
              />
              {errors.complectID && (
                <span className="text-red-500">{t("required")}</span>
              )}

              <TextField
                variant="outlined"
                label={t("complectName")}
                {...register("complectName")}
              />
              {errors.complectName && (
                <span className="text-red-500">{t("required")}</span>
              )}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("status")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  disabled={!isAdmin}
                  label={t("status")}
                  onChange={handleChangeStatus}
                >
                  {Object.values(OrderStatus)
                    .map((status, i) => (
                      <MenuItem key={i} value={status}>
                        {t(status)}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("customer")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={customer.toString()}
                  disabled={isLoadingCustomers}
                  label={t("customer")}
                  onChange={handleChangeCustomer}
                >
                  {customers
                    .map((customer, i) => (
                      <MenuItem key={i} value={customer.id}>
                        {customer.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("owner")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={owner.toString()}
                  disabled={isLoadingOwners}
                  label={t("owner")}
                  onChange={handleChangeOwner}
                >
                  {owners
                    .map((owner, i) => (
                      <MenuItem key={i} value={owner.id}>
                        {owner.about}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <div className="flex gap-4">
                <Button disabled={isPending} title={t("save")} type="submit" />

                {id !== 0 && (
                  <Button
                    title={t("delete")}
                    onButtonClick={onDeleteClick}
                    type="button"
                  />
                )}
                <Button
                  title={t("closeEdit")}
                  onButtonClick={toggleEditMode}
                  type="button"
                />
              </div>
            </form>
          )}
        </section>
      )}
    </>
  );
};
