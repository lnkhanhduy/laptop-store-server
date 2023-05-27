require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./db/ConnectDB');
const accountRouter = require('./routes/Account');
const productRouter = require('./routes/Product');
const cartRouter = require('./routes/Cart');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/account', accountRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server run on localhost:${process.env.PORT}`);
});
