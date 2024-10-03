const getGoogleLink = () => {
    const root = "https://accounts.google.com/o/oauth2/v2/auth";
    
    const options = {
        redirect_uri: process.env.REACT_APP_REDIRECT_URL,
        client_id: process.env.REACT_APP_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "openid",
        ].join(" "),
    };

    const qs = new URLSearchParams(options).toString();
    return `${root}?${qs}`
}

export default getGoogleLink;