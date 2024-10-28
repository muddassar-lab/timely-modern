import { useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import useCustomForm from '@/lib/form';
import { z } from 'zod';
import { FormProvider } from 'react-hook-form';
import FormControlledInput from '@/Components/controlled/FormControlledInput';
import { Button } from '@/Components/ui/button';

interface Props {
  status: string;
}

const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email("Email is invalid"),
})

export default function ForgotPassword({ status }: Props) {
  const route = useRoute();

  const form = useCustomForm({
    schema,
    values: {
      email: ''
    },
    callback: (_, inertiaForm) => {
      inertiaForm.post(route('password.email'));
    }
  })

  return (
    <GuestLayout
      title='Forgot Password'
      header='Forgot Password'
      description='Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.'>
      {
        status && (
          <div className="font-medium text-sm text-green-600">
            {status}
          </div>
        )
      }
      <FormProvider {...form.hookForm}>
        <FormControlledInput
          label='Email'
          name='email'
          placeholder='Email'
          control={form.hookForm.control}
        />
      </FormProvider>
      <Button onClick={form.submit} disabled={form.disabled}>Send Password Reset Link</Button>
    </GuestLayout>

  );
}
