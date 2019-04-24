# POP Leave Management System
This is an application for managing the way staff members go on leave in an organisation. It uses **prototype oriented programming and test driven development**.

The application has a **database that saves every employee and admin staff**, as well as saves every leave request. It is designed such that **every user is a staff** and has some features such as **name and email**. Then each staff can be either a **regular staff** or an **admin staff**.  

1. The regular staff shares the name and email properties but has the following methods unique to it;
* Request for leave
* Read his/her leave request(s)

2. The admin staff shares the name and email properties but has the following methods unique to it;
* Read a leave request by leave id
* Approve a leave request
* Reject a leave request
* Read all leave requests history unique to staff by the staff id
* Read all leave request in the database

3. Every leave request is saved in the in the database and should contain the following properties;
* Staff id
* Leave duration
* Leave type
* Leave id

