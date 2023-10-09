import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getSalesDetailById, updateSalesDetailById } from 'apiSdk/sales-details';
import { salesDetailValidationSchema } from 'validationSchema/sales-details';
import { SalesDetailInterface } from 'interfaces/sales-detail';
import { SalesinvoiceInterface } from 'interfaces/salesinvoice';
import { getSalesinvoices } from 'apiSdk/salesinvoices';

function SalesDetailEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<SalesDetailInterface>(
    () => (id ? `/sales-details/${id}` : null),
    () => getSalesDetailById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: SalesDetailInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateSalesDetailById(id, values);
      mutate(updated);
      resetForm();
      router.push('/sales-details');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<SalesDetailInterface>({
    initialValues: data,
    validationSchema: salesDetailValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Sales Details',
              link: '/sales-details',
            },
            {
              label: 'Update Sales Detail',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Sales Detail
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.item}
            label={'Item'}
            props={{
              name: 'item',
              placeholder: 'Item',
              value: formik.values?.item,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Unitprice"
            formControlProps={{
              id: 'unitprice',
              isInvalid: !!formik.errors?.unitprice,
            }}
            name="unitprice"
            error={formik.errors?.unitprice}
            value={formik.values?.unitprice}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('unitprice', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Qty"
            formControlProps={{
              id: 'qty',
              isInvalid: !!formik.errors?.qty,
            }}
            name="qty"
            error={formik.errors?.qty}
            value={formik.values?.qty}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('qty', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Total"
            formControlProps={{
              id: 'total',
              isInvalid: !!formik.errors?.total,
            }}
            name="total"
            error={formik.errors?.total}
            value={formik.values?.total}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<SalesinvoiceInterface>
            formik={formik}
            name={'salesinvoice_id'}
            label={'Select Salesinvoice'}
            placeholder={'Select Salesinvoice'}
            fetcher={getSalesinvoices}
            labelField={'subtotal'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/sales-details')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'sales_detail',
    operation: AccessOperationEnum.UPDATE,
  }),
)(SalesDetailEditPage);
