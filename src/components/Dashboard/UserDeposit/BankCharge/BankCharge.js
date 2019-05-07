import React, { useState } from "react";
import { useFormState } from "react-use-form-state";
import { Spinner } from "reactstrap";
import { Form, FormItem, HalfColumn } from "../../../styles/CardCharge";
import SubmitOTP from "./SubmitOTP/SubmitOTP";
import { increaseCoinBalance } from "../../lib/increaseCoinBalance";

export default function BankCharge() {
  const [loading, setLoading] = useState(false);
  const [referenceValue, setReferenceValue] = useState(null);
  const [formState, { text, email, date, select }] = useFormState({
    bank: "044"
  });

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);

    if (Object.keys(formState.errors).length > 0) {
      return;
    }

    console.log(formState);

    const postData = {
      email: formState.values.email,
      amount: formState.values.amount * 100,
      bank: {
        code: formState.values.bank,
        account_number: formState.values.account_number
      },
      birthday: formState.values.birthday
    };

    console.log(postData);
    const response = await fetch("https://api.paystack.co/charge", {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer sk_test_c644c86e3b42191b981bbc1c263f98c7020c9841`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    const data = await response.json();
    setReferenceValue(data.data.reference);
  };

  return (
    <>
      {!referenceValue ? (
        <>
          <Form onSubmit={handleSubmit}>
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
                  <label>Bank</label>
                  <select
                    {...select("bank")}
                    required
                    placeholder="johndoe@gmail.com"
                  >
                    <option value="044">Access Bank</option>
                    <option value="035A">ALAT by Wema</option>
                    <option value="070">Fidelity Bank</option>
                    <option value="214">First City Monument Bank</option>
                    <option value="232">Sterling Bank</option>
                    <option value="032">Union Bank of Nigeria</option>
                    <option value="215">Unity Bank</option>
                    <option value="057">Zenith Bank</option>
                  </select>
                </FormItem>
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
                <HalfColumn>
                  <FormItem className="mr-3">
                    <label>Account Number</label>
                    <input
                      {...text({
                        name: "account_number",
                        validate: value => {
                          if (!isNaN(value) !== true) {
                            return "This should be a number";
                          }
                        }
                      })}
                      required
                      placeholder="5078982018"
                    />
                  </FormItem>
                  <FormItem>
                    <label>Birthday</label>
                    <input
                      {...date({
                        name: "birthday"
                      })}
                      required
                      placeholder="Birthday"
                    />
                  </FormItem>
                </HalfColumn>
                <button type="submit" className="mr-2">
                  <span>Load</span>
                </button>
              </>
            )}
          </Form>
        </>
      ) : (
        <SubmitOTP reference={referenceValue} />
      )}
    </>
  );
}
