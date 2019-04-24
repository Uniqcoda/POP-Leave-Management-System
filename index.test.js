let database = require('./index').database;
let Staff = require('./index').Staff;
let Admin = require('./index').Admin;

let ola = new Staff('Ola', 'ola@ola.com');
ola.saveDetails();
let charles = new Admin('Charles', 'charles@charles.com');
charles.saveDetails();

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
            expect(result.length).toBe(database.request.length)
        });

        // should return a staff's leave request by id
    })
})

console.log(database);
