var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
var app = express();
const upload = multer({ dest: 'uploads/' });
const nodemailer = require('nodemailer');
const { format } = require('date-fns');
const { th } = require('date-fns/locale');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  path: '/qmanagement/api/bookings',
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const db = mysql.createConnection({
    host: 'se.mfu.ac.th',
    user: 'qmanagement',
    password: 'qm2023',
    database: 'qmanagement_db',
});

db.connect((err) => {
    if (err) throw err;
    console.log('connected to mysql...');
});

var port = process.env.PORT ||8242;
httpServer.listen(port, () => {
    console.log('Running on port 8242');
});
module.exports = app;

//login
app.get('/login',(req, res) => {
    let sql = 'SELECT * FROM users WHERE citizen_num ='+ req.query.user+' AND HN_code ='+ req.query.pass+' AND status_ID=1';
    let query = db.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
  
function sendPasswordEmail(userEmail, userPassword) {
console.log('User Email:', userEmail);

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'mfuwellness@gmail.com',
    pass: 'hekr npix vnot vsgs',
  },
});

    const mailOptions = {
        from: 'mfuwellness@gmail.com',
        to: userEmail,
        subject: 'รหัสผ่านสำหรับบัญชีของคุณ',
        text: `รหัสผ่าน: ${userPassword} โปรดทราบว่านี่เป็นข้อมูลที่สำคัญ กรุณาเก็บรักษาไว้ในที่ปลอดภัย และหลีกเลี่ยงการแจ้งรหัสผ่านนี้กับบุคคลที่ไม่ใช่เจ้าของบัญชี`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

//forgot password
app.get('/forgothn', (req, res) => {
  let sql = 'SELECT * FROM users WHERE citizen_num = ? AND email = ? AND status_ID = 1';
  let values = [req.query.user, req.query.pass];

  let query = db.query(sql, values, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      if (results.length > 0) {
        const userEmail = results[0].email;
        const userPassword = results[0].HN_code;
        sendPasswordEmail(userEmail, userPassword);
      }
    }
  });
});

app.get('/forgotemp', (req, res) => {
  let sql = 'SELECT * FROM admins WHERE citizen_num = ? AND email = ?';
  let values = [req.query.user, req.query.pass];

  let query = db.query(sql, values, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      if (results.length > 0) {
        const userEmail = results[0].email;
        const userPassword = results[0].emp_code;
        sendPasswordEmail(userEmail, userPassword);
      }
    }
  });
});

app.get('/forgotstudent', (req, res) => {
  let sql = 'SELECT * FROM students WHERE citizen_num = ? AND email = ? AND status_ID = 1';
  let values = [req.query.user, req.query.pass];

  let query = db.query(sql, values, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      if (results.length > 0) {
        const userEmail = results[0].email;
        const userPassword = results[0].password;
        sendPasswordEmail(userEmail, userPassword);
      }
    }
  });
});
  
