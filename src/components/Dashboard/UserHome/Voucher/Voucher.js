import React from "react";
import styled from "styled-components";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";

const VoucherWrapper = styled.div`
  margin-top: 6rem;
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;

  button {
    all: unset;
    padding: 0.5rem 1.3rem;
    transform: skew(-20deg);
    display: inline-block;
    transition: all 0.2s;
    color: ${color.colorWhite};
    background: ${color.colorPrimary};
    font-size: 1.3rem;
    z-index: 200;

    /* @media only screen and (max-width: ${breakPoints.mediumLite}) {
      align-self: flex-start;
      padding: 0.5rem 1.7rem;
      margin-bottom: 0.5rem;
      margin-top: 0.5rem;
    } */

    span {
      display: inline-block;
      transform: skew(20deg);
      color: #fff;
    }

    &:hover {
      transform: translateY(-3px) skew(-20deg);
      background: ${color.colorPrimaryHover};
      color: ${color.colorWhite};
    }
  }
`;

const FormItem = styled.div`
  label {
    font-size: 1.4rem;
    font-weight: 600;
    color: #737773;
    margin-bottom: 1rem;
  }

  input {
    color: #8d8e8d;
    width: 30rem;
    height: 3.4rem;
    margin-bottom: 2rem;
    border: 0;
    background: #f6f6f6;
    outline: none;
    padding: 3px 5px;
  }

  & > * {
    display: block;
    font-family: inherit;
  }
`;

export default function Voucher() {
  return (
    <VoucherWrapper className="container">
      <div className="row">
        <div className="col-md-6">
          <FormWrapper>
            <form>
              <FormItem>
                <label>Load Voucher</label>
              </FormItem>
              <FormItem>
                <input type="text" placeholder="Voucher Code" />
              </FormItem>
              <button type="submit" className="ml-2 mr-2">
                <span>Load</span>
              </button>
            </form>
          </FormWrapper>
        </div>
        <div className="col-md-6">
          <table class="table table-striped">
            <thead style={{ background: "#8C1936", color: "#fff" }}>
              <tr>
                <th scope="col">Top Earners</th>
                <th scope="col" />
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ade Kola</td>
                <td>Lagos</td>
                <td>&#8358;70,000</td>
              </tr>
              <tr>
                <td>Joe Fesobi</td>
                <td>Benin</td>
                <td>&#8358;50,000</td>
              </tr>
              <tr>
                <td>Adewale Jacob</td>
                <td>Ibadan</td>
                <td>&#8358;60,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </VoucherWrapper>
  );
}
