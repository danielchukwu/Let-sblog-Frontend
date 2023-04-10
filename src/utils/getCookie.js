import Cookie from 'js-cookie';

const getCookie = (cookiename) => Cookie.get(cookiename);

export default getCookie;