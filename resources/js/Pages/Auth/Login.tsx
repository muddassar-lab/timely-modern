import React from 'react';
import useRoute from '@/Hooks/useRoute';
import GuestLayout from "@/Layouts/GuestLayout";
import { z } from 'zod';
import useCustomForm from '@/lib/form';
import FormControlledInput from '@/Components/controlled/FormControlledInput';
import { Form, FormProvider } from 'react-hook-form';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';

interface Props {
    canResetPassword: boolean;
    status: string;
}

const schema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email("Email is invalid"),
    password: z.string().min(1, { message: "Password is required" })
})

function Login({ canResetPassword, status }: Props) {
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
        <>
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
                    <Link href={route('password.request')}>Forgot Password?</Link>
                </div>
                <div className='flex justify-end'>
                    <Button disabled={form.disabled} onClick={form.submit}>Login</Button>
                </div>
            </FormProvider>
        </>
    );
}

Login.layout = (page: React.ReactNode) => (
    <GuestLayout
        children={page}
        linkHref='/register'
        linkTitle='Register'
        title={"Login"}
        header={"Login to your account"}
        description='You can login to your account using your email and password.'
    />
)

export default Login;