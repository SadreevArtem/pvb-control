import React from 'react'
import { useAuthStore } from '../../../shared/stores/auth';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../shared/api/api';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';
import { Button } from '../Button';
import { useTranslations } from 'next-intl';
import { Customer } from '../../../shared/types';

export const Customers = () => {
   const token = useAuthStore((state) => state.token);
   const getCustomers = () => api.getAllCustomersRequest(token);
   const {data: customers = [], isLoading } = useQuery<Customer[]>({queryKey:['customer'], queryFn: getCustomers}); 
   const t = useTranslations()
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="flex mb-2">
            <Link className="ml-auto" href="/customers/0">
              <Button className=" w-auto px-6" title={t('Users.add')} />
            </Link>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('Users.name')}</TableCell>
                  <TableCell>{t('Users.created')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Link
                        href={`/customers/${row.id}`}
                        className="hover:text-primary"
                      >
                        {row.name}
                      </Link>
                    </TableCell>
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

