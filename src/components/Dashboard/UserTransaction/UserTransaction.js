import React from "react";
import { Helmet } from "react-helmet";
import MediaQuery from "react-responsive";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import QuickPlayTransaction from "./QuickPlayTransaction/QuickPlayTransaction";
import VoucherTransaction from "./VoucherTransaction/VoucherTransaction";
import TransactionTabs from "./TransactionTabs/TransactionTabs";
import Voucher from "../UserHome/Voucher/Voucher";

export default function UserTransaction() {
  return (
    <>
      <Helmet title={`Chopbarh \u{2192} Transactions`} />
      <UserHeader />
      <UserNavigation />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <TransactionTabs />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <VoucherTransaction />
          </div>
        </div>
      </div>
      {/* <div className="container">
        <div className="row mb-5">
          <div className="col-lg-6">
            <MediaQuery minDeviceWidth={992}>
              <Voucher />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={992}>
              <Voucher center="true" />
            </MediaQuery>
          </div>
        </div>
      </div> */}
      <Footer />
    </>
  );
}
