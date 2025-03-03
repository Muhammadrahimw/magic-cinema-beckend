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
                        Please enter this code within the next 2 minutes to verify your email.
                    </p>
                    <hr style="border: none; height: 1px; background: #ddd; margin: 20px 0;">
                    <p style="color: #888; font-size: 12px;">If you didn't request this, you can ignore this email.</p>
                </div>
            </body>`;
};

export const verifyLinkDesign = (loginLink, name) => {
	return `<body style="background-color: #f9f9f9; font-family: Arial, sans-serif; text-align: center; padding: 40px;">
            <div style="max-width: 400px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.      1);">
                <h2 style="color: #333;">🔑 Login Link</h2>
                <p style="color: #555;">Dear ${
									name || `User`
								}, click the button below to log in:</p>
                <a href="${loginLink}" style="display: inline-block; background: #007BFF; color: white; text-decoration: none; padding: 10px 20px;      font-size: 16px; font-weight: bold; border-radius: 5px; margin-top: 10px;">
                    Log in
                </a>
                <p style="color: #777; font-size: 14px; margin-top: 15px;">
                    This link will expire in 5 minutes. If you didn't request this, ignore this email.
                </p>
                <hr style="border: none; height: 1px; background: #ddd; margin: 20px 0;">
                <p style="color: #888; font-size: 12px;">If you have trouble clicking the button, copy and paste this link into your browser:</p>
                <p style="word-wrap: break-word; font-size: 12px; color: #007BFF;">${loginLink}</p>
            </div>
            </body>`;
};

export const updatedPasswordDesign = (name) => {
	return `<body style="background-color: #f9f9f9; font-family: Arial, sans-serif; text-align: center; padding: 40px;">
            <div style="max-width: 400px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0,        0, 0.1);">
                <h2 style="color: #333;">🔑 Password Changed</h2>
                <p style="color: #555;">Dear ${
									name || `User`
								}, your password has been successfully changed.</p>
                <div style="font-size: 18px; font-weight: bold; color: #28a745; background: #E9F7EF; display: inline-block; padding: 10px 20px;         border-radius: 5px;">
                    If this wasn’t you, please reset your password immediately.
                </div>
                <p style="color: #777; font-size: 14px; margin-top: 15px;">
                    If you recognize this change, no further action is required.
                </p>
                <hr style="border: none; height: 1px; background: #ddd; margin: 20px 0;">
                <p style="color: #888; font-size: 12px;">If you have any issues, contact our support team.</p>
            </div>
            </body>`;
};

export const changeEmailDesign = (name, newEmail) => {
	return `<body style="background-color: #f9f9f9; font-family: Arial, sans-serif; text-align: center; padding: 40px;">
            <div style="max-width: 400px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0,        0, 0.1);">
                <h2 style="color: #333;">📧 Email Changed</h2>
                <p style="color: #555;">Dear ${
									name || `User`
								}, your email address has been successfully updated.</p>
                <div style="font-size: 16px; font-weight: bold; color: #007BFF; background: #E9F5FF; display: inline-block; padding: 10px 20px;         border-radius: 5px;">
                    New Email: <span style="font-weight: normal;">${newEmail}</span>
                </div>
                <p style="color: #777; font-size: 14px; margin-top: 15px;">
                    If you did not request this change, please contact our support team immediately.
                </p>
                <hr style="border: none; height: 1px; background: #ddd; margin: 20px 0;">
                <p style="color: #888; font-size: 12px;">Thank you for using our service.</p>
            </div>
            </body>`;
};
export const verifyChangeEmailDesign = (confirmEmailLink, name) => {
	return `<body style="background-color: #f9f9f9; font-family: Arial, sans-serif; text-align: center; padding: 40px;">
            <div style="max-width: 400px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0,        0, 0.1);">
                <h2 style="color: #333;">📩 Confirm Email Change</h2>
                <p style="color: #555;">Dear ${
									name || `User`
								}, click the button below to confirm your email change:</p>
                <a href="${confirmEmailLink}" style="display: inline-block; background: #007BFF; color: white; text-decoration: none; padding:      10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px; margin-top: 10px;">
                    Confirm Email
                </a>
                <p style="color: #777; font-size: 14px; margin-top: 15px;">
                    This link will expire in 5 minutes. If you didn't request this change, ignore this email.
                </p>
                <hr style="border: none; height: 1px; background: #ddd; margin: 20px 0;">
                <p style="color: #888; font-size: 12px;">If you have trouble clicking the button, copy and paste this link into your browser:</p>
                <p style="word-wrap: break-word; font-size: 12px; color: #007BFF;">${confirmEmailLink}</p>
            </div>
            </body>`;
};
