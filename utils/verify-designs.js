export const verifyCodeDesign = (code, name) => {
	return `<body style="background-color: #f9f9f9; font-family: Arial, sans-serif; text-align: center; padding: 40px;">
                <div style="max-width: 400px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #333;">📩 Verification</h2>
                    <p style="color: #555;">Dear ${
											name || `User`
										}, your verification code is:</p>
                    <div style="font-size: 24px; font-weight: bold; color: #007BFF; background: #E9F5FF; display: inline-block; padding: 10px 20px; border-radius: 5px; letter-spacing: 3px;">
                       ${code}
                    </div>
                    <p style="color: #777; font-size: 14px; margin-top: 15px;">
                        Please enter this code within the next 10 minutes to verify your email.
                    </p>
                    <hr style="border: none; height: 1px; background: #ddd; margin: 20px 0;">
                    <p style="color: #888; font-size: 12px;">If you didn't request this, you can ignore this email.</p>
                </div>
            </body>`;
};
