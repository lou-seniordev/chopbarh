import React from "react";
import styled from "styled-components";

const UserProfileContentWrapper = styled.div`
  min-height: 40vh;
`;

const Image = styled.img`
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 25rem;
  height: 25rem;
  padding: 0.4rem;
`;

const ImageContainer = styled.div`
  border: 1px solid #bbb;
  border-radius: 50%;
  background: #ddd;
  width: 25rem;
  height: 25rem;
  padding: 1rem;
`;

export default function UserProfileContent({ userInfo }) {
  return (
    <UserProfileContentWrapper className="container my-5 pt-5 pb-5">
      <div className="row text-center">
        <div className="col-md-12">
          {userInfo.ImageID ? (
            <Image
              src={userInfo.imageId}
              alt="Profile"
              class="img-thumbnail mx-auto"
            />
          ) : (
            <ImageContainer className="mx-auto" />
          )}
        </div>
        <div className="col-md-12 mt-5">
          <h3>Name: {userInfo.DisplayName}</h3>
        </div>
      </div>
    </UserProfileContentWrapper>
  );
}
