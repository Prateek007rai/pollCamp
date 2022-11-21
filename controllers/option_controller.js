const Option = require('../models/option');
const Question = require('../models/question');
const Vote = require('../models/vote');


module.exports.create = function(req , res){
    // this ques came from hidden input
    
    Question.findById(req.body.ques , function(err , ques){
        if(err){console.log('Error in adding question' , err)}

        if(ques){                                                                 //if this ques existed then only option will be inserted

            Option.create({
                // 'text' came from option model schema & opt came from input name in form.
                text: req.body.opt,
                question: req.body.ques,
            },  function(err, option){
                if(err){console.log('Error in adding question' , err)}
        
                ques.options.push(option);                             //here in question schema's options array, this option inserted
                ques.save();

                return res.redirect('back');
            });
        }
    });
}



// //////////////////////////////// Delete option //////////////////////////////////////////////

module.exports.destroy = function(req,res){
    Option.findById(req.params.id , function(err , option){
        if(option){
            option.remove();
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    })
}


// //////////////////////////////// Add Vote //////////////////////////////////////////

module.exports.vote = async function(req,res){
    try{
        let deleted = false;
        let voteable = await Option.findById(req.params.id).populate('Votes');


        //check already voted or not

        let existingVote = await Vote.findOne({
            voteable: req.params.id,
            onModel: 'Option',
        });


        // if a like already exist then delete it
        if(existingVote){
            voteable.Votes.pull(existingVote._id);
            voteable.save();

            existingVote.remove();
            deleted = true;

        }else{
            //else make a new one

            let newVote = await Vote.create({
                voteable: req.params.id,
                onModel: 'Option'
            });

            voteable.Votes.push(newVote._id);
            voteable.save();

        }

        return res.redirect('back');
       


    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
