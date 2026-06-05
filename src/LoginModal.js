import { GoogleLogin } from '@react-oauth/google';
const apiUrl = process.env.REACT_APP_API_URL;

function LoginModal({ onClose }) {
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await fetch(apiUrl + "/google-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: credentialResponse.credential,
                }),
            });
            const result = await response.json();
            if (result.success) {
                console.log("Backend Response:", result.success);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user));
                onClose();
            } else {
                alert(result.message || 'Access Denied');
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data
                ?.message ||
                'Access Denied'
            );
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 99999
            }}
        >
            <div
                style={{
                    width: '420px',
                    background: '#fff',
                    borderRadius: '10px',
                    padding: '30px',
                    textAlign: 'center',
                    boxShadow: '0 5px 25px rgba(0,0,0,.2)'
                }}
            >
                <img
                    src="/srm-logo.png"
                    alt="SRM"
                    style={{
                        height: '70px',
                        marginBottom: '15px'
                    }}
                />
                <h2> SRMDOC Portal </h2>
                <p> Sign in using your authorized Google account </p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px'
                    }}
                >
                    <GoogleLogin
                        onSuccess={ handleGoogleSuccess }
                        onError={() =>
                            alert('Login Failed')
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default LoginModal;