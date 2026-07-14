import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose }) {
  const {
    currentUser,
    userProfile,
    signInWithGoogle,
    signInWithApple,
    loginWithEmail,
    registerWithEmail,
    sendResetLink,
    sendVerificationEmail,
    sendOtpCode,
    updateProfileData,
    changeUserPassword,
    logout,
    initRecaptcha
  } = useAuth();

  const [activeTab, setActiveTab] = useState('signin-tab');

  // Input states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [loginPhone, setLoginPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [sendingOtp, setSendingOtp] = useState(false);

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [forgotEmail, setForgotEmail] = useState('');

  // Profile management states
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profileDob, setProfileDob] = useState('');
  const [profileCity, setProfileCity] = useState('');
  
  const [profileNewPassword, setProfileNewPassword] = useState('');
  const [profileConfirmPassword, setProfileConfirmPassword] = useState('');

  const recaptchaRef = useRef(null);

  // Sync profile fields when currentUser or userProfile loads
  useEffect(() => {
    if (currentUser) {
      setProfileName(userProfile.name || currentUser.displayName || '');
      setProfileEmail(userProfile.email || currentUser.email || '');
      setProfileDob(userProfile.date_of_birth ? userProfile.date_of_birth.split('T')[0] : '');
      setProfileCity(userProfile.city || '');
    }
  }, [currentUser, userProfile]);

  // Recaptcha init for Phone OTP
  useEffect(() => {
    if (isOpen && !currentUser && recaptchaRef.current) {
      initRecaptcha('recaptcha-container-react');
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  // Sign In / Register Actions
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(loginEmail, loginPassword);
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmail(registerName, registerEmail, registerPassword);
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendResetLink(forgotEmail);
      alert('Password reset link sent to your email.');
      setActiveTab('signin-tab');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Phone OTP Flow
  const handleSendOtp = async (e) => {
    e.preventDefault();
    const phoneNum = loginPhone.trim();
    if (!phoneNum.startsWith('+')) {
      alert('Please enter your phone number with country code (e.g. +91xxxxxxxxxx)');
      return;
    }
    setSendingOtp(true);
    try {
      const verifier = initRecaptcha('recaptcha-container-react');
      const confirmation = await sendOtpCode(phoneNum, verifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!confirmationResult) return;
    try {
      await confirmationResult.confirm(otpCode.trim());
      onClose();
    } catch (err) {
      console.error(err);
      alert('Invalid OTP code. Please try again.');
    }
  };

  // Social Login Actions
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleAppleLogin = async () => {
    try {
      await signInWithApple();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Profile Save Actions
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfileData({
        name: profileName,
        email: profileEmail,
        date_of_birth: profileDob,
        city: profileCity
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (profileNewPassword !== profileConfirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    try {
      await changeUserPassword(profileNewPassword);
      alert('Password updated successfully!');
      setProfileNewPassword('');
      setProfileConfirmPassword('');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleSendVerifyEmail = async () => {
    try {
      await sendVerificationEmail();
      alert('Verification email has been sent! Please check your inbox.');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="close-modal-btn" onClick={onClose}>&times;</button>
        
        {/* Auth Tabs Header (hidden when logged in) */}
        {!currentUser && (
          <div className="login-tabs">
            <button 
              type="button" 
              className={`tab-btn ${activeTab === 'signin-tab' ? 'active' : ''}`}
              onClick={() => setActiveTab('signin-tab')}
            >
              Sign In
            </button>
            <button 
              type="button" 
              className={`tab-btn ${activeTab === 'register-tab' ? 'active' : ''}`}
              onClick={() => setActiveTab('register-tab')}
            >
              Register
            </button>
            <button 
              type="button" 
              className={`tab-btn ${activeTab === 'forgot-tab' ? 'active' : ''}`}
              onClick={() => setActiveTab('forgot-tab')}
            >
              Reset
            </button>
          </div>
        )}

        {/* LOGGED OUT STATE */}
        {!currentUser && (
          <>
            {/* Sign In Tab */}
            {activeTab === 'signin-tab' && (
              <div className="tab-content active">
                <h3 className="modal-title">Welcome Back</h3>
                <div className="social-login-group">
                  <button type="button" onClick={handleGoogleLogin} className="btn-social google-btn">
                    <svg viewBox="0 0 24 24" className="social-icon"><path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.57 14.99 1 12 1 7.35 1 3.39 3.67 1.41 7.56l3.85 2.99c.92-2.76 3.51-4.51 6.74-4.51z"/><path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.46c-.28 1.47-1.11 2.71-2.35 3.54l3.65 2.83c2.14-1.98 3.73-4.89 3.73-8.47z"/><path fill="#FBBC05" d="M5.26 14.45c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.41 7.56C.51 9.35 0 11.35 0 13.5s.51 4.15 1.41 5.94l3.85-2.99z"/><path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.65-2.83c-1.01.68-2.3 1.08-3.79 1.08-3.23 0-5.82-1.75-6.74-4.51l-3.85 2.99C3.39 20.33 7.35 23 12 23z"/></svg>
                    Google
                  </button>
                  <button type="button" onClick={handleAppleLogin} className="btn-social apple-btn">
                    <svg viewBox="0 0 24 24" class="social-icon"><path fill="#fff" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.09 2.48-1.36.03-1.8-.79-3.36-.79-1.56 0-2.04.77-3.36.82-1.38.05-2.38-1.33-3.22-2.53C4.05 17.02 2.8 12.39 4.49 9.47c.84-1.45 2.34-2.37 3.97-2.4 1.24-.02 2.4.84 3.16.84s2.16-1.04 3.64-.89c.62.03 2.36.25 3.48 1.88-1 .61-1.63 1.62-1.61 2.86.03 1.5 1.25 2.22 1.28 2.25-.03.07-.2 1.1-.94 2.15zM15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.62.71-1.16 1.85-1.01 2.96 1.11.09 2.27-.58 2.96-1.41z"/></svg>
                    Apple
                  </button>
                </div>
                
                <div className="modal-divider"><span>or with Email</span></div>
                <form onSubmit={handleEmailLogin} className="modal-form">
                  <input type="email" placeholder="Email Address" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                  <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                  <button type="submit" className="btn-gold">Sign In</button>
                </form>
                
                <div className="modal-divider"><span>or with Mobile OTP</span></div>
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="modal-form">
                    <input type="tel" placeholder="+91 xxxxx xxxxx" value={loginPhone} onChange={(e) => setLoginPhone(e.target.value)} required />
                    <div id="recaptcha-container-react"></div>
                    <button type="submit" className="btn-gold" disabled={sendingOtp}>
                      {sendingOtp ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="modal-form" style={{ marginTop: '14px' }}>
                    <input type="text" placeholder="Enter 6-Digit OTP" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} required />
                    <button type="submit" className="btn-gold">Verify OTP</button>
                  </form>
                )}
              </div>
            )}

            {/* Register Tab */}
            {activeTab === 'register-tab' && (
              <div className="tab-content active">
                <h3 className="modal-title">Create Account</h3>
                <form onSubmit={handleEmailRegister} className="modal-form">
                  <input type="text" placeholder="Full Name" value={registerName} onChange={(e) => setRegisterName(e.target.value)} required />
                  <input type="email" placeholder="Email Address" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                  <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
                  <button type="submit" className="btn-gold">Register</button>
                </form>
              </div>
            )}

            {/* Reset Password Tab */}
            {activeTab === 'forgot-tab' && (
              <div className="tab-content active">
                <h3 className="modal-title">Reset Password</h3>
                <p className="modal-subtitle">Enter your email address to receive a password reset link.</p>
                <form onSubmit={handlePasswordReset} className="modal-form">
                  <input type="email" placeholder="Email Address" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} required />
                  <button type="submit" className="btn-gold">Send Reset Link</button>
                </form>
              </div>
            )}
          </>
        )}

        {/* LOGGED IN PROFILE VIEW */}
        {currentUser && (
          <div className="tab-content active">
            <h3 className="modal-title">Manage Profile</h3>
            
            {/* Email Verification Banner */}
            {currentUser.email && !currentUser.emailVerified && (
              <div className="user-profile-status" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Email Not Verified</span>
                  <button 
                    type="button" 
                    onClick={handleSendVerifyEmail}
                    style={{ fontSize: '12px', background: 'none', border: 'none', color: '#f7b731', fontWeight: '700', textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    Verify Now
                  </button>
                </div>
              </div>
            )}

            {/* Edit Profile Form */}
            <form onSubmit={handleSaveProfile} className="modal-form">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginLeft: '4px', textAlign: 'left' }}>Full Name</label>
                <input type="text" placeholder="Full Name" value={profileName} onChange={(e) => setProfileName(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginLeft: '4px', textAlign: 'left' }}>Email Address</label>
                <input type="email" placeholder="Email Address" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginLeft: '4px', textAlign: 'left' }}>Date of Birth</label>
                <input type="date" value={profileDob} onChange={(e) => setProfileDob(e.target.value)} style={{ colorScheme: 'dark' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginLeft: '4px', textAlign: 'left' }}>City</label>
                <input type="text" placeholder="City" value={profileCity} onChange={(e) => setProfileCity(e.target.value)} />
              </div>
              <button type="submit" className="btn-gold" style={{ marginTop: '8px' }}>Save Profile</button>
            </form>

            <div className="modal-divider"><span>Change Password</span></div>

            {/* Password Reset Form */}
            <form onSubmit={handlePasswordUpdate} className="modal-form">
              <input type="password" placeholder="New Password" value={profileNewPassword} onChange={(e) => setProfileNewPassword(e.target.value)} required minLength={6} />
              <input type="password" placeholder="Confirm New Password" value={profileConfirmPassword} onChange={(e) => setProfileConfirmPassword(e.target.value)} required minLength={6} />
              <button type="submit" className="btn-gold">Update Password</button>
            </form>

            <button 
              type="button" 
              onClick={async () => {
                await logout();
                onClose();
              }} 
              className="btn-social" 
              style={{ width: '100%', marginTop: '24px', borderColor: 'rgba(239, 87, 119, 0.4)', background: 'rgba(239, 87, 119, 0.08)', color: '#ef5777', fontWeight: '700', cursor: 'pointer' }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
