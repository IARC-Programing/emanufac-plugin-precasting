import { expressjwt as jwt } from 'express-jwt';
import App from './app';
const { secret } = App;
const getTokenFromHeader = (req) => {
    if ((req.headers.authorization
        && req.headers.authorization.split(' ')[0] === 'Token')
        || (req.headers.authorization
            && req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};
const auth = {
    required: jwt({
        secret,
        getToken: getTokenFromHeader,
        algorithms: ['HS256'],
    }),
    optional: jwt({
        secret,
        credentialsRequired: false,
        getToken: getTokenFromHeader,
        algorithms: ['HS256'],
    }),
};
export default auth;
