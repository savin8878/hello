import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import db from "./db.js";
import { google } from "googleapis";
import { number } from "zod";

const app = express();
app.use(express.json());
app.use(cors());

const KEYFILEPATH = "./trip-clone-a4a536ed6722.json";
const SPREADSHEET_ID = "1Waph6Dyrgx5mEPQJYVNkzcA9zmyiFs51Z0DDQXj1pE8";
const range = "Page1!A2";

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const dataSchema = mongoose.Schema({
    EntryDateAndTime: {
        type: Date,
        default: Date.now,
    },
    PlanId: String,
    EmployeeId: [String],
    EmployeeName: [String],
    Type: String,
    Department: String,
    SRNumber: Number,
    Data: [
        {
            Date: String,
            Day: Number,
            Country: String,
            State: String,
            City: String,
            ClientName: String,
            Purpose: String,
            Remarks: String,
            isDelete: {
                type: Boolean,
                default: false,
            },
        },
    ],
});

const Data = new mongoose.model("Data", dataSchema);

app.get("/", function (req, res) {
    res.send("Testing!");
});

app.post("/feed", async (req, res) => {
    const { newData, employee, type, department, sno } = req.body;
    const data = new Data({
        PlanId: "PLN-0001",
        EmployeeId: ["300100", "300200", "300300"],
        EmployeeName: ["radhe", "krishna", "akash"],
        Type: type,
        Department: department,
        SRNumber: sno,
        Data: newData,
    });
    try {
        const collection = await db.collection("tripdatabase");
        const result = await collection.insertOne(data);
        res.status(204).send(result);
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
    }
});

async function updateSpreadsheetWithData(dataArray) {
    try {
        await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range,
            valueInputOption: "RAW",
            resource: {
                values: dataArray,
            },
        });

        console.log("Sheet updated with new data.");
    } catch (e) {
        console.error("Error updating spreadsheet:", e);
    }
}

async function sample() {
    try {
        const collection = db.collection("tripdatabase");
        const documents = await collection.find({}).toArray();
        const rows = documents.flatMap(({ EntryDateAndTime, PlanId, EmployeeId, EmployeeName, Type, Department, SRNumber, Data }) =>
            Data.map(({ Date, Day, Country, State, City, ClientName, Purpose, Remarks }) =>
                [EntryDateAndTime, PlanId, 1, EmployeeId.join(', '), EmployeeName.join(', '), Type, Department, SRNumber, Data.length, 1, Date, Day, Country, State, City, ClientName, Purpose, Remarks]
            )
        );
        await updateSpreadsheetWithData(rows);
    } catch (e) {
        console.error("Error fetching data from MongoDB:", e);
    }
}

sample();

app.get('/send-to-sheets', async (req, res) => {
    try {
        const dataFromMongoDB = await Data.find();
        const rows = dataFromMongoDB.map(({ EntryDateAndTime, PlanId, EmployeeId, EmployeeName, Type, Department, SRNumber, Data }) =>
            Data.map(({ Date, Day, Country, State, City, ClientName, Purpose, Remarks }) =>
                [EntryDateAndTime, PlanId, 1, EmployeeId.join(', '), EmployeeName.join(', '), Type, Department, SRNumber, Data.length, 1, Date, Day, Country, State, City, ClientName, Purpose, Remarks]
            )
        );

        await sheets.spreadsheets.values.clear({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A2:R',
        });

        await updateSpreadsheetWithData(rows);

        res.status(200).send('Data sent to Google Sheets successfully');
    } catch (error) {
        console.error('Error sending data to Google Sheets:', error);
        res.status(500).send('An error occurred while sending data to Google Sheets');
    }
});

app.listen(4000, function () {
    console.log("Example app listening on port 4000!");
});
