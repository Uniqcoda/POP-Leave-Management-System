// This is an application for managing the way staff members go on leave in an organisation. It uses prototype oriented programming and test driven development.
let database = {
    staff: [],
    request: []
}

// staff constructor function
function Staff(name, email) {
    this.name = name;
    this.email = email;
    this.staffId =
        (database.staff.length) ? database.staff[database.staff.length - 1].staffId + 1 : 1;
}

Staff.prototype.saveDetails = function () {
    database.staff.push(this);
}

// admin constructor function
function Admin(name, email) {
    Staff.call(this, name, email);
    this.isAdmin = true;
}

Admin.prototype = Object.create(Staff.prototype);
Admin.prototype.constructor = Admin;

// request constructor function
function Request(duration, leaveType, staffId) {
    this.staffId = staffId;
    this.duration = duration;
    this.leaveType = leaveType;
    this.id = 
    (database.request.length) ? database.request[database.request.length - 1].id + 1 : 1;
    database.request.push(this);
}

Request.prototype.makeRequest = function (duration, leaveType, staffId) {
    new Request(duration, leaveType, staffId)
}

// Staff makes a request for leave
Staff.prototype.makeRequest = function (duration, leaveType) {
    Request.prototype.makeRequest(duration, leaveType, staffId = this.staffId)
}

// Staff reads own leave request(s)
Staff.prototype.readOwnRequests = function () {
    let array = []
    for (let i = 0; i < database.request.length; i++) {
        if (database.request[i].staffId === this.staffId) {
            array.push(database.request[i])
        }
    }
    if (array.length) return array;
    return 'staff has no leave request record!';
}

// Admin reads a leave request by leave id
Admin.prototype.readRequestById = function (id) {
    for (let i = 0; i < database.request.length; i++) {
        if (database.request[i].id === id) {
            return database.request[i];
        }
    }
    return 'id not found!';
};

// Admin approves a leave request by id
Admin.prototype.approveRequest = function (id) {
    for (let i = 0; i < database.request.length; i++) {
        if (database.request[i].id === id) {
            database.request[i].isApproved = true;
            return database.request[i];
        }
    }
    return 'id not found!';
};

// Admin declines a leave request by id
Admin.prototype.declineRequest = function (id) {
    for (let i = 0; i < database.request.length; i++) {
        if (database.request[i].id === id) {
            database.request[i].isApproved = false;
            return database.request[i];
        }
    }
    return 'id not found!';
}

// Admin reads all leave requests history unique to staff by the staff id
Admin.prototype.readAllRequestsByStaffId = function (id) {
    let staffRequests = [];
    for (let i = 0; i < database.request.length; i++) {
        if (database.request[i].staffId === id) {
            staffRequests.push(database.request[i])
        }
    }
    if (staffRequests.length) return staffRequests;
    return 'id not found!';
}

// Admin reads all leave requests in the database
Admin.prototype.readAllRequests = function () {
    return database.request;
}

module.exports.database = database;
module.exports.Staff = Staff;
module.exports.Admin = Admin;
