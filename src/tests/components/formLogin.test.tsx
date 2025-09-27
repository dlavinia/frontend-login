import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../../components/forms/LoginForm';

const loginMock = jest.fn();
const navigateMock = jest.fn();

jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    login: loginMock,
  }),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

describe('LoginForm', () => {
  beforeEach(() => {
    loginMock.mockReset();
    navigateMock.mockReset();
  });

  it('renders email and password inputs and submit button', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows validation errors as notification when submitting empty form', async () => {
    render(<LoginForm />);
    const button = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(button);

    const notification = await screen.findByText(/email is required/i);
    expect(notification).toBeInTheDocument();
  });

  it('shows error notification if login fails', async () => {
    loginMock.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(<LoginForm />);
    await userEvent.type(screen.getByLabelText(/email/i), 'wrong@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpassword');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/invalid email or password!/i)).toBeInTheDocument();
  });
});
