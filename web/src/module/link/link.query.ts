import { AxiosError } from 'axios';
import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
  useQueryClient,
} from 'react-query';

import {
  createShortLink,
} from './link.service';
import { INewShortLinkRequestDto, INewShortLinkResponseDto } from './types';

export function useCreateLink(
  config?: UseMutationOptions<
    INewShortLinkResponseDto,
    AxiosError,
    INewShortLinkRequestDto,
    unknown
  >,
) {
  // const queryClient = useQueryClient();
  return useMutation(createShortLink, {
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries(['allInventories']);
    // },
    ...config,
  });
}