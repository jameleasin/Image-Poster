import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.Authorization.split(" ")[1];
        const isCustomeAuth = token.length < 500;

        let decodedData;

        if( token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.Id;
        }else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}
export default auth;