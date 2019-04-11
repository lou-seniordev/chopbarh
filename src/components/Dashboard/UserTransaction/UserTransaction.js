import React from "react";
import { Helmet } from "react-helmet";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import QuickPlayTransaction from "./QuickPlayTransaction/QuickPlayTransaction";

export default function UserTransaction() {
  return (
    <>
      <Helmet>
        <title>Chopbarh &rarr; Dashboard</title>
      </Helmet>
      <UserHeader />
      <UserNavigation />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <QuickPlayTransaction />
          </div>
          <div className="col-md-6">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
              doloremque aperiam reiciendis non recusandae possimus, rem dolorem
              accusantium. Praesentium tenetur neque culpa! Eaque sunt suscipit
              velit officiis sint sequi magnam?
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
