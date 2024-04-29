import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

type SheetForm = {
    name: string;
    email: string;
    password: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        return handleGETRequest(req, res);
    } else if (req.method === 'POST') {
        return handlePOSTRequest(req, res);
    } else {
        return res.status(405).send({ message: 'Method Not Allowed' });
    }
}
async function handleGETRequest(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(
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
        const sheets = google.sheets({
            auth,
            version: 'v4',
        });
        const gdata = {
            spreadsheetId: '1Pg6itZDpF5i9egvY3WEibWsSz0drQSu0amkmNXGdB8g',
            range: 'A:z',
        }
        let data = await sheets.spreadsheets.values.get(gdata);
        const values = data.data.values;
        return res.status(200).json({ data: values });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
async function handlePOSTRequest(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const body = req.body as SheetForm;

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(
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
        const sheets = google.sheets({
            auth,
            version: 'v4',
        });
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: '1Pg6itZDpF5i9egvY3WEibWsSz0drQSu0amkmNXGdB8g',
            range: 'A1:D1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[body.name, body.email, body.password]],
            },
        });
        return res.status(200).json({
            data: response.data,
        });
    } catch (e: any) {
        const statusCode = e.code >= 100 && e.code < 600 ? e.code : 500;
        return res.status(statusCode).send({ message: e.message });
    }
}
