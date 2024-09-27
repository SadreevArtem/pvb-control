import React from 'react'
import { useAuthStore } from '../../../shared/stores/auth';
import { useQuery } from '@tanstack/react-query';
import { User } from '../../../shared/types';
import { api } from '../../../shared/api/api';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';
import { Button } from '../Button';
import { useTranslations } from 'next-intl';

export const Orders = () => {
   const token = useAuthStore((state) => state.token);
   const getOrders = () => api.getAllOrdersRequest(token);
   const {data: orders = [], isLoading } = useQuery<User[]>({queryKey:['order'], queryFn: getOrders}); 
   const t = useTranslations()
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="flex mb-2">
            <Link className="ml-auto" href="/orders/0">
              <Button className=" w-auto px-6" title={t('Users.add')} />
            </Link>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('Users.name')}</TableCell>
                  <TableCell>{t('Orders.email')}</TableCell>
                  <TableCell>{t('Orders.role')}</TableCell>
                  <TableCell>{t('Users.created')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Link
                        href={`/orders/${row.id}`}
                        className="hover:text-primary"
                      >
                        {row.username}
                      </Link>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{t(`UserDetail.${row.role}`)}</TableCell>
                    <TableCell>
                      {new Date(row.createdAt).toLocaleString("ru-RU", {
                        timeZone: "Asia/Yekaterinburg",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
}
