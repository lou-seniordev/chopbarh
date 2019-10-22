import * as actionType from "../actionTypes/actionTypes";
import firebase, { firestore } from "../../firebase";
import { getReference } from "../../lib/getReference";

export const setVoucherValue = value => ({
	type: actionType.SET_VOUCHER_VALUE,
	value
});

export const setVoucherHistoryInit = () => ({
	type: actionType.SET_VOUCHER_HISTORY_INIT
});

export const setVoucherHistorySuccess = data => ({
	type: actionType.SET_VOUCHER_HISTORY_SUCCESS,
	data
});

export const setVoucherHistoryFail = () => ({
	type: actionType.SET_VOUCHER_HISTORY_FAIL
});

export const setVoucherHistory = payload => async (dispatch, getState) => {
	dispatch(setVoucherHistoryInit());

	try {
		const snapshot = await firestore
			.collection("deposits")
			.where("id", "==", getState().auth.id)
			.get();

		const deposits = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		}));

		if (deposits.length) {
			const docRef = await firestore
				.collection("deposits")
				.doc(getState().auth.id)
				.update({
					data: firebase.firestore.FieldValue.arrayUnion({
						amount: payload.value,
						channel: "Voucher",
						deposit_date: payload.transaction_date,
						paid_at: payload.paid_at,
						transaction_fees: "None",
						transaction_reference: getReference(),
						status: payload.status
					})
				});
			dispatch(setVoucherHistorySuccess(docRef));
		} else {
			const docRef = await firestore
				.collection("deposits")
				.doc(getState().auth.id)
				.set({
					id: getState().auth.id,
					data: [
						{
							amount: payload.value,
							channel: "Voucher",
							deposit_date: payload.transaction_date,
							paid_at: payload.paid_at,
							transaction_fees: "None",
							transaction_reference: getReference(),
							status: payload.status
						}
					]
				});
			dispatch(setVoucherHistorySuccess(docRef));
		}
	} catch (err) {
		dispatch(setVoucherHistoryFail());
	}

	try {
		const docRef = await firestore.collection("new_deposits").add({
			amount: payload.value,
			channel: "Voucher",
			deposit_date: payload.transaction_date,
			paid_at: payload.paid_at,
			transaction_fees: "None",
			transaction_reference: getReference(),
			status: payload.status,
			customer_id: getState().player.playerData.PhoneNum,
			time: firebase.firestore.FieldValue.serverTimestamp(),
			playerId: getState().auth.id
		});
	} catch (err) {}
};
