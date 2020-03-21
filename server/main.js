import {Meteor} from 'meteor/meteor';
import StripeNode from 'stripe';
import './stripe-web-hooks';
const stripe = StripeNode("sk_test_L2tZXmDYMpPwrkJgrTncxL51");
const puppeteer = require('puppeteer');

// Meteor.startup(() => {
//   stripe.webhookEndpoints.create({
//     url: "https://f6852716.ngrok.io/webhooks/stripe",
//     enabled_events: ["charge.failed", "charge.succeeded"]
//   }, function(err, webhookEndpoint) {
//     console.log(webhookEndpoint);
//   });
// });


Meteor.methods({
  'getSession'(money) {
    console.log(money);
    // Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys

    return stripe.checkout.sessions.create(
      {
        success_url: "http://localhost:3000/",
        cancel_url: "http://localhost:3000/doom",
        allowed_source_types: ["card"],
        line_items: [{
          amount: money * 100,
          quantity: 1,
          name: "Blue banana",
          currency: "aud"
        }]
      },
      {stripe_version: "2018-11-08; checkout_sessions_beta=v1"},
    );
  },
  async 'pdf-lol'() {
    console.log('pdf ddd');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
    // page.pdf() is currently supported only in headless mode.
    // @see https://bugs.chromium.org/p/chromium/issues/detail?id=753118
    await page.pdf({
      path: 'hn.pdf',
      format: 'letter'
    });

    console.log('done');
    await browser.close();
  }
});
