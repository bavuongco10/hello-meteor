import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import denodeify from 'denodeify';
import { Meteor } from 'meteor/meteor';

const stripe = window.Stripe('pk_test_E85PAjWMnXVNyZMRU0jIsbSe', {betas: ['checkout_beta_4']});

import './main.html';

const callPromise = denodeify(Meteor.call);

window.callPromise = callPromise;

(function(){
  var foo = 3;
  console.log(foo)
})();


Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click .btn-me'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
  async 'click .btn-pls'(event, instance) {
    const money = parseInt(document.getElementsByClassName('money')[0].value);
    const { id } = await callPromise('getSession', money);
    const res = stripe.redirectToCheckout({sessionId: id});
    console.log(res)
  },
  'click .pdf'() {
    console.log('clicked me');
    Meteor.call('pdf-lol')
  }
});

window.fcWidget.init({
  token: "82963f67-ef88-435e-927c-92e6944c457d",
  host: "https://wchat.freshchat.com",
  siteId: "local"
});

(() => {
  if (!('serviceWorker' in navigator)) {
    // Service Workers are not supported. Return
    return
  }

  if (!('PushManager' in window)) {
    // The Push API is not supported. Return
    return
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registration completed with scope: ',
          registration.scope)
      }, (err) => {
        console.log('Service Worker registration failed', err)
      })
  })
})();

Kadira.connect('vvjZXY9eRwyMgjhz8', '9e493e15-bebd-4ea5-b92b-b6783ee0d300');
