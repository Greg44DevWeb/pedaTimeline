const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();

//** SERVER CONFIGURATION */
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const cors = require("cors");
const morgan = require("morgan");

const helmet = require("helmet");

//* ROUTES */
const authRoutes = require("./routes/authRoutes");
const classRoomRoutes = require("./routes/classRoomsRoutes");
const modulesRoutes = require("./routes/modulesRoutes");

//** DATABASE CONNECTION */
dbConnect();
app.use(cookieParser());
app.use(morgan("combined"));
app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//**MAIN ROUTES */
app.use("/api/user", authRoutes);
app.use("/api/classroom", classRoomRoutes);
app.use("/api/module", modulesRoutes);

//** ERROR HANDLER */
app.use(notFound);
app.use(errorHandler);

//** SERVER PORT CONFIGURATION */
app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
