import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/B2BitLogo.png";
import "./styles.css";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Please enter a valid email!")
            .required("This field is required!"),
        password: Yup.string().required("This field is required!"),
    });

    async function handleSubmit(
        values: typeof initialValues,
        {
            setSubmitting,
            setStatus,
        }: {
            setSubmitting: (isSubmitting: boolean) => void;
            setStatus: (status?: string) => void;
        }
    ) {
        try {
             await login(values.email, values.password);
            navigate("/profile"); 
        } catch (err) {
            setStatus("Invalid email or password!");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, status }) => (
                <Form
                    id="login"
                    className="bg-white space-y-4 flex flex-col items-center p-5  md:pt-[60px] md:pb-[60px] md:px-[40px]"
                >
                    <img src={Logo} className="w-[90%]" alt="Logo da B2Bit" />

                    {status && (
                        <div className="text-red-500 text-sm font-medium mb-2">{status}</div>
                    )}

                    <div className="w-full">
                        <label htmlFor="email" className="block text-sm text-gray-700 font-bold">
                            Email
                        </label>
                        <Field
                            as={Input}
                            id="email"
                            name="email"
                            placeholder="@gmail.com"
                            type="email"
                            className="mt-1 w-full text-neutral-900 px-4 py-6 rounded-md focus:outline-none"
                            autoComplete="email"
                        />
                        <div className="min-h-[20px]">
                            <ErrorMessage
                                name="email"
                                component="span"
                                className="text-red-600 text-bold text-sm mt-1"
                            /> </div>
                    </div>

                    <div className="w-full ">
                        <label htmlFor="password" className="block text-sm text-gray-700 font-bold" >
                            Password
                        </label>
                        <Field
                            as={Input}
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            type="password"
                            className="mt-1 w-full text-neutral-900 px-4 py-6 rounded-md focus:outline-none"
                            autoComplete="current-password"
                        />
                        <div className="min-h-[20px]">
                            <ErrorMessage
                                name="password"
                                component="span"
                                className="text-red-600 font-medium text-sm mt-1"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full text-white font-bold px-4 py-6"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "..." : "Sign In"}
                    </Button>

                </Form>
            )}
        </Formik>
    );
}
