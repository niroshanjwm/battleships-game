import RegisterForm from "@/components/forms/registerForm";

const RegisterPage = () => {
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-full">
        <RegisterForm title="Player 1" className="w-100" />
      </div>
    </div>
  );
};

export default RegisterPage;
