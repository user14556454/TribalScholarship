import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RoleSwitcherBanner } from '../../components/layout/RoleSwitcherBanner';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { ROUTES } from '../../config/routes';
import { PERSONAS } from '../../config/personas';
import { Footer } from '../../components/layout/Footer';
import { Shield, Smartphone, ArrowRight, Lock, CheckCircle2, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { switchPersona } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'APPLICANT' | 'OFFICIAL'>('APPLICANT');
  const [mobileOrEmail, setMobileOrEmail] = useState('9835144820');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 400);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);
      await switchPersona('APPLICANT_RAJESH');
      navigate(ROUTES.APPLICANT.DASHBOARD);
    }, 400);
  };

  const handleOfficialLogin = async (personaKey: string) => {
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);
      await switchPersona(personaKey);
      navigate(ROUTES.ADMIN.DASHBOARD);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <RoleSwitcherBanner />

      {/* Login Header */}
      <header className="bg-white border-b border-[#E2E8F0] py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to={ROUTES.PUBLIC.LANDING} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#0A2540] text-white flex items-center justify-center font-bold text-xs">
              TO
            </div>
            <div>
              <span className="font-bold text-[#0F172A] text-sm block">TribalOne · MoTA Scholar Portal</span>
              <span className="text-[10px] text-[#64748B]">Ministry of Tribal Affairs, Govt. of India</span>
            </div>
          </Link>

          <Link to={ROUTES.PUBLIC.LANDING} className="text-xs text-[#0284C7] font-semibold hover:underline">
            ← Back to Public Portal
          </Link>
        </div>
      </header>

      {/* Main Form Center */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md">
          {/* Identity Box */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#0A2540] text-white flex items-center justify-center mx-auto mb-3 shadow-xs">
              <Shield className="w-6 h-6 text-sky-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A]">MoTA Scholar Portal Login</h2>
            <p className="text-xs text-[#64748B] mt-1">
              Secure single sign-on for Scheduled Tribe scholars and Ministry officials
            </p>
          </div>

          <Card className="p-6">
            {/* Role Tabs */}
            <div className="flex border-b border-[#E2E8F0] mb-6">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('APPLICANT');
                  setOtpSent(false);
                }}
                className={`flex-1 pb-3 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'APPLICANT'
                    ? 'border-[#0284C7] text-[#0284C7]'
                    : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Applicant / Scholar
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('OFFICIAL')}
                className={`flex-1 pb-3 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'OFFICIAL'
                    ? 'border-[#0284C7] text-[#0284C7]'
                    : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Ministry Official
              </button>
            </div>

            {/* Applicant Login Tab */}
            {activeTab === 'APPLICANT' && (
              <div>
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#0F172A]">
                        Registered Mobile Number or Email
                      </label>
                      <div className="relative">
                        <Smartphone className="w-4 h-4 absolute left-3 top-3 text-[#94A3B8]" />
                        <input
                          type="text"
                          value={mobileOrEmail}
                          onChange={(e) => setMobileOrEmail(e.target.value)}
                          placeholder="Enter 10-digit mobile number"
                          className="h-10 pl-9 pr-3 bg-white text-sm border border-[#CBD5E1] rounded w-full outline-none focus:ring-2 focus:ring-[#0284C7]"
                          required
                        />
                      </div>
                      <p className="text-[11px] text-[#64748B]">An OTP will be dispatched to your registered handset.</p>
                    </div>

                    <Button variant="primary" type="submit" isLoading={isLoading} className="w-full">
                      Generate OTP
                    </Button>

                    <div className="pt-4 border-t border-[#F1F5F9] text-center">
                      <p className="text-xs text-[#64748B] mb-2 font-medium">Or log in directly with test scholar profile:</p>
                      <button
                        type="button"
                        onClick={() => {
                          switchPersona('APPLICANT_RAJESH');
                          navigate(ROUTES.APPLICANT.DASHBOARD);
                        }}
                        className="w-full text-xs font-semibold text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD] hover:bg-[#E0F2FE] py-2 px-3 rounded transition-colors flex items-center justify-center gap-1.5"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>Rajesh Kumar Soren (PVTG ST Scholar · NFST)</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded text-xs text-[#065F46] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>OTP sent to <strong>+91 {mobileOrEmail}</strong> (Demo code: 123456)</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#0F172A]">Enter 6-Digit One Time Password</label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="h-10 px-3 bg-white text-center tracking-widest font-mono text-base font-bold border border-[#CBD5E1] rounded w-full outline-none focus:ring-2 focus:ring-[#0284C7]"
                        maxLength={6}
                        required
                      />
                    </div>

                    <Button variant="primary" type="submit" isLoading={isLoading} className="w-full">
                      Verify OTP & Access Portal
                    </Button>

                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-xs text-[#64748B] hover:text-[#0F172A] w-full text-center block"
                    >
                      Change Mobile Number
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Ministry Official Login Tab */}
            {activeTab === 'OFFICIAL' && (
              <div className="space-y-4">
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-xs text-[#475569]">
                  <p className="font-semibold text-[#0F172A] mb-1">Official MoTA Authentication</p>
                  <p>Ministry scrutiny officers, nodal verifiers, and administrators access this portal via Parichay/NIC Gov SSO.</p>
                </div>

                <div className="space-y-2.5">
                  <Button
                    variant="primary"
                    className="w-full bg-[#0A2540] hover:bg-[#143258]"
                    onClick={() => handleOfficialLogin('ADMIN_OFFICER')}
                    isLoading={isLoading}
                    leftIcon={<Lock className="w-4 h-4" />}
                  >
                    Log In as Dr. V. K. Sharma (Scrutiny Director)
                  </Button>
                </div>
              </div>
            )}
          </Card>

          <p className="text-center text-[11px] text-[#94A3B8] mt-6">
            Protected by NIC Gov Cloud Security Protocol · Ministry of Tribal Affairs
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};
