import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";
import color from "../../styles/colors";
import breakpoint from "../../styles/breakpoints";

/* 

Add the Link required to to the Links below

*/

const FooterWrapper = styled.footer`
	background: #353434;
	padding: 5rem 2rem;
	position: relative;
	text-align: left !important;

	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`;

const FooterContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	/* flex-wrap: wrap;
  align-items: center;
  justify-content: space-around; */

	@media screen and (max-width: ${breakpoint.small}) {
		grid-template-columns: 1fr;
		text-align: center;
	}

	& > * {
		margin-right: 0.8rem;
		margin-bottom: 0.5rem;
	}
`;

const FooterLinkHeader = styled.div`
	p {
		color: ${color.colorWhite};
		font-weight: 500;
		margin-bottom: 1.2rem;
		font-size: 1.4rem;
	}
`;

const FooterLinkContainer = styled.div`
	p {
		color: ${color.colorWhite};
	}

	a,
	span {
		color: #dddddd;
		text-decoration: none;
		transition: all 0.2s;
		font-size: 1.3rem;

		&:hover {
			color: ${color.colorWhite};
			cursor: pointer;
		}
	}
`;

export default function Footer() {
	return (
		<FooterWrapper className="footer">
			<FooterContainer className="footer__container">
				<div className="mb-3">
					<img src={Logo} alt="Logo" />
				</div>
				<div className="mb-3">
					<FooterLinkHeader>
						<p>Chopbarh</p>
					</FooterLinkHeader>
					<FooterLinkContainer>
						<p>
							<span>About Us</span>
						</p>
						<p>
							<span>Terms and Conditions</span>
						</p>
						<p>
							<span>Privacy Policy</span>
						</p>
						{/* <p>
              <span>Responsible Gaming</span>
            </p> */}
						<p>
							<span>Become a Recharge Vendor</span>
						</p>
					</FooterLinkContainer>
				</div>
				<div className="mb-3">
					<FooterLinkHeader>
						<p>Help</p>
					</FooterLinkHeader>
					<FooterLinkContainer>
						<p>
							<span>
								<a href="https://chopbarh.zendesk.com/hc">How to Play</a>
							</span>
						</p>
						<p>
							<span>Games</span>
						</p>
						{/* <p>
              <span>Betting</span>
            </p> */}
						<p>
							<Link to="signup">
								<span>Download</span>
							</Link>
						</p>
						<p>
							<span>
								<a href="https://chopbarh.zendesk.com/hc/en-us/requests/new">
									Talk to us
								</a>
							</span>
						</p>
					</FooterLinkContainer>
				</div>
				<div className="align-self-start mb-3">
					<FooterLinkHeader>
						<p>Contact Us</p>
					</FooterLinkHeader>
					<FooterLinkContainer>
						<p>Telephone: 0809-249-2331</p>
						<p>
							Email:{" "}
							<a href="https://chopbarh.zendesk.com/hc/en-us/requests/new">
								Please Click Here
							</a>
						</p>
						<p>&copy; {new Date().getFullYear()}</p>
					</FooterLinkContainer>
				</div>
			</FooterContainer>
		</FooterWrapper>
	);
}
