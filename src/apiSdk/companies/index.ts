import queryString from 'query-string';
import { CompanyInterface, CompanyGetQueryInterface } from 'interfaces/company';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCompanies = async (query?: CompanyGetQueryInterface): Promise<PaginatedInterface<CompanyInterface>> => {
  return fetcher('/api/companies', {}, query);
};

export const createCompany = async (company: CompanyInterface) => {
  return fetcher('/api/companies', { method: 'POST', body: JSON.stringify(company) });
};

export const updateCompanyById = async (id: string, company: CompanyInterface) => {
  return fetcher(`/api/companies/${id}`, { method: 'PUT', body: JSON.stringify(company) });
};

export const getCompanyById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/companies/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteCompanyById = async (id: string) => {
  return fetcher(`/api/companies/${id}`, { method: 'DELETE' });
};
