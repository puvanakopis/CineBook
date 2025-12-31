"use client";

import { useState } from "react";
import { MdOutlineMovie } from "react-icons/md";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register" | "forgot">("login");

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      {/* Left Side: Hero */}
      <div
        className="hidden md:flex md:w-1/2 lg:w-3/5 bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBhEhVztSNAFf3N5x5feRRY_2RqNw8qZxYYQpQaKN0KWOe4wGpl4YLhFLkyUZU7DFrBnJvaTHcU7S5x5PYr5eYzlC3w988G4q9FN8Sg_sA4UQkbUbifI44lcEeEr1TXEiZoLZW5NB5DMwM8GBtl6Eo3n7ASxGcfaA6dlIqbji-HcDKy93eogLUjxtYd1gGMiakSTiXocwKX1N2Gq8Puoy61cbGRDhBG3cr5AXi1eMuSSdUaC5GJPMumciVzj2Ici7L106d7v_CdCKV3")',
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
            {activeTab === "login" && <LoginForm setActiveTab={setActiveTab} />}
            {activeTab === "register" && <RegisterForm />}
            {activeTab === "forgot" && <ForgotPasswordForm />}
          </div>
        </div>
      </div>
    </div>
  );
}