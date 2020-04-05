const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

//getting all user
router.get("/allusers", adminController.get_all_users);

/*---------------------------------------------------------
!!!!!!!!!!!!!!---------Caution-----------!!!!!!!!!!!!!!!!!!
this 2 features was built to help developer deploy website faster,
so some schema of collections don't have enough feild or empty by the fault
you should be carefully use it by making sure the server turns off and reading the schema structure
-----------------------------------------------------------*/
router.post("/addProperty", adminController.add_property);

router.post("/deleteProperty", adminController.delete_property);
/*---------------------------------------------------------
!!!!!!!!!!!!!!---------Caution-----------!!!!!!!!!!!!!!!!!!
-----------------------------------------------------------*/

//cleanning all expired token
router.post("/cleantoken", adminController.clean_token);

router.post("/toggleAdmin/:id", adminController.toggle_admin);

router.post("/toggleDeveloper/:id", adminController.toggle_developer);

module.exports = router;
