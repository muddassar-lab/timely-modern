import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from '@/Components/ui/button';

interface Props {
  status: string;
}

export default function VerifyEmail({ status }: Props) {
  const route = useRoute();
  const form = useForm({});
  const verificationLinkSent = status === 'verification-link-sent';

  function onSubmit(e: React.FormEvent) {
    form.post(route('verification.send'));
  }

  return (
    <GuestLayout title='Email Verification'>
      <div className="mb-4 text-sm">
        Before continuing, could you verify your email address by clicking on
        the link we just emailed to you? If you didn't receive the email, we
        will gladly send you another.
      </div>
      {verificationLinkSent && (
        <div className="mb-4 font-medium text-sm text-green-600">
          A new verification link has been sent to the email address you
          provided during registration.
        </div>
      )}
      <div className='flex justify-end'>
        <Button size={"lg"} onClick={() => form.post(route("logout"))} variant={"link"}>Logout</Button>
        <Button size={"lg"} onClick={onSubmit}>Send Verification Link</Button>
      </div>
    </GuestLayout>
  );
}
