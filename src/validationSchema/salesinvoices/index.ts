import * as yup from 'yup';

export const salesinvoiceValidationSchema = yup.object().shape({
  subtotal: yup.number().required(),
  vat: yup.number().nullable(),
  total: yup.number().nullable(),
  user_id: yup.string().nullable(),
});
