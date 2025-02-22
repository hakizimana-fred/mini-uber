import Stripe from 'stripe';

const stripe = new Stripe('');

type PaymentInput = {
  amount: number;
  currency: string;
  paymentMethodId: string;
};

type PaymentResponse = {
  success: boolean;
  message: string;
  transactionId: string;
};

export const resolvers = {
  Query: {
    hello: () => 'world',
  },

  Mutation: {
    processPayment: async (
      _: any,
      { input }: { input: PaymentInput }
    ): Promise<PaymentResponse> => {
      const { amount, currency, paymentMethodId } = input;

      console.log(amount, currency, paymentMethodId);

      try {
        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100),
          currency,
          payment_method: 'pm_card_visa',
          confirm: true,
          automatic_payment_methods: {
            enabled: true,
            allow_redirects: 'never',
          },
        });

        if (paymentIntent.status === 'succeeded') {
          return {
            success: true,
            message: 'Payment successful!',
            transactionId: paymentIntent.id,
          };
        } else {
          return {
            success: false,
            message: 'Payment failed!',
            transactionId: paymentIntent.id,
          };
        }
      } catch (error: any) {
        console.error('Payment Error:', error);
        return {
          success: false,
          message: error.message,
          transactionId: '',
        };
      }
    },
  },
};
