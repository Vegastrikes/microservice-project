import jwt from 'jsonwebtoken'
const { verify } = jwt;
const jwtSecretKey = process.env.JWT_SECRET

export const authorizeToken = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).send({message: 'Missing token'});
  }

  verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
      return res.status(403).send({message: 'Invalid token'});
    }

    // Add the decoded information to the request object
    req.user = decoded;
    next();
  });
}