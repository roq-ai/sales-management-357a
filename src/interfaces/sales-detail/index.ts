import { SalesinvoiceInterface } from 'interfaces/salesinvoice';
import { GetQueryInterface } from 'interfaces';

export interface SalesDetailInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  item: string;
  unitprice?: number;
  qty?: number;
  total?: number;
  salesinvoice_id?: string;

  salesinvoice?: SalesinvoiceInterface;
  _count?: {};
}

export interface SalesDetailGetQueryInterface extends GetQueryInterface {
  id?: string;
  item?: string;
  salesinvoice_id?: string;
}
