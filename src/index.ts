import axios from 'axios';
import express from 'express';

// required for loading local .env file
import 'dotenv/config';

const app = express();
const port = 3000;
const FILES_API = process.env.FILES_API;

if(!FILES_API){
    throw new Error("API is not defined. Please add it as env var and restart");
}

app.get('/api/files', async (req, res) => {
    try {
        const res1 = await axios.get(FILES_API);
        res.send(res1.data);
    } catch (error) {
        throw new Error("Failed to get data from an API");
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});