let database = require('./index').database;
let Staff = require('./index').Staff;
let Admin = require('./index').Admin;

let ola = new Staff('Ola', 'ola@ola.com');
ola.saveDetails();
let charles = new Admin('Charles', 'charles@charles.com');
charles.saveDetails();
let cynthia = new Staff('Cynthia', 'cynth@more.com');
cynthia.saveDetails();
let emeka = new Admin('Emeka', 'emeka@mekus.com');
emeka.saveDetails();

describe('Test cases for staff', function () {
    describe('Test for creating a staff', function () {
        //should check if the new staff was created with the right details
        test('should check if the new staff was created with the right details', function () {
            let result = database.staff[0];
            expect(result).toHaveProperty('name', 'Ola');
            expect(result).toHaveProperty('email', 'ola@ola.com');
        })
    })

    describe('Test for creating an admin', function () {
        //should check if the new admin was created with the right details
        test('should check if the new admin was created with the right details', function () {
            expect(database.staff[1]).toHaveProperty('isAdmin', true);
        })
    })
});

ola.makeRequest('1 week', 'annual');
charles.makeRequest('1 month', 'sick');
cynthia.makeRequest('2 months', 'maternity');
ola.makeRequest('1 week', 'annual');

describe('Test cases for leave management', function () {
    describe('Test for staff making a leave request', function () {
        // should check if the new request was created with the right details
        test('should check if the new request was created with the right details', function () {
            let result = database.request[0];
            expect(result).toHaveProperty('staffId', 1);
            expect(result).toHaveProperty('duration', '1 week')
        })
    });
    describe('Test for staff reading own leave request', function () {
        // should return all leave requests of staff
        test('should read all leave requests of staff', function () {
            let result = ola.readOwnRequests();
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
        test('should deny access to non_admin', function () {
            let result = cynthia.readRequestById(2);
            expect(result).toBe('Access denied!')
        })
    });
    describe('Test for approving a leave request by id', function () {
        // should add an approval parameter to a leave request
        test('should add an approval property to a leave request and make it true', function () {
            let result = emeka.approveRequest(1);
            expect(result).toHaveProperty('isApproved', true);
            console.log(database.request[0]);
        });
        // should return a message if there is no request with such id
        test('should return a message if there is no request with such id', function () {
            let result = emeka.approveRequest(25);
            expect(result).toBe('id not found!');
        });
        // should deny access to non_admin
        test('should deny access to non_admin', function () {
            let result = ola.approveRequest(2);
            expect(result).toBe('Access denied!')
        });
    });

    describe('Test for declining a leave request by id', function () {
        // should add an approval parameter to a leave request
        test('should add an approval property to a leave request and make it false', function () {
            let result = emeka.declineRequest(4);
            expect(result).toHaveProperty('isApproved', false);
            console.log(database.request[3]);
        });
        // should return a message if there is no request with such id
        test('should return a message if there is no request with such id', function () {
            let result = emeka.declineRequest(25);
            expect(result).toBe('id not found!');
        });
        // should deny access to non_admin
        test('should deny access to non_admin', function () {
            let result = ola.declineRequest(2);
            expect(result).toBe('Access denied!')
        });
    });

    describe('Test for reading all leave requests by a staff', function () {
        // should return all leave requests by staff id
        test('should return all leave request by staff id', function () {
            let result = charles.readAllRequestsByStaffId(1);
            expect(result.length).toBe(2)
        });
        // should return a message if there is no staff with such id
        test('should return a message if there is no staff with such id', function () {
            let result = charles.readAllRequestsByStaffId(25);
            expect(result).toBe('id not found!');
        });
        // should deny access to non-admin
        test('should deny access to non_admin', function () {
            let result = ola.readAllRequestsByStaffId(3);
            expect(result).toBe('Access denied!')
        });
    });
    describe('Test for reading all leave requests in the database', function () {
        // should read all leave requests in database
        test('should return all leave requests in the database', function () {
            let result = charles.readAllRequests();
            expect(result.length).toBe(4)
        });
        // should deny access to non-admin
        test('should deny access to non_admin to read all requests in database', function () {
            let result = ola.readAllRequests();
            expect(result).toBe('Access denied!')
        });
    })
})


