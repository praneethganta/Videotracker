// Controller file
var AM = require('./modules/account-manager');
var RE = require('./modules/recommendor');
var score = 0;
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');




module.exports = function(app) {

	app.get('/', function(req, res){
        /*if (req.session.loggedin === undefined || req.session.loggedin === false){
            res.render('home', {error:''})
        } else {
           res.redirect('/home');
        }*/
        res.render('home')
	});

    app.get('/reload', function(req, res){
        /*if (req.session.loggedin === undefined || req.session.loggedin === false){
            res.render('home', {error:''})
        } else {
           res.redirect('/home');
        }*/
        res.redirect("/upload");
    });

    app.get('/upload', function(req, res){
        /*if (req.session.loggedin === undefined || req.session.loggedin === false){
            res.render('home', {error:''})
        } else {
           res.redirect('/home');
        }*/
        res.render('upload')
    });


    app.post('/upload', function(req, res) {

        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            form.uploadDir = path.join(__dirname, '/uploads');
            fs.readFile(files.uploadFile.path, function (err, data) {
                if (err) throw err;
                console.log('File read!');

                // Write the file
                fs.writeFile(path.join(form.uploadDir, files.uploadFile.name), data, function (err) {
                    if (err) throw err;
                    res.write('File uploaded and moved!');
                    res.end();
                    console.log('File written!');
                });

                // Delete the file
                fs.unlink(files.uploadFile.path, function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                });
            });

        });
    });


    /*app.post('/login', function(req, res){
        if (req.session.loggedin === undefined || req.session.loggedin === false){
            AM.manualLogin(req.body.username, req.body.password, function(status, o){
                if(status) {
                    req.session.loggedin = true;
                    if (req.session.username === undefined) {
                        req.session.username = req.body.username;
                        AM.getUserDetails(req.session.username, function (status, result) {
                            if (status){
                                req.session.fullname = result.firstname + " " + result.lastname;
                                req.session.gender = result.sex;
                                courseInterests = result.topics_known.split(',');
                                proficiencyLevel = result.java_proficiency;
                                res.redirect('/home');
                            }
                            else {
                                res.render('form-login', {error : result});
                            }
                        });
                    }
                }
                else {
                    res.render('form-login', {error : o});
                }
            });
        } else {
            if(req.session.loggedin === true) {
                res.redirect('/home');
            } else {
                res.render('form-login', {error : 'Please login again.'})
            }
        }
    });

    app.get('/signup', function(req, res){
        if (req.session.loggedin === undefined || req.session.loggedin === false){
            res.render('form-register', {error : ''});
        } else {

            res.redirect('/home');
        }
    });

    app.post('/signup', function(req, res){
        if (req.session.loggedin === undefined || req.session.loggedin === false) {
            AM.signup(req.body, function(status, o){
                if (status) {
                    RE.createWeightsTable(req.body.username, function(status, o){
                        if(status){
                            activity = {};
                            activity.question = "Joining Bonus";
                            activity.topic = 'All';
                            activity.result = true;
                            activity.score = 100;
                            RE.updateActivity(req.body.username,activity,function (status, result) {
                               if(status) {
                                    res.render('form-register', {error: 'Signup complete'})
                               }
                               else {
                                   res.render('form-register', {error : o});
                               }
                            });
                        }
                        else{
                            res.render('form-register', {error : o});
                        }
                    });
                }
                else {
                    res.render('form-register', {error : o});
                }
            });
        } else {
            if (req.session.loggedin === true) {
                res.redirect('/home');

            } else {
                res.render('form-register', {error : 'Please register again.'})
            }
        }
    });*/
};
