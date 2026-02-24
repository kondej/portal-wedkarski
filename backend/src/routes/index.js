const express = require('express');
const { body } = require('express-validator');
const { auth, checkRole } = require('../middleware/auth');

const authController = require('../controllers/authController');
const polowController = require('../controllers/polowController');
const lowiskoController = require('../controllers/lowiskoController');
const gatunekController = require('../controllers/gatunekController');

const router = express.Router();

// Uwierzytelnianie

router.post('/auth/register', [
    body('imie').notEmpty().withMessage('Imię jest wymagane!'),
    body('nazwisko').notEmpty().withMessage('Nazwisko jest wymagane!'),
    body('email').isEmail().withMessage('Podaj prawidłowy adres email!'),
    body('haslo').isLength({ min: 6 }).withMessage('Hasło musi mieć co najmniej 6 znaków!')
], authController.register);

router.post('/auth/login', [
    body('email').isEmail().withMessage('Podaj prawidłowy adres email!'),
    body('haslo').notEmpty().withMessage('Hasło jest wymagane!')
], authController.login);

router.get('/auth/user', auth, authController.getUser);

// Połowy

router.get('/polowy', auth, polowController.getAllUserPolowy);
router.get('/polowy/:id', auth, polowController.getPolow);

router.get('/polowy-wszystkie', [
    auth,
    checkRole('administrator')
], polowController.getAllPolowy);

router.post('/polowy', [
    auth,
    body('data').isISO8601().withMessage('Podaj prawidłową datę!'),
    body('waga').isFloat({ gt: 0 }).withMessage('Waga musi być liczbą większą od 0!'),
    body('uzytkownik').isInt().withMessage('Podaj prawidłowe ID użytkownika!'),
    body('lowisko').isInt().withMessage('Podaj prawidłowe ID łowiska!'),
    body('gatunek').isInt().withMessage('Podaj prawidłowe ID gatunku!')
], polowController.createPolow);

router.put('/polowy/:id', [
    auth,
    body('data').optional().isISO8601().withMessage('Podaj prawidłową datę!'),
    body('waga').optional().isFloat({ gt: 0 }).withMessage('Waga musi być liczbą większą od 0!'),
    body('lowisko').optional().isInt().withMessage('Podaj prawidłowe ID łowiska!'),
    body('gatunek').optional().isInt().withMessage('Podaj prawidłowe ID gatunku!')
], polowController.updatePolow);

router.delete('/polowy/:id', auth, polowController.deletePolow);



router.get('/lowiska', lowiskoController.getAllLowiska);
router.get('/lowiska/:id', lowiskoController.getLowisko);

router.post('/lowiska', [
    auth,
    checkRole('administrator'),
    body('nazwa').notEmpty().withMessage('Nazwa łowiska jest wymagana!'),
    body('lokalizacja').notEmpty().withMessage('Lokalizacja łowiska jest wymagana!'),
    body('typ').isInt().withMessage('Typ łowiska jest wymagany!'),
    body('opis').optional()
], lowiskoController.createLowisko);

router.put('/lowiska/:id', [
    auth,
    checkRole('administrator'),
    body('nazwa').optional().notEmpty().withMessage('Nazwa łowiska jest wymagana!'),
    body('lokalizacja').optional().notEmpty().withMessage('Lokalizacja łowiska jest wymagana!'),
    body('typ').optional().isInt().withMessage('Typ łowiska jest wymagany!'),
    body('opis').optional()
], lowiskoController.updateLowisko);

router.delete('/lowiska/:id', auth, checkRole('administrator'), lowiskoController.deleteLowisko);

router.get('/lowiska-typy', lowiskoController.getTypyLowisk);



router.get('/gatunki', gatunekController.getAllGatunki);
router.get('/gatunki/:id', gatunekController.getGatunek);

router.post('/gatunki', [
    auth,
    checkRole('administrator'),
    body('nazwa').notEmpty().withMessage('Nazwa gatunku jest wymagana!')
], gatunekController.createGatunek);

router.put('/gatunki/:id', [
    auth,
    checkRole('administrator'),
    body('nazwa').notEmpty().withMessage('Nazwa gatunku jest wymagana!')
], gatunekController.updateGatunek);

router.delete('/gatunki/:id', auth, checkRole('administrator'), gatunekController.deleteGatunek);

module.exports = router;