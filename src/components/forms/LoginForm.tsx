import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [notification, setNotification] = useState<string | null>(null);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email!')
      .required('Email is required!'),
    password: Yup.string().required('Password is required!'),
  });

  async function handleSubmit(
    values: typeof initialValues,
    { setSubmitting }: any
  ) {
    try {
      await login(values.email, values.password);
      navigate('/profile');
    } catch (err) {
      setNotification('Invalid email or password!');
    } finally {
      setSubmitting(false);
    }
  }

  // Auto-hide a notificação depois de 3 segundos
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="relative">
      {notification && (
        <div id="form-error" className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow z-50">
          {notification}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => {
          // Mostra erros de validação como notificação
          useEffect(() => {
            if (Object.keys(errors).length > 0 && Object.keys(touched).length > 0) {
              const firstError = Object.values(errors)[0] as string;
              setNotification(firstError);
            }
          }, [errors, touched]);

          return (
            <Form className="space-y-4 w-full max-w-md mx-auto">
              <div className="mb-1.5">
                <label htmlFor="email" className="block text-sm font-bold">
                  Email
                </label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  placeholder="@gmail.com"
                  type="email"
                  autoComplete="email"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold">
                  Password
                </label>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  autoComplete="current-password"
                  className="mt-1 w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full font-bold py-6"
                disabled={isSubmitting}
                name="signin"
              >
                Sign In
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
