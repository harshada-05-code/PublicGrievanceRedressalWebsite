const path=require('path');

const express=require('express');
const adminRouter=express.Router();
const rootDir=require('../Utils/pathUtils');

const adminController=require('../controllers/adminController');    

adminRouter.get('/adminDashboard',(req, res) => {
    adminController.adminDashboard(req, res);
});
adminRouter.get('/adminLogin',(req, res) => {
    adminController.adminLogin(req, res);
});
adminRouter.post('/adminLogin',(req, res) => {
    adminController.adminLoginPost(req, res);
});
adminRouter.get('/adminLogout',(req, res) => {
    adminController.adminLogout(req, res);
});
adminRouter.get('/viewComplaints',(req, res) => {
    adminController.viewComplaints(req, res);
});
adminRouter.get('/viewComplaintDetails/:complaintId',(req, res) => {
    adminController.viewComplaintDetails(req, res);
});
adminRouter.post('/updateComplaintStatus/:complaintId',(req, res) => {
    adminController.updateComplaintStatus(req, res);
});
adminRouter.get('/viewUsers',(req, res) => {
    adminController.viewUsers(req, res);
});
adminRouter.get('/viewUserDetails/:userId',(req, res) => {
    adminController.viewUserDetails(req, res);
});
adminRouter.post('/blockUser/:userId',(req, res) => {
    adminController.blockUser(req, res);
});
adminRouter.post('/unblockUser/:userId',(req, res) => {
    adminController.unblockUser(req, res);
});

module.exports=adminRouter;
