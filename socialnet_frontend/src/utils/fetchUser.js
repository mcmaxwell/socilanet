export const fetchUser = () => {
    const userInfo =
        localStorage.getItem('user') !== 'undefined'
            ? JSON.parse(localStorage.getItem('user'))
            : localStorage.clear();

    userInfo['googleId'] = userInfo.jti;

    return userInfo;
};
