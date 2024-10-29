import React from 'react';
import LogoutOtherBrowserSessions from '@/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm';
import TwoFactorAuthenticationForm from '@/Pages/Profile/Partials/TwoFactorAuthenticationForm';
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
      <LogoutOtherBrowserSessions sessions={sessions} />
    </AuthenticatedLayout>
  );
}
