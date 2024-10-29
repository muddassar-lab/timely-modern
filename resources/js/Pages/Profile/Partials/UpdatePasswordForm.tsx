import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import { Session } from '@/types';
import { Button } from '@/Components/ui/button';
import { z } from 'zod';
import useCustomForm from '@/lib/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FormProvider } from 'react-hook-form';
import FormControlledInput from '@/Components/controlled/FormControlledInput';
import useConfirmDialog from '@/Hooks/useConfirmDialog';

const schema = z.object({
  current_password: z.string({ required_error: 'Current password is required' }),
  password: z.string({ required_error: 'Password is required' }).min(8, { message: "Password should be atleast 8 characters" }),
  password_confirmation: z
    .string({ required_error: "Password confirmation is required" })
    .min(1, { message: "Password confirmation is required" })
}).refine((data) => data.password === data.password_confirmation, {
  path: ["password_confirmation"],
  message: "Password confirmation does not match password",
});

export default function UpdatePasswordForm() {
  const route = useRoute()
  const form = useCustomForm({
    schema,
    values: {
      current_password: '',
      password: '',
      password_confirmation: '',
    },
    callback: (_, inertiaForm) => {
      inertiaForm.put(route('user-password.update'), {
        preserveScroll: true,
        errorBag: 'updatePassword',
        onSuccess: () => {
          form.hookForm.reset()
        }
      })
    }
  })

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
          <CardDescription>Update your password</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form.hookForm}>
            <FormControlledInput
              name='current_password'
              label='Current Password'
              control={form.hookForm.control}
            />
            <FormControlledInput
              name='password'
              label='New Password'
              control={form.hookForm.control}
            />
            <FormControlledInput
              name='password_confirmation'
              label='Confirm Password'
              control={form.hookForm.control}
            />
          </FormProvider>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={form.submit}>Update Password</Button>
        </CardFooter>
      </Card>
    </>
  );
}
