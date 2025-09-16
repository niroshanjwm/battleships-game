import RegisterForm from "@/components/forms/registerForm";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-full">
        <RegisterForm className='w-100' />
      </div>
    </div>
  );
}
