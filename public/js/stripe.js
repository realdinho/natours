/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe('pk_test_51HSl3gKlSIPP6P5I2pzLYmNI5pNV9WnrdULFhysiGTPioGgG0xBasZujcUSPHS7xiaZNGd1kEU7ahehnR1HLN3Xz00X4A7pGvK');

export const bookTour = async tourId => {
  try {
    // get checkout session from the API
    const session = await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`);

    // create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch(err) {
    showAlert('error', err)
  }
};