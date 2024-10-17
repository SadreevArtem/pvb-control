import React from 'react'
import { useAuthStore } from '../../../shared/stores/auth';
// import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../shared/api/api';
import { Complect } from '../../../shared/types';

type Props = {
    id: number;
  };

export const ComplectDetail: React.FC<Props> = ({ id }) => {
    const isEdit = id !== 0;
    const token = useAuthStore((state) => state.token);
    // const t = useTranslations("OrderDetail");
    // const queryClient = useQueryClient();

    const getComplectById = () => api.getComplectByIdRequest(id, token);
    const getQueryKey = (id: number) => ["order"].concat(id.toString());
  
    const { data: complect } = useQuery<Complect>({
      queryKey: getQueryKey(id),
      queryFn: getComplectById,
      enabled: isEdit,
    });
  return (
    <div>
        <p>{id}</p>
       <p>{complect?.brand||""}</p> 
        ComplectDetail</div>
  )
}
