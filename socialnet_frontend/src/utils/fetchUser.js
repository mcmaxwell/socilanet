export const fetchUser = () => {
    const userInfo =
        localStorage.getItem('user') !== 'undefined'
            ? JSON.parse(localStorage.getItem('user'))
            : localStorage.clear();

    if (userInfo?.jti) {
        userInfo['googleId'] = userInfo?.jti;
    }

    return userInfo;
};
