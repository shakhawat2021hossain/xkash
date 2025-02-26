import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';

const Balance = () => {
    const {user} = useAuth()
    const [isBlurred, setIsBlurred] = useState(true);

    const handleBalanceClick = () => {
        setIsBlurred(false);
    };

    return (
        <span
            onClick={handleBalanceClick}
            className="my-4 px-6 py-1 bg-emerald-200 rounded-full inline-block"
            style={{
                filter: isBlurred ? 'blur(2px)' : 'none',
                cursor: 'pointer',
                transition: 'filter 0.3s ease'
            }}
        >
            Tk. {isBlurred ? 'XXXX' : user?.balance || '0'}
        </span>
    );

}

export default Balance;