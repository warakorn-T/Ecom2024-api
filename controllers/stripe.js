const prisma = require("../config/prisma");
const stripe = require("stripe")(
  "sk_test_51QT1yIL1awPpZNMvUzb0cRIWGSebtrn7y9WwYZm9EN01m8sXF6llS6hrAoBvVykuaCJDwE4LoZ5eHwWFN3piOGj200Zjv9heqP"
);

exports.payment = async (req, res) => {
  try {
    console.log(req.user.id);
    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: req.user.id,
      },
    });
    const amountTHB = cart.cartTotal * 100;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountTHB,
      currency: "thb",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
