const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
const eventRoutes = require('./routes/eventRoutes');
const LoginRoutes = require('./routes/loginRoutes')
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use('/auth',LoginRoutes);
// app.use(eventRoutes());
eventRoutes(app);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`)
    })
})
.catch(error => console.log("mongoDb error", error));


