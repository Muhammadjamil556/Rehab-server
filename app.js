const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { UserRouter } = require("./routes/user-routes");
const { MedicineRoute } = require("./routes/medicine-routes");
const { ExerciseRoute } = require("./routes/exercise-routes");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1", UserRouter, MedicineRoute, ExerciseRoute);

// Default route
app.get("/", (req, res) => {
  return res.status(200).send({ message: "Great API working" });
});

app.post("/api/create-payment-intent", async (req, res) => {
  const { amount } = req.body; // Amount will come from frontend (in cents)

  // Log the incoming request amount
  console.log(`💸 Received payment request for amount: ${amount} cents`);

  try {
    // Create a PaymentIntent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    // Log successful PaymentIntent creation and client secret
    console.log(
      `✅ PaymentIntent created successfully! Client Secret: ${paymentIntent.client_secret}`
    );

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    // Log error details if PaymentIntent creation fails
    console.error("❌ Error creating PaymentIntent:", error.message);

    res.status(500).send({ error: "PaymentIntent creation failed" });
  }
});

// Catch-all route for 404 errors
app.all("*", (req, res) => {
  return res
    .status(404)
    .send({ message: req.originalUrl + " route not found" });
});

module.exports = { app, server };
