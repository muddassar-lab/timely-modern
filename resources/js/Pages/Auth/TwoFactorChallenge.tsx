import { useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import useCustomForm from '@/lib/form';
import { z } from 'zod';
import FormControlledInput from '@/Components/controlled/FormControlledInput';
import { Button } from '@/Components/ui/button';
import { FormProvider } from 'react-hook-form';

const schema = z.object({
  type: z.enum(['recovery_code', 'code']),
  code: z.string().optional(),
  recovery_code: z.string().optional(),
}).refine(data => {
  if (data.type === 'code') {
    return data.code && data.code.length === 6;
  } else if (data.type === 'recovery_code') {
    return data.recovery_code;
  }
  return false;
}, {
  message: 'Invalid code or recovery code based on type',
});

function TwoFactorChallenge() {
  const route = useRoute();
  const form = useCustomForm({
    schema,
    values: {
      type: 'code',
      code: '',
      recovery_code: ''
    },
    callback: (_, inertiaForm) => {
      inertiaForm.post(route('two-factor.login'))
    }
  })

  const type = form.hookForm.watch('type')

  return (
    <>
      <FormProvider {...form.hookForm}>
        {
          type === 'code' && (
            <FormControlledInput
              label='Code'
              name='code'
              placeholder='Code'
              control={form.hookForm.control}
            />
          )
        }
        {
          type === 'recovery_code' && (
            <FormControlledInput
              label='Recovery Code'
              name='recovery_code'
              placeholder='Code'
              control={form.hookForm.control}
            />
          )
        }
      </FormProvider>
      <Button className='w-full' disabled={form.disabled} onClick={form.submit}>Login</Button>
      <Button variant={"ghost"} onClick={() => form.hookForm.setValue('type', type === 'code' ? 'recovery_code' : 'code')}>
        {type === 'code' ? 'Use Recovery Code' : 'Use Code'}
      </Button>
    </>
  );
}

TwoFactorChallenge.layout = (page: React.ReactNode) => (
  <GuestLayout
    children={page}
    title='Two Factor Verification'
    header='Two Factor Verification'
    description={'Enter the code or recovery code.'}
  />
)

export default TwoFactorChallenge;