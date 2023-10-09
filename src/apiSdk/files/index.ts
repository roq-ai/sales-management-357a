import { CreateFileAssociationInterface, GetFilesQuery } from 'interfaces/files';
import { fetcher } from 'lib/api-fetcher';

export const createFileAssociation = async (fileAssociation: CreateFileAssociationInterface) => {
  return fetcher('/api/file-associations', { method: 'POST', body: JSON.stringify(fileAssociation) });
};

export const deleteFileAssociation = async (fileId: string) => {
  return fetcher('/api/file-associations', { method: 'DELETE', body: JSON.stringify({ fileId }) });
};

export const getFiles = async (query: GetFilesQuery) => {
  return fetcher(
    '/api/files',
    {
      headers: { 'Content-Type': 'application/json' },
    },
    query,
  );
};
