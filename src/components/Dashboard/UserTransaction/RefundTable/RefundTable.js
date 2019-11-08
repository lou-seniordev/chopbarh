import React, { Component, memo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import { firestore } from "../../../../firebase";
import InfiniteScroll from "react-infinite-scroll-component";
import {
	fetchRefundHistoryData,
	fetchRefundHistorySuccess,
	fetchRefundHistoryFail
} from "../../../../store/actions/refundActions";

const RefundTableWrapper = styled.div`
	margin-top: 1rem;
`;

class RefundTable extends Component {
	state = {
		loading: true,
		error: false,
		refundData: [],
		lastVisible: null,
		hasMore: true,
		limit: 10
	};

	componentDidMount = async () => {
		try {
			let snapshots = await firestore
				.collection("new_refunds")
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
				this.setState({ refundData: data, loading: false, hasMore: false });
				return;
			}

			this.setState(() => ({
				refundData: data,
				lastVisible,
				loading: false
			}));
		} catch (err) {
			console.log(err);
			this.setState({ error: true, loading: false });
		}
	};

	fetchMoreData = async () => {
		try {
			let additionalQuery = await firestore
				.collection("new_refunds")
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
				refundData: [...this.state.refundData, ...data],
				lastVisible
			});
		} catch (error) {
			this.setState({ error: true, loading: false });
		}
	};

	render() {
		return (
			<RefundTableWrapper>
				{!this.state.loading && this.state.refundData.length ? (
					<div
						className="table-responsive"
						id="scrollableDiv"
						style={{ height: 500, overflow: "auto" }}
					>
						<InfiniteScroll
							dataLength={this.state.refundData.length}
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
										<th scope="col">Refund Date</th>
										<th scope="col">Refund Time</th>
										<th scope="col">Amount</th>
										<th scope="col">Bank</th>
									</tr>
								</thead>
								<tbody>
									{this.state.refundData.map((refund, index) => (
										<tr key={index} style={{ textAlign: "center" }}>
											<td>{refund.status}</td>
											<td>{refund.transaction_reference}</td>
											<td>{`${new Date(refund.refund_date).toLocaleDateString()}`}</td>
											<td>{`${new Date(refund.refund_date).toLocaleTimeString()}`}</td>

											<td>
												&#8358;
												{new Intl.NumberFormat().format(refund.amount)}
											</td>
											<td>{refund.bank}</td>
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
								<p>Refund History not Available</p>
							</div>
						)}
					</>
				)}
			</RefundTableWrapper>
		);
	}
}

const mapStateToProps = state => ({
	playerData: state.player.playerData,
	loading: state.refunds.loading,
	error: state.refunds.error,
	refundData: state.refunds.refundHistory
});

const mapDispatchToProps = {
	fetchRefundHistoryData,
	fetchRefundHistorySuccess,
	fetchRefundHistoryFail
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(memo(RefundTable));
