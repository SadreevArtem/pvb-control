import React from 'react'
import { useAuthStore } from '../../../shared/stores/auth';
import { useQuery } from '@tanstack/react-query';
import { Order } from '../../../shared/types';
import { api } from '../../../shared/api/api';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';
import { Button } from '../Button';
import { useTranslations } from 'next-intl';
import { formatDate } from '../../../shared/lib/formatDate';

export const Orders = () => {
   const token = useAuthStore((state) => state.token);
   const getOrders = () => api.getAllOrdersRequest(token);
   const {data: orders = [], isLoading } = useQuery<Order[]>({queryKey:['order'], queryFn: getOrders}); 
   const t = useTranslations('Orders')
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="flex mb-2">
            <Link className="ml-auto" href="/orders/0">
              <Button className=" w-auto px-6" title={t('add')} />
            </Link>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>{t('ID')}</TableCell>
                  <TableCell>{t('customerName')}</TableCell>
                  <TableCell>{t('contractNumber')}</TableCell>
                  <TableCell>{t('contractSigningDate')}</TableCell>
                  <TableCell>{t('contractExecutionDate')}</TableCell>
                  <TableCell>{t('complectName')}</TableCell>
                  <TableCell>{t('status')}</TableCell>
                  <TableCell>{t('owner')}</TableCell>
                  <TableCell>{t('created')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((row) => (
                  <TableRow key={row.id}>
                    
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.customer?.name}</TableCell>
                    <TableCell>
                      <Link
                        href={`/orders/${row.id}`}
                        className="hover:text-primary"
                      >
                        {row.contractNumber}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {formatDate(row.contractSigningDate)}
                    </TableCell>
                    <TableCell>
                      {formatDate(row.contractExecutionDate)}
                    </TableCell>

                    <TableCell>{row.complectName}</TableCell>
                    <TableCell>{t(row.status)}</TableCell>
                    <TableCell>{row.owner?.about}</TableCell>
                    <TableCell>
                      {formatDate(row.createdAt)}
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
