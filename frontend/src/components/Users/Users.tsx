import React from 'react'
import { useAuthStore } from '../../../shared/stores/auth';
import { useQuery } from '@tanstack/react-query';
import { User } from '../../../shared/types';
import { api } from '../../../shared/api/api';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const Users = () => {
   const token = useAuthStore((state) => state.token);
   const getUsers = () => api.getAllUsersRequest(token);
   const {data: users = [], isLoading } = useQuery<User[]>({queryKey:['user'], queryFn: getUsers}); 
  return (
    <>
      {isLoading? <div>Loading...</div> :<div>
        <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Имя</TableCell>
                  <TableCell>эл. почта</TableCell>
                  <TableCell>Регистрация
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.email}</TableCell>
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
        </div>}
    </>
  );
}
