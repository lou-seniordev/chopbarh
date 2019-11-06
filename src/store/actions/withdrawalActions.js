import * as actionType from "../actionTypes/actionTypes";
import firebase, { firestore } from "../../firebase";

export const fetchWithdrawalHistoryInit = () => ({
	type: actionType.FETCH_WITHDRAWAL_HISTORY_INIT
});

export const fetchWithdrawalHistorySuccess = data => ({
	type: actionType.FETCH_WITHDRAWAL_HISTORY_SUCCESS,
	data
});

export const fetchWithdrawalHistoryFail = () => ({
	type: actionType.FETCH_WITHDRAWAL_HISTORY_FAIL
});

export const fetchWithdrawalHistoryData = () => async (dispatch, getState) => {
	dispatch(fetchWithdrawalHistoryInit());

	try {
		const snapshot = await firestore
			.collection("withdrawals")
			.where("id", "==", getState().auth.id)
			.get();

		const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
		if (data.length) {
			dispatch(fetchWithdrawalHistorySuccess(data[0].data.reverse()));
		} else {
			dispatch(fetchWithdrawalHistoryFail());
		}
	} catch (err) {
		dispatch(fetchWithdrawalHistoryFail());
	}

	// try {
	// 	const snapshot = await firestore
	// 		.collection("new_withdrawals")
	// 		.where("playerId", "==", getState().auth.id)
	// 		.orderBy("time", "desc")
	// 		.limit(10)
	// 		.get();

	// 	const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

	// 	if (data.length) {
	// 		dispatch(fetchWithdrawalHistorySuccess(data));
	// 	} else {
	// 		dispatch(fetchWithdrawalHistorySuccess());
	// 	}
	// } catch (err) {
	// 	dispatch(fetchWithdrawalHistoryFail());
	// }

	// try {
	// 	const snapshot = await firestore
	// 		.collection("new_withdrawals")
	// 		.where("playerId", "==", getState().auth.id)
	// 		.where("transaction_reference", "==", "09014202339-FRDOJWHTY1DFPT8")
	// 		.get();

	// 	const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
	// 	const docId = data[0].id;

	// 	try {
	// 		const ref = await firestore
	// 			.collection("new_withdrawals")
	// 			.doc(docId)
	// 			.update({ status: "SUCCESS" });
	// 	} catch (err) {
	// 		console.log(err);
	// 	}

	// 	console.log(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
	// } catch (err) {}
};

export const setWithdrawalHistoryInit = () => ({
	type: actionType.SET_WITHDRAWAL_HISTORY_INIT
});

export const setWithdrawalHistorySuccess = data => ({
	type: actionType.SET_WITHDRAWAL_HISTORY_SUCCESS,
	data
});

export const setWithdrawalHistoryFail = () => ({
	type: actionType.SET_WITHDRAWAL_HISTORY_FAIL
});

export const setWithdrawalHistory = payload => async (dispatch, getState) => {
	dispatch(setWithdrawalHistoryInit());
	try {
		const snapshot = await firestore
			.collection("withdrawals")
			.where("id", "==", getState().auth.id)
			.get();

		const withdrawals = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		}));

		if (withdrawals.length) {
			const docRef = await firestore
				.collection("withdrawals")
				.doc(getState().auth.id)
				.update({
					data: firebase.firestore.FieldValue.arrayUnion({
						amount: payload.amount,
						status: payload.status,
						transaction_fee: payload.fee,
						transaction_reference: payload.reference,
						channel: payload.channel,
						withdrawal_date: payload.date,
						paid_at: payload.date,
						gameTransactionId: payload.gameTransactionId
							? payload.gameTransactionId
							: "--"
					})
				});
			dispatch(setWithdrawalHistorySuccess(docRef));
		} else {
			const docRef = await firestore
				.collection("withdrawals")
				.doc(getState().auth.id)
				.set({
					id: getState().auth.id,
					data: [
						{
							amount: payload.amount,
							status: payload.status,
							transaction_fee: payload.fee,
							transaction_reference: payload.reference,
							channel: payload.channel,
							withdrawal_date: payload.date,
							paid_at: payload.date,
							gameTransactionId: payload.gameTransactionId
								? payload.gameTransactionId
								: "--"
						}
					]
				});
			dispatch(setWithdrawalHistorySuccess(docRef));
		}
	} catch (err) {
		dispatch(setWithdrawalHistoryFail());
	}

	try {
		const docRef = await firestore.collection("new_withdrawals").add({
			amount: payload.amount,
			status: payload.status,
			transaction_fee: payload.fee,
			transaction_reference: payload.reference,
			channel: payload.channel,
			withdrawal_date: payload.date,
			paid_at: Date.now(),
			time: firebase.firestore.FieldValue.serverTimestamp(),
			playerId: getState().auth.id,
			gameTransactionId: payload.gameTransactionId
				? payload.gameTransactionId
				: "--"
		});
	} catch (err) {}
};

export const setWithdrawalStatus = value => ({
	type: actionType.SET_WITHDRAWAL_STATUS,
	value
});
