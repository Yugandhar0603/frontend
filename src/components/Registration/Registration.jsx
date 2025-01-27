import React, { useState } from 'react'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'

function Registration() {
    const [isLoginActive, setIsLoginActive] = useState(true);
    
    const handleClick = () => {
        setIsLoginActive(!isLoginActive);
    };

    return (
        <div className='min-h-screen w-full'> 
            {isLoginActive ? (
                <Login handleClick={handleClick} />
            ) : (
                <SignUp handleClick={handleClick} />
            )}
        </div>
    );
}

export default Registration;
