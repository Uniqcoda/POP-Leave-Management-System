let database = {
    staff: [],
    request: []
}

// staff constructor
function Staff(name, email) {
    this.name = name;
    this.email = email;
    this.staffId = (database.staff.length) ? database.staff[database.staff.length - 1].staffId + 1 : 1;
}

Staff.prototype.saveDetails = function () {
    database.staff.push(this);
}

// admin constructor
function Admin(name, email) {
    Staff.call(this, name, email);
    this.isAdmin = true;
}

Admin.prototype = Object.create(Staff.prototype);
Admin.prototype.constructor = Admin;

// request constructor
function Request(duration, leaveType, staffId) {
    this.staffId = staffId;
    this.duration = duration;
    this.leaveType = leaveType;
    this.id = (database.request.length) ? database.request[database.request.length - 1].id + 1 : 1;
    database.request.push(this);
}

Request.prototype.makeRequest = function (duration, leaveType, staffId) {
    new Request(duration, leaveType, staffId)
}

// Staff makes request for leave
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
Staff.prototype.readRequestById = function (id) {
    if (this.isAdmin) {
        for (let i = 0; i < database.request.length; i++) {
            if (database.request[i].id === id) {
                return database.request[i];
            }
        }
        return 'id not found!';
    }
    return 'Access denied!';
};

// Admin approves a leave request by id
Staff.prototype.approveRequest = function (id) {
    if (this.isAdmin) {
        for (let i = 0; i < database.request.length; i++) {
            if (database.request[i].id === id) {
                database.request[i].isApproved = true;
                return database.request[i];
            }
        }
        return 'id not found!';
    }
    return 'Access denied!';
};

// Admin declines a leave request
Staff.prototype.declineRequest = function (id) {
    if (this.isAdmin) {
        for (let i = 0; i < database.request.length; i++) {
            if (database.request[i].id === id) {
                database.request[i].isApproved = false;
                return database.request[i];
            }
        }
        return 'id not found!';
    }
    return 'Access denied!';
}

// Admin reads all leave requests history unique to staff by the staff id
Staff.prototype.readAllRequestsByStaffId = function (id) {
    let staffRequests = [];
    for (let i = 0; i < database.request.length; i++) {
        if (database.request[i].staffId === id) {
            staffRequests.push(database.request[i])
        } 
    }
    return staffRequests;
}

// Admin reads all leave requests in the database


module.exports.database = database;
module.exports.Staff = Staff;
module.exports.Admin = Admin;