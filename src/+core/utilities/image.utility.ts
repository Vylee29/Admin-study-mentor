import IMAGES from '../../assets/images';
import { PROCESS_ENV } from '../constants/env.constant';

export const imageUtility = (key?: string): string => {
  return !key ? IMAGES.defaultAvatar : `${PROCESS_ENV.PHOTO}${key}`;
};
