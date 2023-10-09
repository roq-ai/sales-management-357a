interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Business Owner', 'Sales Manager', 'Sales Representative', 'Sales Analyst', 'Customer'],
  tenantName: 'Company',
  applicationName: 'Sales Management App v2',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ['View sales details', 'View sales invoices', 'View user profiles', 'View company information'],
  ownerAbilities: [
    'Manage sales details',
    'Manage sales invoices',
    'Manage user profiles',
    'Manage company information',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/94b7413e-e718-462e-a9d0-666c096a4e03',
};
