const express = require('express');
const {getUserProfile,logout,sendOtpToWhatsapp,verifyOtpAndLoginWithWhatsapp, getAllMobileNumbers,getUserProfileWithRole } = require('../Controller/authController');
const auth = require('../middleware/auth');
const router = express.Router();


//router.post('/google-login', googleLogin);


router.post('/whatsapp-login', sendOtpToWhatsapp);
router.post('/whatsapp-verify-otp', verifyOtpAndLoginWithWhatsapp)
router.post('/logout', auth,logout);



router.get('/profile', auth, getUserProfile);
router.get('/mobile-numbers', getAllMobileNumbers);
router.get('/profile-role',auth,getUserProfileWithRole);

module.exports = router;
