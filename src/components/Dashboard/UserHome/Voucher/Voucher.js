import React from "react";
import styled from "styled-components";

const VoucherWrapper = styled.div`
  margin-top: 6rem;
`;

export default function Voucher() {
  return (
    <VoucherWrapper className="container">
      <div className="row">
        <div className="col-md-6">Play Voucher</div>
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
                <td>70,000</td>
              </tr>
              <tr>
                <td>Joe Fesobi</td>
                <td>Benin</td>
                <td>50,000</td>
              </tr>
              <tr>
                <td>Adewale Jacob</td>
                <td>Ibadan</td>
                <td>60,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </VoucherWrapper>
  );
}
