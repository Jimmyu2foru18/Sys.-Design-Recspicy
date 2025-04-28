<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { 
    createSupportTicket,
    getUserTickets,
    getTicketById,
    addTicketMessage,
    updateTicketStatus,
    getAllTickets
} = require('../controllers/supportController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, createSupportTicket);
router.get('/', protect, getUserTickets);
router.get('/:id', protect, getTicketById);
router.post('/:id/message', protect, addTicketMessage);

router.put('/:id/status', protect, updateTicketStatus);
router.get('/admin/all', protect, getAllTickets);

=======
const express = require('express');
const router = express.Router();
const { 
    createSupportTicket,
    getUserTickets,
    getTicketById,
    addTicketMessage,
    updateTicketStatus,
    getAllTickets
} = require('../controllers/supportController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, createSupportTicket);
router.get('/', protect, getUserTickets);
router.get('/:id', protect, getTicketById);
router.post('/:id/message', protect, addTicketMessage);

router.put('/:id/status', protect, updateTicketStatus);
router.get('/admin/all', protect, getAllTickets);

>>>>>>> 088e4bc57b5299788084a8bd1b5330d0213972cb
module.exports = router; 