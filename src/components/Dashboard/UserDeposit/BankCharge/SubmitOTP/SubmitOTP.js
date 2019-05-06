import React, { useState } from "react";
import { useFormState } from "react-use-form-state";
import {Spinner} from 'reactstrap'
import { Form, FormItem } from "../../../../styles/CardCharge";

export default function SubmitOTP({reference}) {
  const [loading, setLoading] = useState(false);
  const [formState, { text }] = useFormState();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if (Object.keys(formState.errors).length > 0) {
      return;
    }

    console.log(formState);

    const postData = {
      reference: reference,
      otp: formState.values.otp
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
  }

  return (
    <Form onSubmit={handleSubmit}>
      {loading ?  (
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
      ) : (<FormItem>
        <label>Amount</label>
        <input
          {...text({
            name: "otp",
            validate: value => {
              if (!isNaN(value) !== true) {
                return "This should be a number";
              }
            }
          })}
          min="0"
          required
          placeholder="100"
        />
      </FormItem>
      <button type="submit" className="mr-2">
        <span>Submit</span>
      </button>)}
    </Form>
  );
}
