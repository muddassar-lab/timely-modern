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
import useTypedPage from '@/Hooks/useTypedPage';
import FormControlledDatePicker from '@/Components/controlled/FormControlledDatePicker';

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(255, { message: "Name can be at most 255 characters" }),
  date_of_birth: z.date({ required_error: 'Date of birth is required' }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is invalid" })
    .max(255, { message: "Email can be at most 255 characters" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .regex(/^923\d{9}$/, { message: "Phone number should start with 923 and be exactly 12 digits" })
});

export default function UpdateProfileInformationForm() {
  const route = useRoute()
  const page = useTypedPage()
  const form = useCustomForm({
    schema,
    values: {
      name: page.props.auth.user?.name ?? "",
      date_of_birth: new Date(page.props.auth.user?.date_of_birth) as Date,
      email: page.props.auth.user?.email ?? "",
      phone: page.props.auth.user?.phone ?? ""
    },
    callback: (_, inertiaForm) => {
      inertiaForm.put(route('user-profile-information.update'), {
        preserveScroll: true,
        errorBag: 'updateProfileInformation'
      })
    }
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Update Profile Information</CardTitle>
          <CardDescription>Update your personal information and preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form.hookForm}>
            <FormControlledInput
              name='name'
              label='Name'
              control={form.hookForm.control}
            />
            <FormControlledDatePicker
              name='date_of_birth'
              label='Date of Birth'
              control={form.hookForm.control}
            />
            <FormControlledInput
              name='email'
              label='Email'
              control={form.hookForm.control}
            />
            <FormControlledInput
              name='phone'
              label='Phone'
              control={form.hookForm.control}
            />
          </FormProvider>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={form.submit}>Save</Button>
        </CardFooter>
      </Card>
    </>
  );
}
