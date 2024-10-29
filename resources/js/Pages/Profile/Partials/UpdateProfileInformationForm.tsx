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

interface Props {

}

export default function UpdateProfileInformationForm({ }: Props) {

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Update Profile Information</CardTitle>
          <CardDescription>Update your personal information and preferences.</CardDescription>
        </CardHeader>
        <CardContent>

        </CardContent>
        <CardFooter className="flex justify-end">

        </CardFooter>
      </Card>
    </>
  );
}
