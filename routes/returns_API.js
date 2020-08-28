const router = require('express').Router()

router.post('/', async (req,res) =>{
    res.status(401).send('UnAuthrized')
})

module.exports = router;