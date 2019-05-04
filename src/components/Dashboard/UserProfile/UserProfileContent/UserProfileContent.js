import React from "react";
import styled from "styled-components";
// import Ludo from "../../../assets/img/Ludo@2x.png";
// import Whot from "../../../assets/img/Whot@2x.png";

const UserProfileContentWrapper = styled.div`
  min-height: 30vh;
`;

// const Image = styled.img`
//   border: 1px solid #ddd;
//   border-radius: 3px;
//   width: 100%;
//   height: 100%;
//   padding: 0.4rem;
// `;

export default function UserProfileContent() {
  return (
    <UserProfileContentWrapper className="container my-5 pt-5 pb-5">
      <div className="row">
        {/* <div className="col-md-4">
          <Image src={Ludo} alt="Profile" class="img-thumbnail" />
        </div>
        <div className="col-md-6">
          <Image src={Whot} alt="Profile" class="img-thumbnail" />
        </div> */}
      </div>
    </UserProfileContentWrapper>
  );
}
