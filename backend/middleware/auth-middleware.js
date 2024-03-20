import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Middleware : intercepte la req et vérifie le token fourni
// si tout se passe bien o passe la main au contrôleur grace à next()
// si problème on répond avec une erreur et le contrôleur ne sera pas déclenché.
export default function verifyToken(req, res, next) {
  // le token devrait être présenté dans le header
  const token = req.header('Authorization')?.split(' ')[1];
  // 401 est le code pour dire "interdit"
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    // on vérifie le token
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // on enrichie la requête en y plaçant l'id du user
    // on décode le token qui nous donne le user.id
    // on pourra donc aller piocher dans req.userId depuis les contrôleurs.
    req.userId = decoded.userId;
    // passe la requête au middleware suivant,
    // ou au controller qui res.send/res.json si c'est le dernier middleware
    next();
  } catch (error) {
    // problème on interdit en répondant tout de même, par un 401
    res.status(401).json({ error: 'Invalid token' });
  }
};

// exemple d'utilisation (simple insertion du nom de la fonction en deuxième argument)
// router.get('/', verifyToken, function(req, res)) {...})
