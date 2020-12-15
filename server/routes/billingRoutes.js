const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripSecretKey);

module.exports = app => {
  app.post("/api/stripe", async (req, res) => {
    if (!req.user) {
      return res.status(401).send({
        error: "You must log in!"
      });
    }
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id
    });
    req.user.credits += charge.amount / 100;
    const user = await req.user.save();
    
    res.send(user);
  });
};
