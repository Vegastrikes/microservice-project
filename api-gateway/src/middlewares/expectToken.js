export const expectToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).send({message: 'Missing token'});
  }
  const token = authHeader && authHeader.split(' ')[1];
  const bearer = authHeader.split(' ')[0];

  if (!token || !bearer || bearer !== 'Bearer') {
    return res.status(401).send({message: 'Missing token'});
  }

  req.token = token;
  next();
}