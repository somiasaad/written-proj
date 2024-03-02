const express = require('express');
// require("dotenv").config();
require("dotenv").config()
const dbConnection = require("./config/dbConnection")
const postRouter = require('./routes/postRouter');
const adminRoutes = require('./routes/adminRoute');
const port = process.env.PORT || 8080;


const app = express();
app.use(express.json());
app.use('/', postRouter);
app.use('/admin', adminRoutes);





dbConnection();


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});