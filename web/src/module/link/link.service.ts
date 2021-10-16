import axios, {AxiosError} from 'axios';
import { INewShortLinkRequestDto, INewShortLinkResponseDto } from './types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const baseUrl = `${process.env.REACT_APP_API_URL===undefined? '':process.env.REACT_APP_API_URL}/link`;

export async function createShortLink(input: INewShortLinkRequestDto): Promise<INewShortLinkResponseDto> {
  const url = `${baseUrl}`;
  const res = await axios.post<INewShortLinkResponseDto>(url, input);
  return res.data;
}