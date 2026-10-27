"use client"
import BrandContext from "@/components/BrandContext";
import OtpInput from "@/components/registerComponent/OtpInput";
import getErrorMessage from "@/helpers/getErrorMessage";
import authService from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function register() {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRequestOTP = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if(isSending) return;
    setIsSending(true);

    try {
      await authService.requestOtpRegister(formData.email);
      toast.success("A new code has been sent");
      setIsOtpOpen(true);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSending(false);
    }
  };

  const handleResendOTP = async () => {
      if (isSending || cooldown > 0) return;
  setIsSending(true);
  try {
    await authService.requestOtpRegister(formData.email);
    toast.success("A new code has been sent");
    setOtp(new Array(6).fill(""));
    setCooldown(60);
  } catch (err) {
    toast.error(getErrorMessage(err));
  } finally {
    setIsSending(false);
  }
  };

  const handleRegister = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length < 6) {
      toast.warning("Please enter all 6 digits");
      return;
    };
    setIsRegistering(true);
    try {
      const response = await authService.register({...formData, otp: code});
      toast.success("Register successful");
      router.push("/auth/login");
    } catch (err) {
      const message = getErrorMessage(err)
      toast.error(message || "Register failed");
    } finally {
      setIsRegistering(false)
    }
  };

  useEffect(()=>{
    if(cooldown <= 0) return;
    const timer = setTimeout((c) => {c - 1}, 1000);
    return () => clearTimeout(timer);
  },[cooldown])

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-brand-light">
      {/* LEFT SIDE: BRAND CONTENT & VISUAL SHOWCASE (Hidden on mobile) */}
      <BrandContext/>
      {/* RIGHT SIDE: THE ACTIONABLE REGISTRATION FORM CANVAS */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center ">
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
              Create account
            </h1>
            <p className="text-sm text-brand-slate mt-1">
              Already registered?{" "}
              <Link
                href="/auth/login"
                className="text-brand-rust font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>

          {/* Form Separator Text Strip */}
          <div className="flex items-center my-6">
            <div className="grow border-t border-brand-sand/60"></div>
            <span className="px-3 text-xs font-bold tracking-wider text-brand-slate uppercase bg-white">
              your secure email
            </span>
            <div className="grow border-t border-brand-sand/60"></div>
          </div>

          {/* Main Input Form Engine */}
          <form onSubmit={handleRequestOTP} className="space-y-4">
            {/* Input 1: Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-brand-slate/60">
                  <i className="fa-solid fa-user text-sm"></i>
                </span>
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="David Hoang"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors"
                />
              </div>
            </div>

            {/* Input 2: Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
                Work Email Address
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

            {/* Input 3: Password (With Toggle View Support) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
                Create Secure Password
              </label>
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
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-brand-slate/70 hover:text-brand-dark focus:outline-none"
                >
                  <i
                    className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}
                  ></i>
                </button>
              </div>
            </div>

            {/* Terms and Conditions Checkbox Flag Block */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="agreeToTerms"
                type="checkbox"
                name="agreeToTerms"
                required
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-4 h-4 mt-0.5 rounded border-brand-sand/60 text-brand-rust focus:ring-brand-rust accent-brand-rust cursor-pointer"
              />
              <label
                htmlFor="agreeToTerms"
                className="text-xs font-medium text-brand-slate leading-relaxed cursor-pointer select-none"
              >
                I authorize registration terms and certify agreements with the{" "}
                <a
                  href="/terms"
                  className="text-brand-dark font-semibold hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-brand-dark font-semibold hover:underline"
                >
                  Privacy Act Policies
                </a>
                .
              </label>
            </div>
            {/* Submission Action Button */}
            <button
              type="submit"
              disabled={isSending || cooldown > 0}
              className="w-full mt-4 bg-brand-dark text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-brand-rust hover:shadow-lg transition-all duration-200 focus:outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              Register
            </button>
          </form>
        </div>
      </div>

      {/* 2. OTP MODAL POPUP */}
      {isOtpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          {/* Modal Container */}
          <div className="bg-white border border-brand-sand rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            {/* Close Button (X) */}
            <button
              type="button"
              onClick={() => setIsOtpOpen(false)}
              className="absolute top-4 right-4 text-brand-slate hover:text-brand-dark text-xl font-bold p-1 rounded-lg transition"
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-brand-rust/10 text-brand-rust rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                🔒
              </div>
              <h2 className="text-2xl font-bold text-brand-dark">Verify OTP</h2>
              <p className="text-sm text-brand-slate mt-1">
                We sent a 6-digit code to your email. Enter it below to complete
                registration.
              </p>
            </div>

            {/* OTP Input Form */}
            <form onSubmit={handleRegister}>
              {/* 6 Digit Input Boxes */}
              <OtpInput value={otp} onChange={setOtp}/>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isRegistering}
                className="w-full bg-brand-dark hover:bg-brand-rust text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
              >
                Verify & Finish Registration
              </button>
            </form>

            {/* Resend Link */}
            <div className="text-center mt-4">
              <p className="text-xs text-brand-slate">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  disabled={isSending || cooldown > 0}
                  onClick={handleResendOTP}
                  className="text-brand-rust font-semibold hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Resend OTP
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default register;