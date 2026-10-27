"use client";
import BrandContext from "@/components/BrandContext";
import getErrorMessage from "@/helpers/getErrorMessage";
import authService from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

const login = () => {
  const {setAuthStatus, setUserInfo, setAccessToken} = useAuthStore();
  const router = useRouter();
  const from = useSearchParams().get("from");
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authService.login(formData);

      if (response.accessToken) {
        const accessToken = response.accessToken;
        setUserInfo(await authService.getUserInfo({accessToken}));
        toast.success("logged in successful");
        setAuthStatus("authed");
        setAccessToken(accessToken);
        setErrMessage("");
        router.replace(from ?? "/");
      }
      
    } catch (err) {
      const message = getErrorMessage(err)
      console.error(message)
      setErrMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-brand-light">
      {/* LEFT SIDE: BRAND CONTENT SHOWCASE (Matches Register view for design consistency) */}
      <BrandContext/>
      {/* RIGHT SIDE: THE ACTIONABLE LOGIN FORM CANVAS */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md bg-white border border-brand-sand rounded-2xl p-8 sm:p-10 shadow-xl">
          {/* Mobile Only Brand Header */}
          <div className="block lg:hidden mb-6">
            <span className="text-xl font-black tracking-widest text-brand-dark">
              HOANGAN<span className="text-brand-rust">.</span>
            </span>
          </div>

          {/* Form Header Title Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-black text-brand-dark tracking-tight">
              Sign in to your account
            </h1>
            <p className="text-sm text-brand-slate mt-1">
              New to our network?{" "}
              <Link
                href={"/auth/register"}
                className="text-brand-rust font-semibold hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* Form Divider Strip */}
          <div className="flex items-center my-6">
            <div className="grow border-t border-brand-sand/60"></div>
            <span className="px-3 text-xs font-bold tracking-wider text-brand-slate uppercase bg-white">
              your security key
            </span>
            <div className="grow border-t border-brand-sand/60"></div>
          </div>

          {/* Main Input Form Engine */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input 1: Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-brand-slate/60">
                  <i className="fa-solid fa-envelope text-sm"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="david@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors"
                />
              </div>
            </div>

            {/* Input 2: Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-brand-rust hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-brand-slate/60">
                  <i className="fa-solid fa-lock text-sm"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-11 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors"
                />
                 <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-brand-slate/70 hover:text-brand-dark focus:outline-none z-10"
                >
                  <i
                    className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}
                  ></i>
                </button>
              </div>
            </div>

            <div>
              <p className="text-brand-rust">{errMessage}</p>
            </div>


            {/* Submission Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-brand-dark text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-brand-rust hover:shadow-lg transition-all duration-200 focus:outline-none cursor-pointer"
            >
              {isLoading && (
                <i
                  id="btnSpinner"
                  className="fa-solid fa-circle-notch fa-spin hidden"
                ></i>
              )}{" "}
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default login;