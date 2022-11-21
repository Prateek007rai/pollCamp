const Question = require('../models/question');
const Option = require('../models/option');

module.exports.home = function(req , res ){
//    return res.end('prateek')

    // //print the questions here
    // Question.find({} , function(err , ques){                                    //this ques is the array of all question in Question

    //     // from here layout.ejs automatically fetched 
    //         return res.render('home' ,{
    //             title: "PollCamp || Home",
    //             questions: ques
    //         });
    // }) ;


    Question.find({}).populate({path : 'options'}).exec(function(err, ques){
        // from here layout.ejs automatically fetched 
        return res.render('home' ,{
            title: "PollCamp || Home",
            questions: ques
        });
    });


}
