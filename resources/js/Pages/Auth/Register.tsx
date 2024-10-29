import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import GuestLayout from '@/Layouts/GuestLayout';
import useCustomForm from '@/lib/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormControlledInput from '@/Components/controlled/FormControlledInput';
import { FormProvider } from 'react-hook-form';
import { Button } from '@/Components/ui/button';
import FormControlledDatePicker from '@/Components/controlled/FormControlledDatePicker';

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(255, { message: "Name can be at most 255 characters" }),
  date_of_birth: z.date({ required_error: 'Date of birth is required' }).nullable(),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is invalid" })
    .max(255, { message: "Email can be at most 255 characters" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .regex(/^923\d{9}$/, { message: "Phone number should start with 923 and be exactly 12 digits" }),
  password: z.string({ required_error: 'Password is required' }).min(8, { message: "Password should be atleast 8 characters" }),
  password_confirmation: z
    .string({ required_error: "Password confirmation is required" })
    .min(1, { message: "Password confirmation is required" })
}).refine((data) => data.password === data.password_confirmation, {
  path: ["password_confirmation"],
  message: "Password confirmation does not match password",
});


function Register() {
  const page = useTypedPage();
  const route = useRoute();
  const form = useCustomForm({
    schema,
    values: {
      name: "",
      date_of_birth: null,
      email: "",
      phone: "",
      password: "",
      password_confirmation: ""
    },
    callback: (data, inertiaForm) => {
      inertiaForm.post(route('register'), {
        data,
        onFinish: () => {
          console.log('Posted')
        }
      })
    }
  })

  return (
    <>
      <FormProvider {...form.hookForm}>
        <FormControlledInput
          control={form.hookForm.control}
          name={"name"}
          label='Name'
        />
        <FormControlledDatePicker
          control={form.hookForm.control}
          name={"date_of_birth"}
          label={'Date Of Birth'}
        />
        <FormControlledInput
          control={form.hookForm.control}
          name={"email"}
          label='Email'
        />
        <FormControlledInput
          control={form.hookForm.control}
          name={"phone"}
          label='Phone'
        />
        <FormControlledInput
          control={form.hookForm.control}
          name={"password"}
          label='Password'
        />
        <FormControlledInput
          control={form.hookForm.control}
          name={"password_confirmation"}
          label='Confirm Password'
        />
        <Button disabled={form.disabled} onClick={form.submit} className='w-full'>Register</Button>
      </FormProvider>

    </>
  );
}

Register.layout = (page: React.ReactNode) => (
  <GuestLayout
    children={page}
    linkHref='/login'
    linkTitle='Login'
    title={"Register"}
    header={"Create an Account"}
    description='Create an account to access our services'
  />
)

export default Register;