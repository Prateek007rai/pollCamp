const Question = require('../models/question');
const Option = require('../models/option');

// ///////////////////////////////// Create Question /////////////////////////////////////////
module.exports.create = function(req,res){
    console.log(req.body.ques);
    Question.create({
        // here 'content, came from model & 'ques' came from views home's input name. 
        content: req.body.ques
    }, function(err, question){
        if(err){console.log('Error in adding question' , err)}


        return res.redirect('back');
    })
}

// ////////////////////////////////////// Destroy Question //////////////////////////////////
module.exports.destroy = function(req,res){

    Question.findById(req.params.id , function(err , question){                               // this line first find Question in data base before delete
        if(question){
            question.remove();

            Option.deleteMany({question: req.params.id} , function(err){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}