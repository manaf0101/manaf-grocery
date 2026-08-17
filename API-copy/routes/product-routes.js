const express =  require('express')

const router = express.Router()

const productControllers =  require('../controllers/products-controllers')


router.post('/add-users' , productControllers.postNewUser)
router.get("/users", productControllers.getUsers);

module.exports = router
