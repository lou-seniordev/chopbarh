import { firestore } from "../firebase";

export default async function debugApplication(payload) {
	try {
		const docRef = await firestore.collection("app_debug").add({ ...payload });
	} catch (err) {}
}
