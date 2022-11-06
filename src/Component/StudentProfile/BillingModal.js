import React from "react";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePublicKey =
  "pk_test_51Lh8cpHW3gXO54jhjpE5rxr12YCUAf0r78aOxktLCs8mZ60wgSFrwqndycCBrlBCUNBJoOg1WykZGCwHB72sm9Qv00CH2OpSz6";
const stripeKey = loadStripe(stripePublicKey);
const BillingModal = ({ setCard, setIsModalOpen }) => {
  // const stripePublic
  return (
    <Elements stripe={stripeKey}>
      <PaymentForm setCard={setCard} setIsModalOpen={setIsModalOpen} />
    </Elements>
  );
};

export default BillingModal;
