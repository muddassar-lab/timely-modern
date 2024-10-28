import { useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import useCustomForm from '@/lib/form';
import { z } from 'zod';
import GuestLayout from '@/Layouts/GuestLayout';
import { FormProvider } from 'react-hook-form';
import FormControlledInput from '@/Components/controlled/FormControlledInput';
import { Button } from '@/Components/ui/button';

const schema = z.object({
  password: z.string().min(1, { message: "Password is required" })
})

export default function ConfirmPassword() {
  const route = useRoute();
  const form = useCustomForm({
    schema,
    values: {
      password: ''
    },
    callback: (_, inertiaForm) => {
      inertiaForm.post(route('password.confirm'));
    }
  });

  return (
    <GuestLayout title='Secure Area' header='Secure Area' description='This is a secure area of the application. Please confirm your password before continuing.'>
      <FormProvider {...form.hookForm}>
        <FormControlledInput
          label='Password'
          name='password'
          placeholder='Password'
          control={form.hookForm.control}
        />
      </FormProvider>
      <Button disabled={form.disabled} onClick={form.submit}>Confirm</Button>
    </GuestLayout>
  );
}
