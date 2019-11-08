import React, { Component, memo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { firestore } from "../../../../firebase";
import {
	fetchWithdrawalHistoryData,
	fetchWithdrawalHistorySuccess,
	fetchWithdrawalHistoryFail
} from "../../../../store/actions/withdrawalActions";

const WithdrawalTableWrapper = styled.div`
	margin-top: 1rem;
`;

class WithdrawalTable extends Component {
	state = {
		loading: true,
		error: false,
		withdrawalData: [],
		lastVisible: null,
		hasMore: true,
		limit: 10
	};

	componentDidMount = async () => {
		try {
			let snapshots = await firestore
				.collection("new_withdrawals")
				.where("playerId", "==", this.props.playerData.PlayerID)
				.orderBy("time", "desc")
				.limit(this.state.limit)
				.get();

			let data = snapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }));
			let lastVisible = snapshots.docs[snapshots.docs.length - 1];

			if (data.length === 0) {
				this.setState({ loading: false, error: true });
				return;
			}

			if (data.length < this.state.limit) {
				this.setState({ withdrawalData: data, loading: false, hasMore: false });
				return;
			}

			this.setState(() => ({
				withdrawalData: data,
				lastVisible,
				loading: false
			}));
		} catch (err) {
			this.setState({ error: true, loading: false });
		}
	};

	fetchMoreData = async () => {
		try {
			let additionalQuery = await firestore
				.collection("new_withdrawals")
				.where("playerId", "==", this.props.playerData.PlayerID)
				.orderBy("time", "desc")
				.startAfter(this.state.lastVisible)
				.limit(this.state.limit);

			let snapshots = await additionalQuery.get();
			let data = snapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }));
			let lastVisible = snapshots.docs[snapshots.docs.length - 1];

			if (!data.length) {
				this.setState({ hasMore: false });
				return;
			}
			// Set State
			this.setState({
				withdrawalData: [...this.state.withdrawalData, ...data],
				lastVisible
			});
		} catch (error) {
			this.setState({ error: true, loading: false });
		}
	};

	render() {
		return (
			<WithdrawalTableWrapper>
				{!this.state.loading ? (
					<div
						className="table-responsive"
						id="scrollableDiv"
						style={{ height: 500, overflow: "auto" }}
					>
						<InfiniteScroll
							dataLength={this.state.withdrawalData.length}
							next={this.fetchMoreData}
							hasMore={true}
							loader={
								<div className="text-center mx-auto">
									<Spinner />
								</div>
							}
							endMessage={
								<div style={{ textAlign: "center" }}>
									<p>You have seen it all!</p>
								</div>
							}
							hasMore={this.state.hasMore}
							scrollableTarget="scrollableDiv"
						>
							<table className="table table-striped">
								<thead
									style={{
										background: "#8C1936",
										color: "#fff",
										textAlign: "center"
									}}
								>
									<tr>
										<th scope="col">Status</th>
										<th scope="col">Reference</th>
										<th scope="col">Transaction Date</th>
										<th scope="col">Transaction Time</th>
										<th scope="col">Transaction Fees</th>
										<th scope="col">Amount</th>
										<th scope="col">Channel</th>
									</tr>
								</thead>
								<tbody>
									{this.state.withdrawalData.map((withdrawal, index) => (
										<tr key={index} style={{ textAlign: "center" }}>
											<td>{withdrawal.status}</td>
											<td>{withdrawal.transaction_reference}</td>
											<td>{`${new Date(
												withdrawal.withdrawal_date
											).toLocaleDateString()}`}</td>
											<td>{`${new Date(
												withdrawal.withdrawal_date
											).toLocaleTimeString()}`}</td>
											<td>
												{withdrawal.transaction_fee === "None" ||
												withdrawal.transaction_fee === "--"
													? `\u20a6${0}`
													: `\u20a6${withdrawal.transaction_fee}`}
											</td>

											<td>
												&#8358;
												{new Intl.NumberFormat().format(withdrawal.amount)}
											</td>
											<td>{withdrawal.channel}</td>
										</tr>
									))}
								</tbody>
							</table>
						</InfiniteScroll>
					</div>
				) : (
					<>
						{!this.state.error ? (
							<div className="text-center mx-auto">
								<Spinner />
							</div>
						) : (
							<div className="text-center mx-auto">
								<p>Withdrawal History not Available</p>
							</div>
						)}
					</>
				)}
			</WithdrawalTableWrapper>
		);
	}
}

const mapStateToProps = state => ({
	playerData: state.player.playerData,
	loading: state.withdrawal.loading,
	error: state.withdrawal.error,
	withdrawalData: state.withdrawal.withdrawalHistory
});

const mapDispatchToProps = {
	fetchWithdrawalHistoryData,
	fetchWithdrawalHistorySuccess,
	fetchWithdrawalHistoryFail
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(memo(WithdrawalTable));
