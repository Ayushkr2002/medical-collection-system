const Test = require("../models/Test");

const createTest = async(req,res)=>{

try{

const test =
await Test.create(req.body);

res.status(201).json(test);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};

const getTests = async(req,res)=>{

try{

const filter={};

if(req.query.category){

filter.category=
req.query.category;

}

const tests=
await Test.find(filter);

res.status(200)
.json(tests);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};

const getSingleTest = async(req,res)=>{

try{

const test =
await Test.findById(
req.params.id
);

if(!test){

return res.status(404).json({
message:"Test not found"
});

}

res.status(200).json(test);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};

const updateTest = async(req,res)=>{

try{

const updated =
await Test.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);

res.status(200).json(updated);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};

const deleteTest = async(req,res)=>{

try{

await Test.findByIdAndDelete(
req.params.id
);

res.status(200).json({
message:"Deleted Successfully"
});

}
catch(error){

res.status(500).json({
message:error.message
});

}

};

exports.createTest =
createTest;

exports.getTests =
getTests;

exports.getSingleTest =
getSingleTest;

exports.updateTest =
updateTest;
exports.deleteTest =
deleteTest;