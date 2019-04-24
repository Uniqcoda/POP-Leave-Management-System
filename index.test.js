let database = require('./index').database;
let Staff = require('./index').Staff;
let Admin = require('./index').Admin;

let Ola = new Staff('Ola', 'ola@ola.com');
Ola.saveDetails();
let Charles = new Admin('Charles', 'charles@charles.com');
Charles.saveDetails();

describe('Test cases for staff', function () {
    describe('Test for creating a staff', function () {
        //should check if the new staff was created with the right details
        test('should check if the new staff was created with the right details', function () {
            expect(database.staff[0]).toHaveProperty('name', 'Ola');
            expect(database.staff[0]).toHaveProperty('email', 'ola@ola.com');
        })
    })

    describe('Test for creating an admin', function () {
        //should check if the new admin was created with the right details
        test('should check if the new admin was created with the right details', function () {
            expect(database.staff[1]).toHaveProperty('isAdmin', true);
        })
    })
})