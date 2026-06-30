import { useContext } from 'react';
import { FileSystemContext, FileSystemContextValue } from './Context';

/**
 * Hook to access the virtual file system state and operations.
 * @returns {FileSystemContextValue} The file system context value containing state, dispatch, and selector helpers.
 * @throws {Error} If used outside of FileSystemProvider
 */
export const useFileSystem = (): FileSystemContextValue => {
  const context = useContext(FileSystemContext);
  if (!context) {
    throw new Error('useFileSystem must be used within FileSystemProvider');
  }
  return context;
};
