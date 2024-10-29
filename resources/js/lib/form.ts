import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useInertiaForm } from '@inertiajs/react';
import { InertiaFormProps } from '@inertiajs/react/types/useForm';
import { useEffect } from 'react';
import { Path, UseFormReturn, useForm as useHookForm } from "react-hook-form";
import { z } from 'zod';

// Define the props interface for the custom form hook
interface Props<S extends z.ZodSchema> {
    schema: S; // Zod schema for form validation
    values: z.infer<S>; // Initial form values inferred from the schema
    callback: (
        data: z.infer<S>,
        inertiaForm: InertiaFormProps<z.TypeOf<S>>,
        hookForm: UseFormReturn<z.TypeOf<S>, any, undefined>
    ) => void; // Callback function to handle form submission
}

// Custom hook for managing form state with Inertia and React Hook Form
const useCustomForm = <S extends z.ZodSchema>({ schema, values, callback }: Props<S>) => {
    // Initialize React Hook Form with Zod resolver and default values
    const hookForm = useHookForm<z.infer<S>>({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: values,
    });

    // Initialize Inertia form
    const inertiaForm = useInertiaForm<z.infer<S>>(values);

    // Handle form submission
    const submit = hookForm.handleSubmit((data) => {
        callback(data, inertiaForm, hookForm);
    });

    // Watch hook form values for sync with Inertia form
    const hookFormValues = hookForm.watch();

    // Sync hook form values with Inertia form values
    useEffect(() => {
        const inertiaFormValues = inertiaForm.data;

        // Only set Inertia form data if values differ
        if (JSON.stringify(hookFormValues) !== JSON.stringify(inertiaFormValues)) {
            inertiaForm.setData(hookFormValues);
        }
    }, [hookFormValues, inertiaForm.data]);

    // Set errors from Inertia form to hook form if they exist
    useEffect(() => {
        const errors = inertiaForm.errors;
        if (Object.keys(errors).length > 0) {
            for (const [key, message] of Object.entries(errors)) {
                hookForm.setError(key as Path<z.infer<S>>, { type: 'server', message });
            }
        }
    }, [inertiaForm.errors]);

    return {
        submit,      // Function to submit the form
        inertiaForm, // Inertia form instance
        hookForm,    // React Hook Form instance
        disabled: inertiaForm.processing || !hookForm.formState.isValid
    };
};

export default useCustomForm;
