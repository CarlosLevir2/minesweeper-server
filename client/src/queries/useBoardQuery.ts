import { useQuery } from 'react-query';

import { ApiResponse, Board } from '../common/types/api';
import { api } from '../services/api';

export const useBoardQuery = () =>
  useQuery(
    ['board'],
    () =>
      api.get<ApiResponse<Board>>('/board').then((response) => response.data),
    {
      select: ({ data }) => data,
    }
  );
