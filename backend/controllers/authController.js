const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign(
    { id },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    },
  );
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({
      email,
    });

    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,

      email,

      password: hashed,
    });

    res.status(201).json({
      _id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,

      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const login =
async(req,res)=>{

try{

const {
email,
password
}=req.body;

const user =
await User.findOne({
email
});

if(
!user
){

return res
.status(400)
.json({

message:
"Invalid Email"

});

}

const match =
await bcrypt.compare(

password,
user.password

);

if(
!match
){

return res
.status(400)
.json({

message:
"Invalid Password"

});

}

res.status(200)
.json({

_id:
user._id,

name:
user.name,

email:
user.email,

role:
user.role,

token:
generateToken(
user._id
)

});

}
catch(error){

res.status(500)
.json({

message:
error.message

});

}

};

exports.login = login;

exports.register = register;
