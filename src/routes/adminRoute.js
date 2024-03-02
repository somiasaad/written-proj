const express = require('express');
const router = express.Router();
// const { loginAdmin } = require('../controller/adminController');
const loginAdmin = require('../controller/adminController');
const AdminModel = require('../models/adminModel')
const bcrypt = require('bcryptjs');


router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await AdminModel.findOne({ username });

        if (user) {
            return res.status(400).json({ message: "user have an acount   " });
        }
        const saltRounds = await bcrypt.genSalt(8);
        const hashdPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new AdminModel({ ...req.body, password: hashdPassword });

        await newUser.save();
        res.status(200).json({ message: "done" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
)
router.post('/login', loginAdmin)


// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     const result = await loginAdmin(username, password);
//     console.log(result);
//     if (result.success) {
//         res.json({ success: true, message: 'تم تسجيل الدخول بنجاح' });
//     } else {
//         res.status(401).json({ success: false, message: 'فشل تسجيل الدخول' });
//     }

// });


// Login function
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     // Check if user exists
//     const user = await AdminModel.find({ username });
//     if (!user) {
//         return res.send('Invalid username or password');
//     }

//     // Compare passwords
//     await bcrypt.compare(password, user.password, (err, isMatch) => {
//         if (err) {
//             console.log(err);
//             return res.send('An error occurred');
//         }
//         if (!isMatch) {
//             return res.send('Invalid username or password');
//         }
//         // Create and sign a token
//         const token = jwt.sign({ username: AdminModel.username }, 'your-secret-key');

//         res.json({ token });
//     });
// })

module.exports = router;