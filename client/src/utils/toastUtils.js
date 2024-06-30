// src/utils/toastUtils.js
import { toast } from 'react-hot-toast';

export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message);
};

export const showInfoToast = (message) => {
  toast(message); // Default toast for info
};
