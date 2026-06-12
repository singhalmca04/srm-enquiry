import './Enquiry.scss';

function SrmFooter() {
    return (
        <>
            <footer className="footer">
                <div className="footer-left">
                    <h4>Contact Us</h4>
                    <p>
                        📞 1800 889 3496
                    </p>
                    <p> 🌐 &nbsp;
                        <a href="https://www.srmup.in" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
                            www.srmup.in
                        </a>
                    </p>
                </div>

                <div className="footer-center">
                    <p style={{ fontSize: '14px' }}>
                        © {new Date().getFullYear()}
                        <br />
                        SRM Institute of Science and Technology
                        <br />
                        Delhi-NCR Campus, Ghaziabad
                        <br />
                        All Rights Reserved
                    </p><br/>
                    <p style={{ fontSize: '10px', color: '#f0f0f0' }}>Designed and developed by Dr. Vinay Singhal</p>
                </div>

                <div className="footer-right">
                    <img
                        src="\enquiry-qr.jpeg"
                        alt="QR Code"
                        className="qr-image"
                    />
                    <p> Scan for Admissions </p>
                </div>
            </footer>
        </>
    );
}

export default SrmFooter;