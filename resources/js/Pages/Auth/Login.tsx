import React from 'react';
import useRoute from '@/Hooks/useRoute';
import GuestLayout from "@/Layouts/GuestLayout";
import { z } from 'zod';
import useCustomForm from '@/lib/form';
import FormControlledInput from '@/Components/controlled/FormControlledInput';
import { Form, FormProvider } from 'react-hook-form';
import { Button } from '@/Components/ui/button';

interface Props {
    canResetPassword: boolean;
    status: string;
}

const schema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email("Email is invalid"),
    password: z.string().min(1, { message: "Password is required" })
})

export default function Login({ canResetPassword, status }: Props) {
    const route = useRoute();
    const form = useCustomForm({
        schema,
        values: {
            email: "",
            password: ""
        },
        callback: (data, inertiaForm) => {
            inertiaForm.post(route('login'), {
                data
            })
        }
    })

    return (
        <GuestLayout title={"Login"}>
            <FormProvider {...form.hookForm}>
                <FormControlledInput
                    control={form.hookForm.control}
                    name={"email"}
                    label='Email'
                />
                <FormControlledInput
                    control={form.hookForm.control}
                    name={"password"}
                    label='Password'
                />
                <div className='flex justify-end'>
                    <Button disabled={form.inertiaForm.processing} onClick={form.submit} size={"lg"}>Login</Button>
                </div>
            </FormProvider>


        </GuestLayout>
    );
}
