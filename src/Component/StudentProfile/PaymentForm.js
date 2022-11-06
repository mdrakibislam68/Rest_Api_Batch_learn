import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import GlobalProvider from "../../Context/Index";

const PaymentForm = ({ setCard, setIsModalOpen }) => {
  const { baseurl } = GlobalProvider();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (elements == null) {
    //   return;
    // }
    const cardElement = elements.getElement(CardElement);
    if (!stripe || !elements) {
      return;
    }

    // const { error, token } = await stripe.createToken(
    //   elements.getElement(CardElement)
    // );
    const { token, error } = await stripe.createToken(cardElement);
    !error && setLoading(true);
    !error &&
      baseurl
        .post("billing/payment-methods/", {
          stripe_token: token.id,
        })
        .then((res) => {
          console.log(res);
          setCard(res.data);
          setIsModalOpen(false);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="border border-[#eff2f8] p-3 rounded bg-white transition-all mb-7" />
      <button
        type="submit"
        className="py-4 w-full rounded-lg bg-[#1890ff] text-base font-bold text-white hover:bg-opacity-80"
      >
        Submit
      </button>
    </form>
  );
};

export default PaymentForm;
