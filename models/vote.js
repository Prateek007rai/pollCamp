const mongoose = require('mongoose');


const voteSchema = new mongoose.Schema({
    //this defines the object id of the liked object
    voteable:{
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    //used for define the type of liked object since this the dynamic refernce
    onModel:{
        type: String,
        required: true,
        enum: ['Option']
    }
},  {

    timestamps: true

}
);


const Vote = mongoose.model('Vote' , voteSchema);
module.exports = Vote;