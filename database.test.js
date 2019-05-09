let database = require('./database').database;
let Staff = require('./database').Staff;
let Admin = require('./database').Admin;

let ola = new Staff('Ola', 'ola@ola.com');
ola.save();
let charles = new Admin('Charles', 'charles@charles.com');
charles.save();
let cynthia = new Staff('Cynthia', 'cynth@more.com');
cynthia.save();
let emeka = new Admin('Emeka', 'emeka@mekus.com');
emeka.save();

describe('Test cases for staff', function () {
    describe('Test for creating a staff', function () {
        test('should check if the new staff was created with the right details', function () {
            let result = database.staff[0];
            expect(result).toHaveProperty('name', 'Ola');
            expect(result).toHaveProperty('email', 'ola@ola.com');
        })
    })

    describe('Test for creating an admin', function () {
        test('should check if the new admin was created with the right details', function () {
            expect(database.staff[1]).toHaveProperty('isAdmin', true);
        })
    })
});

ola.createRequest('20 days', 'annual');
charles.createRequest('10 days', 'sick');
cynthia.createRequest('60 days', 'maternity');
charles.createRequest('20 days', 'annual');

describe('Test cases for leave management', function () {
    describe('Test for staff making a leave request', function () {
        test('should check if the new request was created with the right details', function () {
            let result = database.leaveRequest[0];
            expect(result).toHaveProperty('staffId', 1);
            expect(result).toHaveProperty('duration', '20 days')
        })
    });
    describe('Test for staff reading own leave request', function () {
        test('should read all leave requests of staff', function () {
            let result = charles.readOwnRequests();
            expect(result.length).toBe(2)
        });
        test('should return a message if staff has no leave request record', function () {
            let result = emeka.readOwnRequests();
            expect(result).toBe('staff has no leave request record!')
        })
    });
    describe('Test for reading leave request by id', function () {
        test('should return a request by id', function () {
            let result = charles.readRequestById(1);
            expect(result).toHaveProperty('leaveType', 'annual');
        })
        test('should return a message if there is no request with such id', function () {
            let result = charles.readRequestById(25);
            expect(result).toBe('id not found!');
        });
    });

    describe('Test for approving a leave request by id', function () {
        test('should add an approval property to a leave request and make it true', function () {
            let result = emeka.approveRequest(1);
            expect(result).toHaveProperty('isApproved', true);
        });
        test('should return a message if there is no request with such id', function () {
            let result = emeka.approveRequest(25);
            expect(result).toBe('id not found!');
        });
    });

    describe('Test for declining a leave request by id', function () {
        test('should add an approval property to a leave request and make it false', function () {
            let result = emeka.rejectRequest(4);
            expect(result).toHaveProperty('isApproved', false);
        });
        test('should return a message if there is no request with such id', function () {
            let result = emeka.rejectRequest(25);
            expect(result).toBe('id not found!');
        });
    });

    describe('Test for reading all leave requests by a staff', function () {
        test('should return all leave request by staff id', function () {
            let result = emeka.readAllRequestsByStaffId(3);
            expect(result.length).toBe(1)
        });
        test('should return a message if there is no staff with such id', function () {
            let result = charles.readAllRequestsByStaffId(25);
            expect(result).toBe('id not found!');
        });
    });

    describe('Test for reading all leave requests in the database', function () {
        test('should return all leave requests in the database', function () {
            let result = charles.readAllRequests();
            expect(result.length).toBe(4)
        });
    });
})