import React, { useState } from "react";
import { useFormState } from "react-use-form-state";
import { Spinner } from "reactstrap";
import { Form, FormItem } from "../../../../styles/CardCharge";
import { AppContext } from "../../../../../hoc/AppContext";
import { increaseCoinBalance } from "../../../lib/increaseCoinBalance";

export default function SubmitOTP({ reference }) {
  const [loading, setLoading] = useState(false);
  const [formState, { text }] = useFormState();

  const handleSubmit = async (event, setCoinValue) => {
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
    try {
      const response = await fetch(
        "https://api.paystack.co/charge/submit_otp",
        {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: `Bearer sk_test_c644c86e3b42191b981bbc1c263f98c7020c9841`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(postData)
        }
      );

      const data = await response.json();
      console.log(data);
      const value = +data.data.amount;
      increaseCoinBalance(+data.data.amount / 100)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setCoinValue(value / 100);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <AppContext.Consumer>
      {({ setCoinValue }) => (
        <Form onSubmit={event => handleSubmit(event, setCoinValue)}>
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
                <label>Enter OTP</label>
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
                  placeholder="OTP"
                />
              </FormItem>
              <button type="submit" className="mr-2">
                <span>Submit</span>
              </button>
            </>
          )}
        </Form>
      )}
    </AppContext.Consumer>
  );
}
