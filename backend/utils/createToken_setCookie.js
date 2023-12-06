import jwt from 'jsonwebtoken'

const createToken_setCookie = (res, userId) => {
    // create a json web token
    const token = jwt.sign({userId},  process.env.SECRET, {expiresIn: '3d'})

    // Now save the token in a cookie that will be sent to user, So add to res
    res.cookie('CookieWithJWT', token, {
        httpOnly:  true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3 * 24 * 60 * 60 * 1000  // 3 days in mili seconds
    })

}

export default createToken_setCookie