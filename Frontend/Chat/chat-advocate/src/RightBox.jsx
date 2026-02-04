import { useEffect, useState } from "react";
import Sender from "./Sender";
import Receiver from "./Receiver";
import Text from "./Text";

const getCookie = (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
};

function RightBoxInfo() {
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const userStr = getCookie('guardianUser') || localStorage.getItem('guardianUser');
        if (userStr) {
            const userData = JSON.parse(userStr);
            setDetails([{
                id: userData.id,
                sender: userData.name,
                receiver: "Client User",
                message: "Hello Advocate!"
            }]);
        }
        setLoading(false);
    }, []);



    if (loading) return <p>Loading cards...</p>;
    if (error) return <p>Error loading cards: {error}</p>;
    if (!details || details.length === 0) return <p>No cards found</p>;

    return (
        <>
            {details.map((values) => (
                <div key={values.id || values.name}>
                    <Sender sender={values.sender} />
                    <Receiver receiver={values.receiver} />
                    <Text />
                </div>
            ))}
        </>
    );
}

export default RightBoxInfo;