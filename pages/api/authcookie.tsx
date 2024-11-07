export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ success: false, message: 'Method Not Allowed' });
	}

	const { username, action } = req.body;

	if (!username && !action) {
		return res.status(400).json({ success: false, error: "Username and Action is required." });
	}
	
	if(action === "CREATE") {
		res.setHeader('Set-Cookie', `LoggedInUser=${username}; Path=/; HttpOnly; Secure; SameSite=Strict`);
		return res.status(200).json({ success: true });
	}
	if(action === "DESTROY") {
		res.setHeader('Set-Cookie', 'LoggedInUser=${username}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
		return res.status(200).json({ success: true });
	}

	return res.status(400).json({ success: false, error: "Action type invalid." });
}