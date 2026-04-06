"use client";
import LoginBackground from "@/public//LoginBackground.png";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineMovie } from "react-icons/md";
import { useAuth } from "@/contexts/AuthContext";
import { LoginRequest, SignupRequestOtpRequest, VerifyPasswordResetRequest } from "@/interfaces/authInterface";
import LoginForm from "./_components/LoginForm";
import RegisterForm from "./_components/RegisterForm";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export default function LoginPage() {
  const router = useRouter();
  const {
    isAuthenticated,
    login,
    requestSignupOtp,
    verifyOtpAndSignup,
    requestPasswordReset,
    verifyPasswordReset,
    isLoading,
    error,
    clearError,
  } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "register" | "forgot">("login");

  const [loginData, setLoginData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [registerStep, setRegisterStep] = useState<"details" | "otp">("details");
  const [registerData, setRegisterData] = useState<SignupRequestOtpRequest>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });
  const [registerOtp, setRegisterOtp] = useState("");

  const [forgotStep, setForgotStep] = useState<"email" | "reset">("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotData, setForgotData] = useState<VerifyPasswordResetRequest>({
    email: "",
    otp: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginData);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleRegisterRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requestSignupOtp(registerData);
      setRegisterStep("otp");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegisterVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyOtpAndSignup({ email: registerData.email, otp: registerOtp });
      setRegisterStep("details");
      setRegisterData({ firstName: "", lastName: "", email: "", password: "", role: "user" });
      setRegisterOtp("");
      setActiveTab("login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegisterBack = () => {
    setRegisterStep("details");
    setRegisterOtp("");
    if (error) clearError();
  };

  const handleForgotEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgotEmail(e.target.value);
    if (error) clearError();
  };

  const handleForgotResetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForgotData(prev => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requestPasswordReset({ email: forgotEmail });
      setForgotData(prev => ({ ...prev, email: forgotEmail }));
      setForgotStep("reset");
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyPasswordReset(forgotData);
      setForgotStep("email");
      setForgotEmail("");
      setForgotData({ email: "", otp: "", password: "" });
      setActiveTab("login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleForgotBack = () => {
    setForgotStep("email");
    setForgotEmail("");
    setForgotData({ email: "", otp: "", password: "" });
    if (error) clearError();
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      {/* Left Side: Hero */}
      <div
        className="hidden md:flex md:w-1/2 lg:w-3/5 bg-cover bg-center relative"
        style={{
          backgroundImage:
            `url(${LoginBackground.src})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        <div className="relative z-10 flex flex-col justify-end p-12 lg:p-20 w-full">
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
            Unlock the <br />
            <span className="text-primary">Cinema Experience</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-lg">
            Join the exclusive club for premieres, zero booking fees, and special rewards tailored just for movie lovers.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col relative bg-background-light dark:bg-background-dark">
        {/* Header */}
        <div className="flex items-center justify-between p-6 absolute top-0 w-full z-20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl"><MdOutlineMovie /></span>
            <span className="text-xl font-bold tracking-tight">CineBook</span>
          </div>
        </div>

        {/* Form Container Centered Vertically */}
        <div className="flex flex-1 justify-center items-center p-6 sm:p-12 lg:p-16 w-full">
          <div className="w-full max-w-md flex flex-col gap-8">
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-[#543b3b] flex gap-8">
              <button
                onClick={() => setActiveTab("login")}
                className={`relative pb-3 text-sm font-bold ${activeTab === "login"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-400 dark:text-[#b99d9d] hover:text-white"
                  }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`relative pb-3 text-sm font-bold ${activeTab === "register"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-400 dark:text-[#b99d9d] hover:text-white"
                  }`}
              >
                Create Account
              </button>
            </div>

            {/* Render Forms */}
            {activeTab === "login" && (
              <LoginForm
                setActiveTab={setActiveTab}
                formData={loginData}
                onChange={handleLoginChange}
                onSubmit={handleLoginSubmit}
                showPassword={showPassword}
                toggleShowPassword={() => setShowPassword(prev => !prev)}
                isLoading={isLoading}
                error={error}
              />
            )}
            {activeTab === "register" && (
              <RegisterForm
                formData={registerData}
                otp={registerOtp}
                step={registerStep}
                onChange={handleRegisterChange}
                onOtpChange={setRegisterOtp}
                onSubmit={handleRegisterRequestOtp}
                onVerify={handleRegisterVerifyOtp}
                onBack={handleRegisterBack}
                isLoading={isLoading}
                error={error}
              />
            )}
            {activeTab === "forgot" && (
              <ForgotPasswordForm
                step={forgotStep}
                email={forgotEmail}
                resetData={forgotData}
                onEmailChange={handleForgotEmailChange}
                onResetChange={handleForgotResetChange}
                onRequestReset={handleRequestReset}
                onVerifyReset={handleVerifyReset}
                onBack={handleForgotBack}
                isLoading={isLoading}
                error={error}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}