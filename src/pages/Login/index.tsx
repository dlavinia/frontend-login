import LoginForm  from '../../components/forms/LoginForm';
import Logo from '@/assets/B2BitLogo.png';


export default function LoginPage() {
  return (
    <div className="bg-white space-y-4 flex flex-col shadow-2xl items-center p-5 rounded-2xl md:pt-[60px] md:pb-[60px] md:px-[40px]">
      <img src={Logo} className="w-[90%]" alt="Logo da B2Bit" />
      <LoginForm />
    </div>
  );
}
