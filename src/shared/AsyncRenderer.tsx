import React from 'react';

interface AsyncRendererProps<T> {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: T | null;
  error: Error | null;
  renderLoading?: () => React.ReactNode;
  renderError?: (error: Error) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  renderSuccess: (data: T) => React.ReactNode;
  isEmpty?: (data: T) => boolean;
}

/**
 * Standardized component for handling async state transitions.
 * Guarantees a consistent UI for loading, error, empty, and success states.
 */
export function AsyncRenderer<T>({
  status,
  data,
  error,
  renderLoading,
  renderError,
  renderEmpty,
  renderSuccess,
  isEmpty = (d) => Array.isArray(d) ? d.length === 0 : !d,
}: AsyncRendererProps<T>) {
  if (status === 'loading' || status === 'idle') {
    return renderLoading ? renderLoading() : (
      <div className="flex w-full h-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-os-blue"></div>
      </div>
    );
  }
  if (status === 'error') {
    return renderError ? renderError(error!) : (
      <div className="flex flex-col items-center justify-center p-4 text-[var(--theme-error)] w-full h-full">
        <p className="font-semibold">Failed to load data</p>
        <p className="text-sm">{error?.message}</p>
      </div>
    );
  }
  const isDataEmpty = isEmpty(data as T);
  if (isDataEmpty) {
    return renderEmpty ? renderEmpty() : (
      <div className="flex w-full h-full items-center justify-center text-gray-500">
        <p>No data available.</p>
      </div>
    );
  }
  return renderSuccess(data as T);
}
