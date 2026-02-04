import { useEffect, useState } from "react";
import LeftBox from "./LeftBox";
import Receiver from "./Receiver";

const getCookie = (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
};

function LeftBoxInfo() {
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const userStr = getCookie('guardianUser') || localStorage.getItem('guardianUser');
        if (userStr) {
            const userData = JSON.parse(userStr);
            setDetails([{
                id: userData.id,
                name: userData.name,
                role: userData.role === 'Advocate' ? 'Advocate' : 'User',

                image: './download.jpg'
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
                    <LeftBox
                        image={values.image}
                        name={values.name}
                        role={values.role}
                    />

                </div>
            ))}
        </>
    );
}

export default LeftBoxInfo;