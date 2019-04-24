let database = require('./index').database;
let Staff = require('./index').Staff;

let Ola = new Staff('Ola', 'ola@ola.com');
Ola.saveDetails();

describe('Test cases for staff', function () {
    describe('Test for creating a staff', function () {
        //should check if the new staff was created with the right details
        test('should check if the new staff was created with the right details', function () {
            expect(database.staff[0]).toHaveProperty('name', 'Ola');
            expect(database.staff[0]).toHaveProperty('email', 'ola@ola.com');
        })
    })
})