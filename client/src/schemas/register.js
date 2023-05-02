import * as Yup from 'yup';

export const registerSchema = Yup.object({
        firstName: Yup
        .string()
        .max(15,"First name can contain up to 15 characters.")
        .required("Name is required."),
        lastName: Yup
        .string()
        .max(15,"Last name can contain up to 15 characters.")
        .required("Last name is required."),
        registerPassword: Yup
        .string()
        .min(6,"Password must consist at least 6 characters.")
        .max(12,"Password can contain up to 12 characters.")
        .required("Password is required"),
        confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('registerPassword'), null], 'Passwords must match')
        .required("You have to confirm your password."),
        registerEmail: Yup
        .string()
        .email("Email is not valid.")
        .required("Email is required.")
        .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/,"Email is not valid."),
});