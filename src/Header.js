import { useState } from "react";
import './Enquiry.scss';
// import ReCAPTCHA from "react-google-recaptcha";
import { FaSyncAlt } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_API_URL;

function Header() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        course: "",
        message: ""
    });
    const [errors, setErrors] = useState({});
    const [captchaInput, setCaptchaInput] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const generateCaptcha = () => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let text = "";
        for (let i = 0; i < 5; i++) {
            text += chars.charAt(
                Math.floor(Math.random() * chars.length)
            );
        }
        return text;
    };
    const [captchaText, setCaptchaText] = useState(generateCaptcha());
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };
    const validateForm = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }
        if (!formData.mobile.trim()) {
            newErrors.mobile = "Mobile number is required";
        } else if (!mobileRegex.test(formData.mobile)) {
            newErrors.mobile = "Enter valid 10-digit mobile";
        }
        if (!formData.course) {
            newErrors.course = "Please select a course";
        }
        if (captchaInput.toUpperCase().trim() !==captchaText) {
            newErrors.captcha = "Incorrect CAPTCHA";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        if (!validateForm()) {
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/send-enquiry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }
            );
            const result = await response.json();
            if (result.success) {
                setSuccessMessage("Enquiry submitted successfully.");
                setFormData({ name: "", email: "", mobile: "", course: "", message: "" });
                setCaptchaInput("");
                setCaptchaText(generateCaptcha());
                setErrors({});
            }
        } catch (err) {
            console.log(err);
            setErrors({
                submit: "Failed to submit enquiry."
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 20px',
                    boxSizing: 'border-box',
                    borderBottom: '2px solid #071264',
                    marginBottom: '20px',
                    background: '#fff'
                }}
            >
                <img
                    src="/left-logo.png"
                    alt="Left Logo"
                    style={{
                        height: '80px',
                        objectFit: 'contain'
                    }}
                />
                <img
                    src="/srm-logo.png"
                    alt="Right Logo"
                    style={{
                        height: '70px',
                        objectFit: 'contain'
                    }}
                />
            </div>
            <div className="page-wrapper">
                <div className="enquiry-box">
                    <h2>Enquire Now</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name*"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name && (
                            <div className="error">{errors.name}</div>
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email*"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && (
                            <div className="error">{errors.email}</div>
                        )}
                        <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile*"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />
                        {errors.mobile && (
                            <div className="error">{errors.mobile}</div>
                        )}
                        <select
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            required
                        >
                            <option value="0">Course Interested in</option>
                            <option value="31">B.Sc. In Hotel and Hospitality Administration</option>
                            <option value="41">B.Sc.(Computer Science)</option>
                            <option value="39">B.Tech  Electronics &amp; Communication Engineering with Specialization  in Data Science</option>
                            <option value="5">B.Tech in Automobile Engineering</option>
                            <option value="14">B.Tech in Computer Science &amp; Engineering</option>
                            <option value="16">B.Tech in Computer Science and Engineering (CSE) with Specialization in Artificial Intelligence &amp; Machine learning</option>
                            <option value="18">B.Tech in Computer Science and Engineering (CSE) with Specialization in Cloud Computing</option>
                            <option value="19">B.Tech in Computer Science and Engineering (CSE) with Specialization in Cyber Security</option>
                            <option value="17">B.Tech in Computer Science and Engineering (CSE) with Specialization in Data Science</option>
                            <option value="1">B.Tech in Electronics &amp; Communication Engineering</option>
                            <option value="6">B.Tech In Mechanical Engineering</option>
                            <option value="10">Bachelor of Business Administration (BBA)</option>
                            <option value="30">Bachelor of Computer Applications (BCA)</option>
                            <option value="44">Bachelor of Computer Applications in Data Science</option>
                            <option value="13">Bachelor of Pharmacy (B.Pharm)</option>
                            <option value="2">M.Tech in Computer Science and Engineering</option>
                            <option value="22">Master of Business Administration (MBA)</option>
                            <option value="8">Master of Computer Applications (MCA)</option>
                            <option value="42">Master of Computer Applications in Generative Artificial Intelligence</option>
                            <option value="3">Ph.D in Engineering and Technology</option>
                            <option value="24">Ph.D in Management</option>
                            <option value="25">Ph.D in Pharmacy</option>
                            <option value="43">PhD (Computer Science &amp;  Applications)</option>
                        </select>
                        {errors.course && (
                            <div className="error">{errors.course}</div>
                        )}
                        <textarea
                            name="message"
                            placeholder="Enter Message"
                            rows="3"
                            value={formData.message}
                            onChange={handleChange}
                        />
                        <div className="captcha-box">
                            <div className="captcha-value">
                                {captchaText.split("").map((char, index) => (
                                    <span
                                        key={index}
                                        className="captcha-text"
                                        style={{
                                            display: "inline-block",
                                            transform: `rotate(${Math.random() * 40 - 20}deg)`
                                        }}
                                    >{char}
                                    </span>
                                ))}
                            </div>
                            <button
                                type="button"
                                className="refresh-icon-btn"
                                title="Refresh CAPTCHA"
                                style={{ width: 'max-content', padding: '6px 10px' }}
                                onClick={() => {
                                    setCaptchaText(generateCaptcha());
                                    setCaptchaInput("");
                                }}
                            >
                                <FaSyncAlt />
                            </button>

                        </div>

                        <input
                            type="text"
                            placeholder="Enter CAPTCHA *"
                            value={ captchaInput }
                            onChange={(e) =>
                                setCaptchaInput(e.target.value)
                            }
                        />
                        {errors.captcha && (
                            <div className="error">{errors.captcha}</div>
                        )}
                        <button type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "SUBMIT"}
                        </button>

                        {successMessage && (
                            <div className="success">{successMessage}</div>
                        )}

                        {errors.submit && (
                            <div className="error">{errors.submit}</div>
                        )}
                    </form>
                </div>
            </div>
            <footer
                style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    borderTop: '2px solid #e0aa3d',
                    color: '#fff',
                    fontWeight: 'bold',
                    paddingBottom: '1px',
                    fontSize: '14px',
                    backgroundColor: '#071264',
                }}
            >
                <p> SRM Institute of Science and Technology, Delhi-NCR Campus, Ghaziabad <br />
                    <br />
                    © {new Date().getFullYear()} SRMIST. All Rights Reserved. </p>
            </footer>
        </>
    );
}

export default Header;