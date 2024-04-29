const bcrypt = require('bcrypt');
const {google} = require('googleapis');
const userModel=require('../model/userModel')
require('dotenv').config();

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'No user found with this email' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return res.json({ message: 'Success' });
    } else {
      return res.status(401).json({ error: 'Incorrect password' });
    }
  } catch (error) {
    console.log('Login error:', error);
    next(error);
  }
};
exports.register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await userModel.create({ email, password: hashedPassword });
    const body = req.body;
    console.log( process.env.GOOGLE_CLIENT_EMAIL,process.env.GOOGLE_PRIVATE_KEY);
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email:process.env.GOOGLE_CLIENT_EMAIL,
        private_key:process.env.GOOGLE_PRIVATE_KEY?.replace(
          /\\n/g,
          '\n'
        ),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });
    console.log("i ma not reaching to this point");

    const sheets = google.sheets({
      auth,
      version: 'v4',
    })
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId:'1Pg6itZDpF5i9egvY3WEibWsSz0drQSu0amkmNXGdB8g',
      range:'A1:D1',
      valueInputOption:'USER_ENTERED',
      requestBody: {
        values: [[body.name, body.email, body.password]],
      },
    });
    return res.status(200).json({
      data: response.data,
    });
  } catch (error) {
    console.log('Registration error:', error);
    next(error);
  }
};
