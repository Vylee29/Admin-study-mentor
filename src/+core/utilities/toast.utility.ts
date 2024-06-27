import { Bounce, toast } from 'react-toastify';

// truyền message
export const toastSuccess = (message: string, closeTimeout = 2000) => {
  toast.success(message, {
    autoClose: closeTimeout,
    type: 'success',
    position: 'top-left',
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });
};

export const toastError = (message: string, closeTimeout = 2000) => {
  toast.error(message, {
    autoClose: closeTimeout,
    type: 'error',
    position: 'top-left',
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });
};
