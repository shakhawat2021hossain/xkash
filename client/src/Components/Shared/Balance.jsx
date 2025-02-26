import React, { useState } from 'react';
import useBalance from '../../Hooks/useBalance';

const Balance = () => {
    const [isBlurred, setIsBlurred] = useState(true);

    const handleBalanceClick = () => {
        setIsBlurred(false);
        setTimeout(() => { setIsBlurred(true) }, 4000)
    };
    const { balance } = useBalance()

    return (
        <span
            onClick={handleBalanceClick}
            className="my-4 px-8 py-1 bg-emerald-200 rounded-full inline-block"
            style={{
                filter: isBlurred ? 'blur(2px)' : 'none',
                cursor: 'pointer',
                transition: 'filter 0.3s ease'
            }}
        >
            Tk. {balance || '0'}
        </span>
    );

}

export default Balance;