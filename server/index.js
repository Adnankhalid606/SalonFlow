import app from "./src/app.js";
import config from "./config/config.js";
import connectDb from "./config/db.js";
const PORT = config.PORT;

connectDb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});