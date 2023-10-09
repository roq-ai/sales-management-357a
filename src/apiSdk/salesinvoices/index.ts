import queryString from 'query-string';
import { SalesinvoiceInterface, SalesinvoiceGetQueryInterface } from 'interfaces/salesinvoice';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSalesinvoices = async (
  query?: SalesinvoiceGetQueryInterface,
): Promise<PaginatedInterface<SalesinvoiceInterface>> => {
  return fetcher('/api/salesinvoices', {}, query);
};

export const createSalesinvoice = async (salesinvoice: SalesinvoiceInterface) => {
  return fetcher('/api/salesinvoices', { method: 'POST', body: JSON.stringify(salesinvoice) });
};

export const updateSalesinvoiceById = async (id: string, salesinvoice: SalesinvoiceInterface) => {
  return fetcher(`/api/salesinvoices/${id}`, { method: 'PUT', body: JSON.stringify(salesinvoice) });
};

export const getSalesinvoiceById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/salesinvoices/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteSalesinvoiceById = async (id: string) => {
  return fetcher(`/api/salesinvoices/${id}`, { method: 'DELETE' });
};
