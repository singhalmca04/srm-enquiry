import './Enquiry.scss';

function SrmHeader() {
    return (
        <>
            <div className="header">
                <img
                    src="/left-logo.png"
                    alt="Left Logo"
                    className="left-logo"
                />
                <img
                    src="/srm-logo.png"
                    alt="Right Logo"
                    className="right-logo"
                />
            </div>
        </>
    );
}

export default SrmHeader;