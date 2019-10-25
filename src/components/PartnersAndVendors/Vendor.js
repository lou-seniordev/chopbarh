import React from "react";
import { Helmet } from "react-helmet";
import Header from "../UI/Header/Header";
import Footer from "../UI/Footer/Footer";

export default function Vendor() {
	return (
		<>
			<Helmet title={`Chopbarh \u{2192} Home`} />
			<Header />
			<Footer />
		</>
	);
}
