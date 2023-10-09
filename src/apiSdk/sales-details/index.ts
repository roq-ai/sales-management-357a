import queryString from 'query-string';
import { SalesDetailInterface, SalesDetailGetQueryInterface } from 'interfaces/sales-detail';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSalesDetails = async (
  query?: SalesDetailGetQueryInterface,
): Promise<PaginatedInterface<SalesDetailInterface>> => {
  return fetcher('/api/sales-details', {}, query);
};

export const createSalesDetail = async (salesDetail: SalesDetailInterface) => {
  return fetcher('/api/sales-details', { method: 'POST', body: JSON.stringify(salesDetail) });
};

export const updateSalesDetailById = async (id: string, salesDetail: SalesDetailInterface) => {
  return fetcher(`/api/sales-details/${id}`, { method: 'PUT', body: JSON.stringify(salesDetail) });
};

export const getSalesDetailById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/sales-details/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteSalesDetailById = async (id: string) => {
  return fetcher(`/api/sales-details/${id}`, { method: 'DELETE' });
};
