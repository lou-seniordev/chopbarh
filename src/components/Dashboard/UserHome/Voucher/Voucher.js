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
            <thead>
              <tr>
                <th scope="col">Top Earners</th>
                <th scope="col" />
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </VoucherWrapper>
  );
}
