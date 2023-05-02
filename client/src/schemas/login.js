import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup
    .string()
    .email("Email is not valid.")
    .required("Email is required.")
    .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/,"Email is not valid."),
    password: Yup
    .string()
    .required("Password is required")
    .min(6,"Password must consist at least 6 characters.")
    .max(12,"Password can contain up to 12 characters.")
});
