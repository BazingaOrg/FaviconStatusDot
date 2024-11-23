import React, { useEffect, useRef } from 'react';
import { FaviconStatus } from '../../src/core/favicon';
import type { StatusType, FaviconOptions } from '../../src/types';

interface Props {
  status?: StatusType;
  options: FaviconOptions;
}
export const FaviconStatusComponent = ({ status, options }: Props) => {
  const faviconRef = useRef();

  useEffect(() => {
    faviconRef.current = new FaviconStatus(options);
    return () => {
      faviconRef.current?.destroy();
    };
  }, [options]);

  useEffect(() => {
    if (status && faviconRef.current) {
      faviconRef.current.updateStatus(status);
    }
  }, [status]);

  return null;
}; 