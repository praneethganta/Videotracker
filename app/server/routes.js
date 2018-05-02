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


    app.post('/upload', function(req, res){

        // create an incoming form object
        var form = new formidable.IncomingForm();

        // specify that we want to allow the user to upload multiple files in a single request
        form.multiples = true;

        // store all uploads in the /uploads directory
        form.uploadDir = path.join(__dirname, '/uploads');

        // every time a file has been uploaded successfully,
        // rename it to it's orignal name
        form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
        });

        // log any errors that occur
        form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
        });

        // once all the files have been uploaded, send a response to the client
        form.on('end', function() {
            res.end('success');
        });

        // parse the incoming request containing the form data
        form.parse(req);

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
