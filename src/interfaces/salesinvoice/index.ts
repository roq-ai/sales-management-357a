import { SalesDetailInterface } from 'interfaces/sales-detail';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SalesinvoiceInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  user_id?: string;
  subtotal?: number;
  vat?: number;
  total?: number;
  sales_detail?: SalesDetailInterface[];
  user?: UserInterface;
  _count?: {
    sales_detail?: number;
  };
}

export interface SalesinvoiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
