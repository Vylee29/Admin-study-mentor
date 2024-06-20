import { message } from 'antd';
import { AxiosError } from 'axios';

export function handleError(error: AxiosError | string) {
  if (typeof error === 'string') message.error(error);
  else if (typeof error?.message === 'string' && !error.isAxiosError) message.error(error.message);
  else if (!error.isAxiosError) message.error('Đã xảy ra sự cố.');
  else if (error.response) {
    const data: any = error.response.data;
    if (Array.isArray(data?.data))
      message.error(
        data?.data.map((m: { field: string; message: string }) => m.field + m.message).join(', '),
      );
    else if (typeof data?.message === 'string') message.error(data?.message);
    else if (data?.data && 'message' in data.data) message.error(data.data.message);
    else message.error('Đã xảy ra sự cố.');
  } else if (error.message) message.error(error.message);
  else message.error('Đã xảy ra sự cố.');
}
