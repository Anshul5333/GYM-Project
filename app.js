import express from "express";
import { config } from "dotenv";
import cors from "cors";
const app = express();
const router = express.Router();
import {sendEmail} from './utils/sendEmail.js'

config({ path: "./config.env" });

app.use(
  cors({
    origin: [process.env.FRONTED_URL],
    methods: ["PORT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.post("/send/mail", async (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return next(
      res.status(404).json({
        success: false,
        message: "Please Provide All Details",
      })
    );
  }
  try {
    await sendEmail({
        email:"anshulchouhan625@gmail.com",
        subject:"GYM WEBSITE CONTACT",
        message,
        userEmail:email,
    })
    res.status(200).json({
        success:true,
        message:"Message Sent Successfully....."
    })
  } catch (error) {
    res.status(500).json({
        success:false,
        message:"Internal Server Error.....",
    })
  }
});

app.use(router);
app.listen(process.env.PORT, () => {
  console.log(`server listening at port ${process.env.PORT}`);
});
