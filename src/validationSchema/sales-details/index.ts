import * as yup from 'yup';

export const salesDetailValidationSchema = yup.object().shape({
  item: yup.string().required(),
  unitprice: yup.number().required(),
  qty: yup.number().nullable(),
  total: yup.number().nullable(),
  salesinvoice_id: yup.string().nullable(),
});
