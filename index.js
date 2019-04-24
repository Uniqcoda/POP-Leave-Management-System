let database = {
    staff: [],
    request: []
}


function Staff(name, email) {
    this.name = name;
    this.email = email;
    this.id = (database.staff.length) ? database.staff[database.staff.length - 1] + 1: 1;
}

Staff.prototype.saveDetails = function () {
    database.staff.push(this);
}


// Staff requests for leave

// Staff reads his/her leave request(s)

// Admin reads a leave request by leave id

// Admin approves a leave request

// Admin rejects a leave request

// Admin reads all leave requests history unique to staff by the staff id

// Admin reads all leave requests in the database


module.exports.database = database;
module.exports.Staff = Staff;