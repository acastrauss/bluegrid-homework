import express from 'express';

// required for loading local .env file
import 'dotenv/config';

import filesRoutes from './routes/filesRoutes';

const app = express();
app.use('/api', filesRoutes);
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});