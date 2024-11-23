export type DefaultOptions = {
  size: 32;
  dotSize: 4;
  dotPosition: { x: 24; y: 24 };
  statusColors: {
    pending: '#FFA500';
    success: '#4CAF50';
    error: '#f44336';
  };
};

export interface FaviconOptions extends Partial<Omit<DefaultOptions, 'statusColors'>> {
  originalFaviconUrl: string;
  statusColors?: Partial<DefaultOptions['statusColors']>;
}

export type StatusType = 'pending' | 'success' | 'error'; 