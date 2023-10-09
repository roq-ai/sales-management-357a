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
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createSalesinvoice } from 'apiSdk/salesinvoices';
import { salesinvoiceValidationSchema } from 'validationSchema/salesinvoices';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { SalesinvoiceInterface } from 'interfaces/salesinvoice';

function SalesinvoiceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SalesinvoiceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSalesinvoice(values);
      resetForm();
      router.push('/salesinvoices');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SalesinvoiceInterface>({
    initialValues: {
      subtotal: 0,
      vat: 0,
      total: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: salesinvoiceValidationSchema,
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
              label: 'Salesinvoices',
              link: '/salesinvoices',
            },
            {
              label: 'Create Salesinvoice',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Salesinvoice
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Subtotal"
            formControlProps={{
              id: 'subtotal',
              isInvalid: !!formik.errors?.subtotal,
            }}
            name="subtotal"
            error={formik.errors?.subtotal}
            value={formik.values?.subtotal}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('subtotal', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Vat"
            formControlProps={{
              id: 'vat',
              isInvalid: !!formik.errors?.vat,
            }}
            name="vat"
            error={formik.errors?.vat}
            value={formik.values?.vat}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('vat', Number.isNaN(valueNumber) ? 0 : valueNumber)
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

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
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
              onClick={() => router.push('/salesinvoices')}
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
    entity: 'salesinvoice',
    operation: AccessOperationEnum.CREATE,
  }),
)(SalesinvoiceCreatePage);
