import axios from 'axios';
import queryString from 'query-string';
import { UserInterface, UserGetQueryInterface } from 'interfaces/user';
import { PaginatedInterface } from 'interfaces';
import { fetcher } from 'lib/api-fetcher';

export const getUsers = async (query?: UserGetQueryInterface): Promise<PaginatedInterface<UserInterface>> => {
  return fetcher('/api/users', {}, query);
};

export const getUserById = async (id: string, query?: UserGetQueryInterface): Promise<UserInterface> => {
  return fetcher(`/api/users/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};
