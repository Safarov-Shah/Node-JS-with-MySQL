var mysql=require('mysql');
var jwt= require('jsonwebtoken');
var bcrypt= require('bcryptjs');

var db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE 
});


exports.register= async function (req, res) {
    console.log(req.body);

    // var name=req.body.name;
    // var email=req.email;
    // var password=req.body.password;
    // var passwordConfirm= req.body.passwordConfirm;
    const{name,email,password, passwordConfirm } = req.body;
    db.query('SELECT email FROM users WHERE email=?', [email], function (error, results) {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.render('register', {
                message: 'That email already in use'
            });
        }
        else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Password do not match'
            });
        }

        // user.password = await bcrypt.hash(user.password, salt);
        let hashedPassword = bcrypt.hash(password);
        console.log(hashedPassword);
        // res.send("testing");
db.query('INSERT INTO users SET ?',{name: name, email: email, password: hashedPassword},function (error,results) {
            if(error){
                console.log(error);
            }
            else {
                console.log(results);
                return res.render('register', {
                    message: 'User registered'
                }); 
            }
        });
    });


    // res.send("Form submitted");
};