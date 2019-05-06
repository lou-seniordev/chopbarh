import React, { useState } from "react";
import { useFormState } from "react-use-form-state";
import { Modal, ModalBody, Spinner } from "reactstrap";
import { Form, FormItem, HalfColumn } from "../../../styles/CardCharge";

export default function Card() {
  const [loading, setLoading] = useState(false);
  const [formErrorModal, setFormErrorModal] = useState(false);
  const [formState, { text, email, number, password }] = useFormState();

  const formErrorModalToggle = () => {
    setFormErrorModal(!formErrorModal);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);

    if (Object.keys(formState.errors).length > 0) {
      setFormErrorModal(true);
      return;
    }

    const cardExpirationData = formState.values.card_expiry.split("/");

    const postData = {
      email: formState.values.email,
      amount: formState.values.amount,
      card: {
        number: formState.values.card_number,
        cvv: formState.values.cvv,
        expiry_month: cardExpirationData[0],
        expiry_year: cardExpirationData[1]
      },
      pin: formState.values.pin
    };

    console.log(postData);
    fetch("https://api.paystack.co/charge", {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer sk_test_c644c86e3b42191b981bbc1c263f98c7020c9841`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Modal
        isOpen={formErrorModal}
        toggle={formErrorModalToggle}
        className="pt-5 mt-4"
      >
        <ModalBody className="text-center">
          <h2>Ooops!</h2>
          <p>Something went wrong. Please try again</p>
        </ModalBody>
      </Modal>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          className="mt-5"
        >
          <Spinner />
        </div>
      ) : (
        <>
          <FormItem>
            <label>Email</label>
            <input
              {...email({
                name: "email"
              })}
              required
              placeholder="johndoe@gmail.com"
            />
          </FormItem>
          <FormItem>
            <label>Amount</label>
            <input
              {...text({
                name: "amount",
                validate: (values) => {
                  if (!isNaN !== true) {
                    return 'Must be a number'
                  }
                }
              })}
              required
              placeholder="100"
            />
          </FormItem>
          <HalfColumn>
            <FormItem className="mr-3">
              <label>Card Number</label>
              <input
                {...text({
                  name: "card_number",
                  validate: (values) => {
                  if (!isNaN !== true) {
                    return 'Must be a number'
                  }
                }
                })}
                required
                placeholder="5078982018301145"
              />
            </FormItem>
            <FormItem>
              <label>Expiry</label>
              <input
                {...text({
                  name: "card_expiry"
                })}
                required
                placeholder="12/2020"
              />
            </FormItem>
          </HalfColumn>
          <HalfColumn>
            <FormItem className="mr-3">
              <label>CVV</label>
              <input
                {...number({
                  name: "cvv"
                })}
                required
                min="0"
                placeholder="720"
              />
            </FormItem>
            <FormItem>
              <label>Pin</label>
              <input
                {...password({
                  name: "pin",
                  validate: (value, values, e) => {
                    if (value.length !== 4) {
                      return "Pin length must be 4";
                    }
                  }
                })}
                required
                minLength="4"
                maxLength="4"
              />
            </FormItem>
          </HalfColumn>
          <button type="submit" className="mr-2">
            <span>Load</span>
          </button>
        </>
      )}
    </Form>
  );
}