//login admin  
app.get('/adminlogin',(req, res) => {
    let sql = 'SELECT * FROM admins WHERE citizen_num ='+ req.query.user+' AND emp_code ='+ req.query.pass;
    let query = db.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

//login student
app.get('/studentlogin',(req, res) => {
    let sql = 'SELECT * FROM students WHERE STD_ID ='+ req.query.user+' AND password ="'+ req.query.pass+'" AND status_ID=1';
    let query = db.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
  
//get all type
app.get('/type', (req, res) => {
    db.query('SELECT * FROM type', (err, result, fields) => {
        try {
            res.send({ err: false, data: result, msg: 'Get all type' });
        } catch (err) {
            console.log(err);
            res.send({ err: true, data: result, msg: err + '' });
        }
    });
});

//get all check up main services
app.get('/services', (req, res) => {
    let sql = 'SELECT service.service_name FROM service JOIN type ON service.type_ID=type.type_ID WHERE service.type_ID=' + req.query.typeId+' GROUP BY service.service_name;'
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all services
app.get('/checkup', (req, res) => {
    let sql = 'SELECT service.service_name, service_price FROM service WHERE service.service_ID='+req.query.serviceId;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all ages
app.get('/ages', (req, res) => {
    let sql = 'SELECT DISTINCT age.age_ID, age.age_detail FROM service JOIN age ON service.age_ID=age.age_ID JOIN type ON service.type_ID=type.type_ID WHERE service.type_ID=' + req.query.typeId;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all genders
app.get('/gender', (req, res) => {
    let sql = 'SELECT * FROM gender';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get checkup prices
app.get('/prices', (req, res) => {
    let sql = 'SELECT service.service_price FROM service JOIN age ON service.age_ID = age.age_ID JOIN gender ON service.gender_ID = gender.gender_ID WHERE service.service_name ="' + req.query.serviceName+' "AND service.age_ID ='+req.query.ageId+' AND gender.gender_ID ='+req.query.genderId;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all vaccine services
app.get('/vaccine', (req, res) => {
    let sql = 'SELECT service.service_ID, service.service_name, service.service_price FROM service JOIN age ON service.age_ID=age.age_ID JOIN type ON service.type_ID=type.type_ID WHERE service.type_ID=' + req.query.typeId + ' AND service.age_ID=' + req.query.ageId+' GROUP BY service.service_name';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all antiaging services
app.get('/antiaging', (req, res) => {
    let sql = 'SELECT DISTINCT service.service_ID, service.service_name FROM service JOIN type ON service.type_ID=type.type_ID WHERE service.type_ID=' + req.query.typeId;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all subservices
app.get('/subservices', (req, res) => {
    db.query('SELECT subservice.service_ID, subservice.subservice_ID, subservice.subservice_name, subservice.subservice_price FROM subservice JOIN service ON subservice.service_ID=service.service_ID WHERE subservice.service_ID=' + req.query.serviceId, (err, result, fields) => {
        try {
            res.send({ err: false, data: result, msg: 'Get all subservices' });
        } catch (err) {
            console.log(err);
            res.send({ err: true, data: result, msg: err + '' });
        }
    });
});

//get all category
app.get('/category', (req, res) => {
    let sql = 'SELECT * FROM category';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all checkup subservices
app.get('/checkupsub', (req, res) => {
    let sql = 'SELECT subservice.subservice_ID, subservice.subservice_name, subservice.subservice_price FROM subservice JOIN service ON subservice.service_ID=service.service_ID JOIN category ON subservice.category_ID=category.category_ID WHERE subservice.category_ID='+req.query.categoryId+' AND subservice.service_ID=' +req.query.serviceId;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//add new booking
app.post('/booking', (req, res) => {
    let booking = req.body;
    console.log('request body', req.body);
    db.query('SELECT * FROM booking WHERE booking_date = ? AND booking_time = ? AND HN_code = ?', [req.body.booking_date, req.body.booking_time, req.body.HN_code], (err, bookingResults) => {
        if (err) {
            res.status(500).send(JSON.stringify({ "status": 500, "error": "Error checking bookings.", "response": null }));
        } else if (bookingResults.length > 0) {
            res.status(400).send(JSON.stringify({ "status": 400, "error": "Booking with the same date and time already exists.", "response": null }));
        } else {
            db.query('INSERT INTO booking SET ?', booking, (err, result, fields) => {
                try {
                    console.log(booking);
                    res.send({ err: false, data: result, msg: 'Add new booking successfully' });
                } catch (err) {
                    console.log(err);
                    res.send({ err: true, data: result, msg: err + '' });
                }
            });
        }
    });
});


//add new student booking
app.post('/studentbooking', (req, res) => {
    let booking = req.body;
    console.log('request body', req.body);
    db.query('SELECT * FROM booking_students WHERE booking_date = ? AND booking_time = ? AND STD_ID = ?', [req.body.booking_date, req.body.booking_time, req.body.STD_ID], (err, bookingResults) => {
        if (err) {
            res.status(500).send(JSON.stringify({ "status": 500, "error": "Error checking bookings.", "response": null }));
        } else if (bookingResults.length > 0) {
            res.status(400).send(JSON.stringify({ "status": 400, "error": "Booking with the same date and time already exists.", "response": null }));
        } else {
            db.query('INSERT INTO booking_students SET ?', booking, (err, result, fields) => {
                try {
                    console.log(booking);
                    res.send({ err: false, data: result, msg: 'Add new booking successfully' });
                } catch (err) {
                    console.log(err);
                    res.send({ err: true, data: result, msg: err + '' });
                }
            });
        }
    });
});

//get all booking
app.get('/bookings', (req, res) => {
    let sql = 'SELECT DISTINCT booking.HN_code, users.name, type.type_name, booking.booking_date, booking.booking_time, status.status_name FROM `booking` JOIN users ON booking.HN_code=users.HN_code JOIN service ON booking.service_ID=service.service_ID JOIN type ON service.type_ID=type.type_ID JOIN status ON booking.status_ID=status.status_ID ORDER BY booking.booking_date, CASE WHEN booking.booking_time LIKE "%ช่วงเช้า%" THEN 1 WHEN booking.booking_time LIKE "%ช่วงบ่าย%" THEN 2 ELSE 3 END, booking.booking_time;';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        io.emit('bookings', results);
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all studentbooking
app.get('/studentbookings', (req, res) => {
    let sql = 'SELECT DISTINCT booking_students.STD_ID, students.name, booking_students.booking_date, booking_students.booking_time, status.status_name FROM `booking_students` JOIN students ON booking_students.STD_ID=students.STD_ID JOIN service ON booking_students.service_ID=service.service_ID JOIN status ON booking_students.status_ID=status.status_ID ORDER BY booking_students.booking_date, CASE WHEN booking_students.booking_time LIKE "%ช่วงเช้า%" THEN 1 WHEN booking_students.booking_time LIKE "%ช่วงบ่าย%" THEN 2 ELSE 3 END, booking_students.booking_time;';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all approve booking
app.get('/appbookings', (req, res) => {
    let sql = 'SELECT DISTINCT booking.HN_code, users.name, type.type_name, booking.booking_date, booking.booking_time FROM `booking` JOIN users ON booking.HN_code=users.HN_code JOIN service ON booking.service_ID=service.service_ID JOIN type ON service.type_ID=type.type_ID WHERE booking.status_ID=1;';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all unapprove booking
app.get('/unappbookings', (req, res) => {
    let sql = 'SELECT DISTINCT booking.HN_code, users.name, type.type_name, booking.booking_date, booking.booking_time FROM `booking` JOIN users ON booking.HN_code=users.HN_code JOIN service ON booking.service_ID=service.service_ID JOIN type ON service.type_ID=type.type_ID WHERE booking.status_ID=2;';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all approve student booking
app.get('/studentappbookings', (req, res) => {
    let sql = 'SELECT DISTINCT booking_students.STD_ID, students.name, booking_students.booking_date, booking_students.booking_time FROM `booking_students` JOIN students ON booking_students.STD_ID=students.STD_ID JOIN service ON booking_students.service_ID=service.service_ID WHERE booking_students.status_ID=1;';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all upapprove student booking
app.get('/studentunappbookings', (req, res) => {
    let sql = 'SELECT DISTINCT booking_students.STD_ID, students.name, booking_students.booking_date, booking_students.booking_time FROM `booking_students` JOIN students ON booking_students.STD_ID=students.STD_ID JOIN service ON booking_students.service_ID=service.service_ID WHERE booking_students.status_ID=2;';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all approve booking by date and times
app.get('/totalqueues', (req, res) => {
    let sql = 'SELECT DISTINCT booking.HN_code, users.name, type.type_name, booking.booking_date, booking.booking_time FROM `booking` JOIN users ON booking.HN_code=users.HN_code JOIN service ON booking.service_ID=service.service_ID JOIN type ON service.type_ID=type.type_ID WHERE booking.status_ID=1 AND booking.booking_date="'+req.query.selectedDate+'" AND booking.booking_time="'+req.query.selectedTime+'" AND type.type_ID='+req.query.typeId;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all approve booking by date and times
app.get('/totalstudentqueues', (req, res) => {
    let sql = 'SELECT booking_students.STD_ID, students.name, booking_students.booking_date, booking_students.booking_time FROM booking_students JOIN students ON booking_students.STD_ID = students.STD_ID JOIN service ON booking_students.service_ID = service.service_ID WHERE booking_students.status_ID = 1 AND booking_students.booking_date ="'+req.query.selectedDate+'" AND booking_students.booking_time = "'+req.query.selectedTime+'"';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all total count of each type
app.get('/totalcount', (req, res) => {
    let sql = 'SELECT type.type_name AS service_type, COUNT(DISTINCT CASE WHEN DATE(booking.booking_date) >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) THEN CONCAT(booking.HN_code, booking.booking_date, booking.booking_time) ELSE NULL END) AS  total_queue_count_yearly, COUNT(DISTINCT CASE WHEN YEAR(booking.booking_date) = YEAR(CURDATE()) AND MONTH(booking.booking_date) = MONTH(CURDATE()) THEN CONCAT(booking.HN_code, booking.booking_date, booking.booking_time) ELSE NULL END) AS  total_queue_count_monthly, COUNT(DISTINCT CASE WHEN DATE(booking.booking_date) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN CONCAT(booking.HN_code, booking.booking_date, booking.booking_time) ELSE NULL END) AS total_queue_count_last_7_days FROM booking JOIN service ON booking.service_ID = service.service_ID JOIN type ON service.type_ID = type.type_ID WHERE booking.status_ID = 1 GROUP BY service_type';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all total unapprove count of each type
app.get('/totalunappcount', (req, res) => {
    let sql = 'SELECT type.type_name AS service_type, COUNT(DISTINCT CASE WHEN DATE(booking.booking_date) >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) THEN CONCAT(booking.HN_code, booking.booking_date, booking.booking_time) ELSE NULL END) AS  total_queue_count_yearly, COUNT(DISTINCT CASE WHEN YEAR(booking.booking_date) = YEAR(CURDATE()) AND MONTH(booking.booking_date) = MONTH(CURDATE()) THEN CONCAT(booking.HN_code, booking.booking_date, booking.booking_time) ELSE NULL END) AS  total_queue_count_monthly, COUNT(DISTINCT CASE WHEN DATE(booking.booking_date) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN CONCAT(booking.HN_code, booking.booking_date, booking.booking_time) ELSE NULL END) AS total_queue_count_last_7_days FROM booking JOIN service ON booking.service_ID = service.service_ID JOIN type ON service.type_ID = type.type_ID WHERE booking.status_ID = 2 GROUP BY service_type';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get booking by id
app.get('/booking', (req, res) => {
    let sql = 'SELECT DISTINCT type.type_name, DATE_FORMAT(booking.booking_date,"%Y-%m-%d") AS booking_date, booking.booking_time, status.status_name FROM `booking` JOIN status ON booking.status_ID=status.status_ID JOIN service ON booking.service_ID=service.service_ID LEFT JOIN subservice ON booking.subservice_ID=subservice.subservice_ID JOIN type ON service.type_ID=type.type_ID WHERE HN_code='+req.query.hnCode+' ORDER BY booking.booking_date, CASE WHEN booking.booking_time LIKE "%ช่วงเช้า%" THEN 1 WHEN booking.booking_time LIKE "%ช่วงบ่าย%" THEN 2 ELSE 3 END, booking.booking_time';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get booking student by id
app.get('/studentbooking', (req, res) => {
    let sql = 'SELECT DISTINCT service.service_name, DATE_FORMAT(booking_students.booking_date,"%Y-%m-%d") AS booking_date, booking_students.booking_time, status.status_name FROM `booking_students` JOIN status ON booking_students.status_ID=status.status_ID JOIN service ON booking_students.service_ID=service.service_ID LEFT JOIN subservice ON booking_students.subservice_ID=subservice.subservice_ID WHERE STD_ID='+req.query.stdId+' ORDER BY booking_students.booking_date, CASE WHEN booking_students.booking_time LIKE "%ช่วงเช้า%" THEN 1 WHEN booking_students.booking_time LIKE "%ช่วงบ่าย%" THEN 2 ELSE 3 END, booking_students.booking_time';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all slip details
app.get('/slip', (req, res) => {
    let sql = 'SELECT users.HN_code, users.name, booking.booking_date, booking.booking_time, type.type_name, service.service_name, subservice.subservice_name, status.status_name FROM `booking` JOIN service ON booking.service_ID=service.service_ID LEFT JOIN subservice ON booking.subservice_ID=subservice.subservice_ID JOIN type ON service.type_ID=type.type_ID JOIN users ON booking.HN_code=users.HN_code JOIN status ON booking.status_ID=status.status_ID WHERE booking.booking_date="'+req.query.date+'" AND booking.booking_time="'+req.query.time+'"  AND booking.HN_code='+req.query.hnCode;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all student slip details
app.get('/studentslip', (req, res) => {
    let sql = 'SELECT students.STD_ID, students.name, booking_students.booking_date, booking_students.booking_time, service.service_name, status.status_name FROM `booking_students` JOIN service ON booking_students.service_ID=service.service_ID LEFT JOIN subservice ON booking_students.subservice_ID=subservice.subservice_ID JOIN students ON booking_students.STD_ID=students.STD_ID  JOIN status ON booking_students.status_ID=status.status_ID WHERE booking_students.booking_date="'+req.query.date+'" AND booking_students.booking_time="'+req.query.time+'"  AND booking_students.STD_ID='+req.query.stdId;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//delete booking
app.delete('/booking', (req, res) => {
    let sql = 'DELETE FROM booking WHERE booking.booking_date="'+req.query.date+'" AND booking.booking_time="'+req.query.time+'" AND booking.HN_code='+req.query.hnCode;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//delete student booking
app.delete('/studentbooking', (req, res) => {
    let sql = 'DELETE FROM booking_students WHERE booking_students.booking_date="'+req.query.date+'" AND booking_students.booking_time="'+req.query.time+'" AND booking_students.STD_ID='+req.query.stdId;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//register
app.post('/users',(req,res)=>{
    let users = req.body;
    db.query('INSERT INTO users SET ?',users,(err,result,fields)=>{
        try{
            console.log(users);
            res.send({err:false,data:result,msg:'Add new users successfully'});
        }catch(err){
            console.log(err);
            res.send({err:true,data:result,msg:err+''});
        }
    });
});

//register
app.post('/admins',(req,res)=>{
    let admins = req.body;
    db.query('INSERT INTO admins SET ?',admins,(err,result,fields)=>{
        try{
           const insertedEmpCode = String(result.insertId).padStart(9, '0');
            console.log(admins);
            res.send({err:false,data:result,msg:'Add new admins successfully'});
            const userEmail = admins.email; 
            const userPassword = insertedEmpCode;
            sendPasswordEmail(userEmail, userPassword);
        }catch(err){
            console.log(err);
            res.send({err:true,data:result,msg:err+''});
        }
    });
});

//register student
app.post('/students',(req,res)=>{
    let users = req.body;
    db.query('INSERT INTO students SET ?',users,(err,result,fields)=>{
        try{
            console.log(users);
            res.send({err:false,data:result,msg:'Add new students successfully'});
        }catch(err){
            console.log(err);
            res.send({err:true,data:result,msg:err+''});
        }
    });
});

//upload students
app.post('/uploadfile', upload.single('excelFile'), async (req, res) => {
  try {
    const file = req.file.path;
    const workbook = xlsx.readFile(file);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Retrieve existing data from the database
    const existingData = await new Promise((resolve, reject) => {
      const query = 'SELECT STD_ID, citizen_num FROM students';
      db.query(query, (err, results) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    // Check if all records in the Excel file already exist in the database
    const allRecordsExist = data.every((row) => {
      return existingData.some(
        (record) =>
          record.STD_ID === row.STD_ID && record.citizen_num === row.citizen_num
      );
    });

    // If all records exist, show the alert
    if (allRecordsExist) {
      return res.status(200).json({ message: 'Data already up to date' });
    }

    // Insert only the records that don't exist in the database
    const recordsToInsert = data.filter((row) => {
      return !existingData.some(
        (record) =>
          record.STD_ID === row.STD_ID && record.citizen_num === row.citizen_num
      );
    });

    if (recordsToInsert.length === 0) {
      return res.status(200).json({ message: 'Data already up to date' });
    }

  const insertPromises = recordsToInsert.map((row) => {
  return new Promise((resolve, reject) => {
    const schoolYear = row.STD_ID.substring(0, 2); 

    const query = `
      INSERT INTO students (STD_ID, citizen_num, status_ID, school_year)
      VALUES (?, ?, 2, ?)`;
    const values = [row.STD_ID, row.citizen_num, schoolYear];

    db.query(query, values, (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
});

    await Promise.all(insertPromises);

    const successMessage = `อัพโหลดข้อมูลนักศึกษาแล้ว ${recordsToInsert.length} ราย`;
    res.status(200).json({ message: successMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

//get all approve users
app.get('/oldusers', (req, res) => {
    let sql = 'SELECT * , status.status_name FROM users JOIN status ON users.status_ID=status.status_ID;';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});
//get all unapprove users
app.get('/unappusers', (req, res) => {
    let sql = 'SELECT * FROM users WHERE users.status_ID=2;';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all students
app.get('/students', (req, res) => {
    let sql = 'SELECT * FROM students';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all approve students
app.get('/appstudents', (req, res) => {
    let sql = 'SELECT * ,status.status_name FROM students JOIN status ON students.status_ID=status.status_ID;';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

app.get('/schoolyear', (req, res) => {
    let sql = 'SELECT DISTINCT school_year FROM `students';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get all users
app.get('/users', (req, res) => {
    let sql = 'SELECT users.*, status.status_name, DATE_FORMAT(users.timestamp, "%Y-%m-%d") AS formatted_date FROM users JOIN status ON users.status_ID = status.status_ID';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get user by id
app.get('/user', (req, res) => {
    let sql = 'SELECT *, status.status_name FROM users JOIN status ON users.status_ID=status.status_ID WHERE HN_code='+req.query.hnCode;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//get student by id
app.get('/student', (req, res) => {
    let sql = 'SELECT * FROM students WHERE STD_ID='+req.query.stdId;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//delete user by id
app.delete('/user', (req, res) => {
    // Check for associated bookings
    const checkBookingsQuery = 'SELECT * FROM booking WHERE HN_code = ?';
    db.query(checkBookingsQuery, [req.query.hnCode], (err, bookingResults) => {
        if (err) {
            res.status(500).send(JSON.stringify({ "status": 500, "error": "Error checking bookings.", "response": null }));
        } else if (bookingResults.length > 0) {
            res.status(400).send(JSON.stringify({ "status": 400, "error": "Student has associated bookings and cannot be deleted.", "response": null }));
        } else {
            const deleteUserQuery = 'DELETE FROM users WHERE HN_code = ?';
            db.query(deleteUserQuery, [req.query.hnCode], (deleteErr, deleteResults) => {
                if (deleteErr) {
                    res.status(500).send(JSON.stringify({ "status": 500, "error": "Error deleting user.", "response": null }));
                } else {
                    res.status(200).send(JSON.stringify({ "status": 200, "error": null, "response": deleteResults }));
                }
            });
        }
    });
});


//delete student by id
app.delete('/student', (req, res) => {
    // Check for associated bookings
    const checkBookingsQuery = 'SELECT * FROM booking_students WHERE STD_ID = ?';
    db.query(checkBookingsQuery, [req.query.stdId], (err, bookingResults) => {
        if (err) {
            res.status(500).send(JSON.stringify({ "status": 500, "error": "Error checking bookings.", "response": null }));
        } else if (bookingResults.length > 0) {
            // The student has associated bookings, return an error response
            res.status(400).send(JSON.stringify({ "status": 400, "error": "Student has associated bookings and cannot be deleted.", "response": null }));
        } else {
            // No associated bookings, proceed with the delete operation
            const deleteStudentQuery = 'DELETE FROM students WHERE STD_ID = ?';
            db.query(deleteStudentQuery, [req.query.stdId], (deleteErr, deleteResults) => {
                if (deleteErr) {
                    res.status(500).send(JSON.stringify({ "status": 500, "error": "Error deleting student.", "response": null }));
                } else {
                    res.status(200).send(JSON.stringify({ "status": 200, "error": null, "response": deleteResults }));
                }
            });
        }
    });
});

//add edit history
app.post('/history',(req,res)=>{
    let history = req.body;
    db.query('INSERT INTO history SET ?',history,(err,result,fields)=>{
        try{
            console.log(history);
            res.send({err:false,data:result,msg:'Add new edit history successfully'});
        }catch(err){
            console.log(err);
            res.send({err:true,data:result,msg:err+''});
        }
    });
});

//get all edit history
app.get('/history', (req, res) => {
    let sql = 'SELECT * FROM history;';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//edit profile
app.put('/users/:HN_code', (req, res) => {
  const updatedUser = req.body;
  const HN_code = req.params.HN_code;

  // check if record exists
  db.query('SELECT * FROM users WHERE HN_code = ?', [HN_code], (err, result) => {
    if (err) {
      console.error(err);
      res.send({ err: true, data: result, message: err + '' });
    } else {
      if (result.length === 0) {
        res.status(404).send({ message: `User with HN_code ${HN_code} not found` });
      } else {
        db.query('UPDATE users SET ? WHERE HN_code = ?', [updatedUser, HN_code], (err, result) => {
          if (err) {
            console.error(err);
            res.send({ err: true, data: result, message: err + '' });
          } else {
            console.log(updatedUser);
            res.send({ err: false, data: result, msg: `Update user by HN_code ${HN_code}` });
          }
        });
      }
    }
  });
});

//edit student profile
app.put('/student/:STD_ID', (req, res) => {
  const updatedUser = req.body;
  const STD_ID = req.params.STD_ID;

  // check if record exists
  db.query('SELECT * FROM students WHERE STD_ID = ?', [STD_ID], (err, result) => {
    if (err) {
      console.error(err);
      res.send({ err: true, data: result, message: err + '' });
    } else {
      if (result.length === 0) {
        res.status(404).send({ message: `User with STD_ID ${STD_ID} not found` });
      } else {
        db.query('UPDATE students SET ? WHERE STD_ID = ?', [updatedUser, STD_ID], (err, result) => {
          if (err) {
            console.error(err);
            res.send({ err: true, data: result, message: err + '' });
          } else {
            console.log(updatedUser);
            res.send({ err: false, data: result, msg: `Update user by STD_ID ${STD_ID}` });
          }
        });
      }
    }
  });
});

//get admin by id
app.get('/admin', (req, res) => {
    let sql = 'SELECT * FROM admins WHERE emp_code='+req.query.empCode;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//edit admin profile
app.put('/admins/:emp_code', (req, res) => {
  const updatedUser = req.body;
  const emp_code = req.params.emp_code;

  // check if record exists
  db.query('SELECT * FROM admins WHERE emp_code = ?', [emp_code], (err, result) => {
    if (err) {
      console.error(err);
      res.send({ err: true, data: result, message: err + '' });
    } else {
      if (result.length === 0) {
        res.status(404).send({ message: `User with emp_code ${emp_code} not found` });
      } else {
        db.query('UPDATE admins SET ? WHERE emp_code = ?', [updatedUser, emp_code], (err, result) => {
          if (err) {
            console.error(err);
            res.send({ err: true, data: result, message: err + '' });
          } else {
            console.log(updatedUser);
            res.send({ err: false, data: result, msg: `Update admin by emp_code ${emp_code}` });
          }
        });
      }
    }
  });
});

function sendConfirmationEmail(userEmail, bookingDate, bookingTime) {
console.log('User Email:', userEmail);
const originalDate = new Date(bookingDate);
const formattedDate = format(originalDate, 'd MMMM yyyy', { locale: th });
console.log(formattedDate);

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'mfuwellness@gmail.com',
    pass: 'hekr npix vnot vsgs',
  },
});

    const mailOptions = {
        from: 'mfuwellness@gmail.com',
        to: userEmail,
        subject: 'คำขอจองคิวของท่านได้รับการอนุมัติ',
        text: `คำขอจองคิววันที่ ${formattedDate} ${bookingTime} ได้รับการอนุมัติเรียบร้อย ขอบคุณที่ใช้บริการ`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

function sendRejectionEmail(userEmail, bookingDate, bookingTime) {
  console.log('User Email:', userEmail);
  const originalDate = new Date(bookingDate);
  const formattedDate = format(originalDate, 'd MMMM yyyy', { locale: th });
  console.log(formattedDate);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mfuwellness@gmail.com',
      pass: 'hekr npix vnot vsgs',
    },
  });

  const mailOptions = {
    from: 'mfuwellness@gmail.com',
    to: userEmail,
    subject: 'คำขอจองคิวของท่านไม่ได้รับการอนุมัติ',
    text: `เนื่องจากมีผู้ใช้บริการเป็นจำนวนมาก ณ วันที่ ${formattedDate} ${bookingTime} เราเสียใจที่ต้องแจ้งให้ทราบว่าคิวของท่านไม่ได้รับการอนุมัติ`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

//edit bookings
app.put('/bookings/:booking_date/:booking_time/:HN_code', (req, res) => {
  const { booking_date, booking_time, HN_code } = req.params;
  const updatedBooking = req.body;

  // Check if the record exists based on the provided parameters
  db.query('SELECT *  ,booking.status_ID AS booking_status, users.email FROM booking JOIN users ON booking.HN_code=users.HN_code WHERE booking.booking_date = ? AND booking.booking_time = ? AND booking.HN_code = ?', [booking_date, booking_time, HN_code], (err, result) => {
  console.log('Error:', err);
  console.log('Result array:', result);
    if (err) {
      console.error(err);
      res.send({ err: true, data: result, message: err + '' });
    } else {
      if (result.length === 0) {
        res.status(404).send({ message: `Booking not found with date: ${booking_date}, time: ${booking_time}, and user HN code: ${HN_code}` });
      } else {
        const currentStatusID = result[0].booking_status;
        if (currentStatusID === 2) {
        // Update the booking status
        db.query('UPDATE booking SET ? WHERE booking_date = ? AND booking_time = ? AND HN_code = ?',
          [updatedBooking, booking_date, booking_time, HN_code], (err, result) => {
            if (err) {
              console.error(err);
              res.send({ err: true, data: result, message: err + '' });
            } else {
               if (updatedBooking.status_ID === 1) {
                db.query('SELECT *  , users.email FROM booking JOIN users ON booking.HN_code=users.HN_code WHERE booking.booking_date = ? AND booking.booking_time = ? AND booking.HN_code = ?', [booking_date, booking_time, HN_code], (err, selectResult) => {
                  if (err) {
                    console.error(err);
                    res.send({ err: true, data: selectResult, message: err + '' });
                  } else {
                    const userEmail = selectResult[0].email;
                    const bookingDate = selectResult[0].booking_date;
                    const bookingTime = selectResult[0].booking_time;
                    console.log('User Email:', userEmail);
                    sendConfirmationEmail(userEmail, bookingDate, bookingTime);
                  }
              });
            }else if (updatedBooking.status_ID === 3) {
              db.query('SELECT *  , users.email FROM booking JOIN users ON booking.HN_code=users.HN_code WHERE booking.booking_date = ? AND booking.booking_time = ? AND booking.HN_code = ?', [booking_date, booking_time, HN_code], (err, selectResult) => {
                if (err) {
                  console.error(err);
                  res.send({ err: true, data: selectResult, message: err + '' });
                } else {
                  const userEmail = selectResult[0].email;
                  const bookingDate = selectResult[0].booking_date;
                  const bookingTime = selectResult[0].booking_time;
                  console.log('User Email:', userEmail);
                  sendRejectionEmail(userEmail, bookingDate, bookingTime);
                }
              });
            }
              console.log(updatedBooking);
              res.send({ err: false, data: result, msg: `Update booking with date: ${booking_date}, time: ${booking_time}, and user HN code: ${HN_code}`             });
            }
          });
             } else {
          // If status_ID is not 2, simply log a message and skip the update
          console.log(`User with HN_code ${HN_code} has status_ID other than 2. Skipping update.`);
          res.send({
            err: false,
            msg: `User with HN_code ${HN_code} has status_ID other than 2. Update skipped.`
          });
        }
      }
    }
  });
});

//edit student bookings
app.put('/studentbookings/:booking_date/:booking_time/:STD_ID', (req, res) => {
  const { booking_date, booking_time, STD_ID } = req.params;
  const updatedBooking = req.body;

  // Check if the record exists based on the provided parameters
  db.query('SELECT * ,booking_students.status_ID AS booking_status FROM booking_students WHERE booking_date = ? AND booking_time = ? AND STD_ID = ?', [booking_date, booking_time, STD_ID], (err, result) => {
    if (err) {
      console.error(err);
      res.send({ err: true, data: result, message: err + '' });
    } else {
      if (result.length === 0) {
        res.status(404).send({ message: `Booking not found with date: ${booking_date}, time: ${booking_time}, and user STD ID: ${STD_ID}` });
      } else {
         const currentStatusID = result[0].booking_status;
        if (currentStatusID === 2) {
        // Update the booking status
        db.query('UPDATE booking_students SET ? WHERE booking_date = ? AND booking_time = ? AND STD_ID = ?',
          [updatedBooking, booking_date, booking_time, STD_ID], (err, result) => {
            if (err) {
              console.error(err);
              res.send({ err: true, data: result, message: err + '' });
            } else {
             if (updatedBooking.status_ID === 1) {
                db.query('SELECT *  , students.email FROM booking_students JOIN students ON booking_students.STD_ID=students.STD_ID WHERE booking_students.booking_date = ? AND booking_students.booking_time = ? AND booking_students.STD_ID = ?', [booking_date, booking_time, STD_ID], (err, selectResult) => {
                  if (err) {
                    console.error(err);
                    res.send({ err: true, data: selectResult, message: err + '' });
                  } else {
                    const userEmail = selectResult[0].email;
                    const bookingDate = selectResult[0].booking_date;
                    const bookingTime = selectResult[0].booking_time;
                    console.log('User Email:', userEmail);
                    sendConfirmationEmail(userEmail, bookingDate, bookingTime);
                  }
              });
            }else if (updatedBooking.status_ID === 3) {
              db.query('SELECT *  , students.email FROM booking_students JOIN students ON booking_students.STD_ID=students.STD_ID WHERE booking_students.booking_date = ? AND booking_students.booking_time = ? AND booking_students.STD_ID = ?', [booking_date, booking_time, STD_ID], (err, selectResult) => {
                if (err) {
                  console.error(err);
                  res.send({ err: true, data: selectResult, message: err + '' });
                } else {
                  const userEmail = selectResult[0].email;
                  const bookingDate = selectResult[0].booking_date;
                  const bookingTime = selectResult[0].booking_time;
                  console.log('User Email:', userEmail);
                  sendRejectionEmail(userEmail, bookingDate, bookingTime);
                }
              });
            }
              console.log(updatedBooking);
              res.send({ err: false, data: result, msg: `Update booking with date: ${booking_date}, time: ${booking_time}, and user Student ID: ${STD_ID}`             });
            }
          });
              } else {
          // If status_ID is not 2, simply log a message and skip the update
          console.log(`User with STD_ID ${STD_ID} has status_ID other than 2. Skipping update.`);
          res.send({
            err: false,
            msg: `User with STD_ID ${STD_ID} has status_ID other than 2. Update skipped.`
          });
        }
      }
    }
  });
});

function sendRegisterEmail(userEmail, userPassword) {
console.log('User Email:', userEmail);

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'mfuwellness@gmail.com',
    pass: 'hekr npix vnot vsgs',
  },
});

    const mailOptions = {
        from: 'mfuwellness@gmail.com',
        to: userEmail,
        subject: 'คำขอลงทะเบียนของท่านได้รับการอนุมัติ',
        text: `คำขอลงทะเบียนได้รับการอนุมัติเรียบร้อย รหัสผ่านHNของท่านคือ ${userPassword} โปรดทราบว่านี่เป็นข้อมูลที่สำคัญ กรุณาเก็บรักษาไว้ในที่ปลอดภัย และหลีกเลี่ยงการแจ้งรหัสผ่านนี้กับบุคคลที่ไม่ใช่เจ้าของบัญชี ท่านสามารถทำการเข้าสู่ระบบเพื่อใช้บริการจองคิวตั้งแต่ตอนนี้`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

function sendRegisterRejectEmail(userEmail) {
  console.log('User Email:', userEmail);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mfuwellness@gmail.com',
      pass: 'hekr npix vnot vsgs',
    },
  });

  const mailOptions = {
    from: 'mfuwellness@gmail.com',
    to: userEmail,
    subject: 'คำขอลงทะเบียนของท่านไม่ได้รับการอนุมัติ',
    text: 'เราเสียใจที่ต้องแจ้งให้ทราบว่าข้อมูลที่ท่านกรอกลงทะเบียนไม่ถูกต้อง กรุณาตรวจสอบและกรอกข้อมูลให้ถูกต้องตามความเป็นจริง ขออภัยในความไม่สะดวกที่เกิดขึ้น หากท่านต้องการความช่วยเหลือเพิ่มเติม กรุณาติดต่อทีมสนับสนุนของเราที่อีเมล mfuwellness@gmail.com',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

//Edit register status
app.put('/user/:HN_code', (req, res) => {
  const updatedUser = req.body;
  const HN_code = req.params.HN_code;

  // check if record exists
  db.query('SELECT * FROM users WHERE HN_code = ?', [HN_code], (err, result) => {
    if (err) {
      console.error(err);
      res.send({ err: true, data: result, message: err + '' });
    } else {
      if (result.length === 0) {
        res.status(404).send({ message: `User with HN_code ${HN_code} not found` });
      } else {
        // Check if status_ID is 2
        const currentStatusID = result[0].status_ID;
        if (currentStatusID === 2) {
          // Proceed with the update
          db.query('UPDATE users SET ? WHERE HN_code = ?', [updatedUser, HN_code], (err, updateResult) => {
            if (err) {
              console.error(err);
              res.send({ err: true, data: updateResult, message: err + '' });
            } else {
              if (updatedUser.status_ID === 1) {
                db.query('SELECT *  , users.email FROM users WHERE users.HN_code = ? ', [HN_code], (err, selectResult) => {
                  if (err) {
                    console.error(err);
                    res.send({ err: true, data: selectResult, message: err + '' });
                  } else {
                    const userEmail = selectResult[0].email;
                    const userPassword = selectResult[0].HN_code;
                    console.log('User Email:', userEmail);
                    sendRegisterEmail(userEmail, userPassword);
                  }
                });
              } else if (updatedUser.status_ID === 3) {
                db.query('SELECT *  , users.email FROM users WHERE users.HN_code = ? ', [HN_code], (err, selectResult) => {
                  if (err) {
                    console.error(err);
                    res.send({ err: true, data: selectResult, message: err + '' });
                  } else {
                    const userEmail = selectResult[0].email;
                    console.log('User Email:', userEmail);
                    sendRegisterRejectEmail(userEmail);
                  }
                });
              }
              console.log(updatedUser);
              res.send({
                err: false,
                data: updateResult,
                msg: `Update register status with user HN code: ${HN_code}`
              });
            }
          });
        } else {
          // If status_ID is not 2, simply log a message and skip the update
          console.log(`User with HN_code ${HN_code} has status_ID other than 2. Skipping update.`);
          res.send({
            err: false,
            msg: `User with HN_code ${HN_code} has status_ID other than 2. Update skipped.`
          });
        }
      }
    }
  });
});

// Edit student status
app.put('/students/:STD_ID', (req, res) => {
  const updatedUser = req.body;
  const STD_ID = req.params.STD_ID;

  // Check if record exists
  db.query('SELECT * FROM students WHERE STD_ID = ?', [STD_ID], (err, result) => {
    if (err) {
      console.error(err);
      res.send({ err: true, data: result, message: err + '' });
    } else {
      if (result.length === 0) {
        res.status(404).send({ message: `User with STD_ID ${STD_ID} not found` });
      } else {
        // Check if both std_id and citizen_num match
        if (result[0].STD_ID === updatedUser.STD_ID && result[0].citizen_num === updatedUser.citizen_num) {
          // Update status ID to 1
          updatedUser.status_ID = 1;

          // Update the record in the database
          db.query('UPDATE students SET ? WHERE STD_ID = ?', [updatedUser, STD_ID], (err, result) => {
            if (err) {
              console.error(err);
              res.send({ err: true, data: result, message: err + '' });
            } else {
              console.log(updatedUser);
              res.send({ err: false, data: result, msg: `Update student by STD_ID ${STD_ID}` });
            }
          });
        } else {
          res.status(400).send({ message: 'std_id and citizen_num do not match the data in the database' });
        }
      }
    }
  });
});

//edit main service price
app.put('/prices/:service_ID', (req, res) => {
  const updatedService = req.body;
  const service_ID = req.params.service_ID;

  // check if record exists
  db.query('SELECT * FROM service WHERE service_ID = ?', [service_ID], (err, result) => {
    if (err) {
      console.error(err);
      res.send({ err: true, data: result, message: err + '' });
    } else {
      if (result.length === 0) {
        res.status(404).send({ message: `Service with service_ID ${service_ID} not found` });
      } else {
        db.query('UPDATE service SET ? WHERE service_ID = ?', [updatedService, service_ID], (err, result) => {
          if (err) {
            console.error(err);
            res.send({ err: true, data: result, message: err + '' });
          } else {
            console.log(updatedService);
            res.send({ err: false, data: result, msg: `Update service by service_ID ${service_ID}` });
          }
        });
      }
    }
  });
});

//edit subservice price
app.put('/price/:subservice_ID', (req, res) => {
  const updatedService = req.body;
  const subservice_ID = req.params.subservice_ID;

  // check if record exists
  db.query('SELECT * FROM subservice WHERE subservice_ID = ?', [subservice_ID], (err, result) => {
    if (err) {
      console.error(err);
      res.send({ err: true, data: result, message: err + '' });
    } else {
      if (result.length === 0) {
        res.status(404).send({ message: `Service with subservice_ID ${subservice_ID} not found` });
      } else {
        db.query('UPDATE subservice SET ? WHERE subservice_ID = ?', [updatedService, subservice_ID], (err, result) => {
          if (err) {
            console.error(err);
            res.send({ err: true, data: result, message: err + '' });
          } else {
            console.log(updatedService);
            res.send({ err: false, data: result, msg: `Update service by subservice_ID ${subservice_ID}` });
          }
        });
      }
    }
  });
});
