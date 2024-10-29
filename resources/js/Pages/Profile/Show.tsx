import React from 'react';
import LogoutOtherBrowserSessions from '@/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import useTypedPage from '@/Hooks/useTypedPage';
import AppLayout from '@/Layouts/AppLayout';
import { Session } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Props {
  sessions: Session[];
  confirmsTwoFactorAuthentication: boolean;
}

export default function Show({
  sessions,
  confirmsTwoFactorAuthentication,
}: Props) {
  return (
    <AuthenticatedLayout title='Setting'>
      <UpdateProfileInformationForm />
      <UpdatePasswordForm />
      <LogoutOtherBrowserSessions sessions={sessions} />
    </AuthenticatedLayout>
  );
}
