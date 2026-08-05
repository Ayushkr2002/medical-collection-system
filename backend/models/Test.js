const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
{
name:{
type:String,
required:true
},

price:{
type:Number,
required:true
},

category:{
type:String,
required:true
},

description:{
type:String
},

includedTests:[
String
],

reportTime:{
type:String
},

offer:{
type:String
},

popular:{
type:Boolean,
default:false
}

},
{
timestamps:true
}
);

module.exports =
mongoose.model(
"Test",
testSchema
); 