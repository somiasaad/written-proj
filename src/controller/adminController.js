const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');


async function loginAdmin(req, res) {
    try {
        username = req.body.username
        password = req.body.password
        // البحث عن المشرف باستخدام اسم المستخدم
        const admin = await Admin.findOne({ username });


        if (!admin) {
            return { success: false, message: 'اسم المستخدم غير صحيح' };

        }

        // التحقق من تطابق كلمة المرور
        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            // إرجاع رسالة خطأ في حالة عدم تطابق كلمة المرور
            return { success: false, message: 'كلمة المرور غير صحيحة' };
        }

        // Create and sign a token
        const token = await jwt.sign({ username: admin.username, userid: admin._id }, 'your-secret-key');
        // إرجاع افتراضي لنجاح عملية تسجيل الدخول
        res.json({ message: 'تم تسجيل الدخول بنجاح', token });
        console.log(admin);
    } catch (error) {
        // إرجاع رسالة خطأ في حالة حدوث خطأ أثناء عملية تسجيل الدخول
        res.json({ success: false, message: 'حدث خطأ أثناء تسجيل الدخول' });
        console.log(error);
    }



}



module.exports = loginAdmin;