/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, EffectCallback } from 'react';

export const useEffectOnce = (action: EffectCallback) =>
  useEffect(() => {
    action();
    return () => {};
  }, []);
