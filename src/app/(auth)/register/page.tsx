import RegisterForm from "@/components/application/Auth/RegisterForm";

export default function Register() {
  return (
    <div className="h-screen w-full flex">
      <div className="m-auto">
        <h1 className="font-bold text-3xl">Register</h1>
        <br />
        <RegisterForm />
      </div>
    </div>
  );
}