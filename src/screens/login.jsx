import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState('select'); // default to email OTP
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(50);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [loading1, setLoading1] = useState(false);
const [otpSent, setOtpSent] = useState(false);
const [resendDisabled, setResendDisabled] = useState(false);
  const navigate = useNavigate();

  const resetStates = () => {
    setError('');
    setMessage('');
    setPassword('');
    setOtp('');
    setPhoneNumber('');
    setStep('select');
    setSecondsLeft(30);
    setResendEnabled(false);
  };

  useEffect(() => {
  let timer;
  if (otpSent && secondsLeft > 0 && resendDisabled) {
    timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false); // Enable button
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }
  return () => clearInterval(timer);
}, [otpSent, secondsLeft, resendDisabled]);

 

 

  

 const handleWhatsappOtp = async (e) => {
  // e.preventDefault(); // Uncomment this if you're using a form submission
  setError('');
  setMessage('');

  if (!phoneNumber) {
    setError('Please enter your phone number before proceeding.');
    return;
  }
  
 
  let mobile_number = phoneNumber;

  try {
   

    
   if (!otpSent || resendOtp) {
    setMessage('Sending OTP....');
  await axios.post(
    'http://localhost:5000/api/user/whatsapp-login', // Endpoint to send OTP
    { mobile_number },
    { withCredentials: true }
  );

  setStep('whatsappOtp');
  setOtpSent(true); 
  setResendEnabled(false);
  setMessage('OTP sent to your WhatsApp.');
}
else {
      // If OTP is already sent, proceed to verify OTP
       setLoading(true);
      await axios.post(
        'http://localhost:3000/api/user/whatsapp-verify-otp',  // Endpoint to verify OTP
        { mobile_number, otp },
        { withCredentials: true }
      );

      setLoading(false);
      
      setMessage('Logged in successfully!');
      navigate('/Dashboard');
    }
  } catch (err) {
    setMessage('');
    setError(err.response?.data?.message || 'Something went wrong.');
    setLoading(false);
  }
};

  

// Handle sending OTP
const handleSendWhatsappOtp = () => {
 
  const trimmedPhone = phoneNumber.trim();

  // Validate: not empty and must be 10 digits
  if (!/^\d{10}$/.test(trimmedPhone)) {
    setError('Please enter a valid 10-digit WhatsApp number.');
    return;
  }
handleWhatsappOtp();
  // Proceed if valid
  setOtpSent(true);
  // ...send OTP logic here
  startResendTimer(); // Start timer for Resend OTP button cooldown
};
const handleBackToWhatsappStart = () => {
  setOtpSent(false);       // so that Send OTP button appears again
  setOtp('');              // clear any typed OTP
  setResendDisabled(false);
  setLoading(false);
  // phoneNumber remains as-is so user can edit or re-enter it
};


// Handle verifying OTP
const handleVerifyWhatsappOtp = (e) => {
  e.preventDefault();
  handleWhatsappOtp();
  
  // Example API call to verify OTP can be placed here
};
let resendOtp =false;
// Handle OTP resend logic
const handleResendOtp = () => {
  // Add the logic to resend OTP (you can call an API here)
  //setOtpSent(false);
resendOtp=true;
  handleWhatsappOtp();
  resendOtp=false;
  startResendTimer(); // Reset the resend timer
};

// Timer for OTP resend
const startResendTimer = () => {
  setResendDisabled(true);
  setSecondsLeft(30); // Start countdown from 30 seconds
};




  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />

      <div className="flex flex-col lg:flex-row">
        {/* LEFT SECTION */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-blue-200 w-1/2 px-10">
          <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center leading-snug">
            Welcome to <br /> Kisan Saathi
          </h1>

          <img
            src="https://res.cloudinary.com/dunsl7vvf/image/upload/v1746554424/WhatsApp_Image_2025-05-06_at_23.27.24_44d5ba8c_xqvjzz.jpg"
            alt="Banner"
            className="rounded-2xl shadow-xl w-full max-w-md"
          />
        </div>

        {/* RIGHT LOGIN BOX */}
        <div className="flex-1 flex items-center justify-center p-6 mt-7">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-800">
              Login / Sign Up
            </h2>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {message && <p className="text-green-600 text-center">{message}</p>}

            {/* ============================
               STEP 1 → Select Login Method
               ============================ */}
            {step === "select" && (
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setError(null);
                    setStep("whatsappOtp");
                  }}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 text-black bg-white border border-gray-800 rounded-lg hover:bg-gray-100 transition focus:ring-2 focus:ring-green-500"
                >
                  <img
                    src="https://res.cloudinary.com/dunsl7vvf/image/upload/v1746999003/whatsapp_yvxwny.png"
                    alt="WhatsApp OTP"
                    className="h-5 w-5"
                  />
                  <span className="font-medium">Continue with WhatsApp OTP</span>
                </button>
              </div>
            )}

            {/* ============================
               STEP 2 → WhatsApp OTP
               ============================ */}
            {step === "whatsappOtp" && (
              <div className="space-y-4">
                <p className="text-sm font-semibold text-black">WhatsApp Number</p>

                {/* PHONE NUMBER INPUT */}
                <input
                  type="text"
                  placeholder="Enter 10 digit WhatsApp number"
                  value={phoneNumber}
                  readOnly={otpSent}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                    otpSent ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />

                {!otpSent && (
                  <button
                    onClick={handleSendWhatsappOtp}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition"
                  >
                    Send OTP
                  </button>
                )}

                {/* OTP STEP */}
                {otpSent && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <button
                      onClick={handleVerifyWhatsappOtp}
                      className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg hover:from-green-600 hover:to-green-800 transition"
                    >
                      {loading ? "Verifying..." : "Verify OTP"}
                    </button>

                    <p className="text-sm text-center text-gray-700">
                      <button
                        disabled={resendDisabled}
                        onClick={handleResendOtp}
                        className={`${
                          resendDisabled ? "text-gray-400" : "text-blue-600"
                        }`}
                      >
                        {resendDisabled
                          ? `Resend OTP in ${secondsLeft}s`
                          : "Resend OTP"}
                      </button>
                    </p>

                    <p className="text-sm text-center">
                      <button
                        className="text-red-500 hover:underline"
                        onClick={handleBackToWhatsappStart}
                      >
                        ← Back to Enter Number
                      </button>
                    </p>
                  </div>
                )}

                {!otpSent && (
                  <p className="text-sm text-center">
                    <button
                      className="text-red-500 hover:underline"
                      onClick={resetStates}
                    >
                      ← Back to login methods
                    </button>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================================
           MESSAGE BELOW LOGIN CARD
         ================================ */}
      <div className="w-full text-center mt-2 mb-6">
        <p className="text-gray-700 text-sm font-medium">
          Please login first to continue
        </p>
      </div>
    </div>
  );
};

export default Login;
