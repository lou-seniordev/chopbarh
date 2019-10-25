import React from "react";
import styled from "styled-components";
import color from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";
import bg from "../../assets/img/page_background@2x.png";

const VendorsContentWrapper = styled.div``;

const VendorsContentHeader = styled.div`
	background: ${color.colorPrimary} url(${bg});
	background-size: cover;
	background-repeat: no-repeat;
	height: 20vh;
	color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 10rem 0;

	@media only screen and (max-width: ${breakPoints.medium}) {
		padding: 8rem 0;
	}

	h3 {
		font-size: 3.5rem;

		@media only screen and (max-width: ${breakPoints.medium}) {
			font-size: 3rem;
		}

		@media only screen and (max-width: ${breakPoints.small}) {
			font-size: 2.5rem;
		}

		@media only screen and (max-width: ${breakPoints.smaller}) {
			font-size: 2rem;
		}
	}

	span {
		width: 45%;
		font-size: 1.5rem;

		@media only screen and (max-width: ${breakPoints.medium}) {
			width: 60%;
			font-size: 1.2rem;
		}

		@media only screen and (max-width: ${breakPoints.small}) {
			width: 70%;
		}

		@media only screen and (max-width: ${breakPoints.smaller}) {
			width: 90%;
			font-size: 1rem;
		}
	}
`;

export default function VendorsContent() {
	return (
		<VendorsContentWrapper>
			<VendorsContentHeader>
				<h3>
					Become a <br /> Voucher Reseller
				</h3>
				<span>
					Make up to 20% profit selling ChopBarh vouchers. <br /> To become a vendor
					please contact any of our Authorized Distributors near you to purchase
					vouchers for resale.
				</span>
			</VendorsContentHeader>
			<p>Content</p>
			<p>Ad Caption</p>
		</VendorsContentWrapper>
	);
}
