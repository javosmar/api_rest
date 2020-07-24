const { Router } = require('express');
const router = Router();

router.get('/', (req,res) => {
    res.json({"Title":"Holis"});
});

router.get('/test', (req,res) => {
    res.json({"Title":"chau"});
});

module.exports = router;
