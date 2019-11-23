import * as actionType from "../actionTypes/actionTypes";
import { firestore } from "../../firebase";

export const fetchRefundHistoryInit = () => ({
	type: actionType.FETCH_REFUND_HISTORY_INIT
});

export const fetchRefundHistorySuccess = data => ({
	type: actionType.FETCH_REFUND_HISTORY_SUCCESS,
	data
});

export const fetchRefundHistoryFail = () => ({
	type: actionType.FETCH_REFUND_HISTORY_FAIL
});

export const fetchRefundHistoryData = () => async (dispatch, getState) => {
	dispatch(fetchRefundHistoryInit());

	// try {
	// 	const snapshot = await firestore
	// 		.collection("new_refunds")
	// 		.where("playerId", "==", getState().auth.id)
	// 		.orderBy("time", "desc")
	// 		.get();

	// 	const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
	// 	const docId = data[0].id;
	// 	console.log(data);
	// } catch (err) {
	// 	console.log(err);
	// }

	try {
		const snapshot = await firestore
			.collection("refunds")
			.where("id", "==", getState().auth.id)
			.get();

		const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
		if (data.length) {
			dispatch(fetchRefundHistorySuccess(data[0].data.reverse()));
		} else {
			dispatch(fetchRefundHistoryFail());
		}
	} catch (err) {
		dispatch(fetchRefundHistoryFail());
	}
};
