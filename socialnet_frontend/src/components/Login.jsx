import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo.png';
import jwt_decode from 'jwt-decode';

import { client } from '../client';

const Login = () => {
    const navigate = useNavigate();
    const responseGoogle = (response) => {
        const { clientId, credential } = response;
        const decoded = jwt_decode(credential);
        const doc = {
            _id: clientId,
            _type: 'user',
            userName: decoded.name,
            image: decoded.picture,
        };
        localStorage.setItem('user', JSON.stringify(decoded));

        client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true });
        });
    };

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
            <div className='flex justify-start items-center flex-col h-screen'>
                <div className='relative w-full h-full'>
                    <video
                        src={shareVideo}
                        type='video/mp4'
                        loop
                        controls={false}
                        muted
                        autoPlay
                        className='w-full h-full object-cover'
                    />

                    <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                        <div className='p-5'>
                            <img
                                src={logo}
                                width='130'
                                alt='logo'
                            />
                        </div>
                        <div className='shadow-2x1'>
                            <GoogleLogin
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
