const mapping: Record<string, string> = {
  companies: 'company',
  'sales-details': 'sales_detail',
  salesinvoices: 'salesinvoice',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
