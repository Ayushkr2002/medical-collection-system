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
const googleAuth = async (req, res) => {
  try {
    const googleId = req.user.id;
    const name = req.user.displayName;
    const email = req.user.emails?.[0]?.value;

    if (!email) {
      return res.status(400).json({
        message: "Google account email not found",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      console.log("Google user data:", { name, email, googleId });
console.log("Password required:", User.schema.path("password").isRequired);
      user = await User.create({
        name,
        email,
        googleId,
      });
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

   const token = generateToken(user._id);

res.redirect(
`${process.env.FRONTEND_URL}/google-success?token=${token}&name=${encodeURIComponent(
  user.name
)}&email=${encodeURIComponent(user.email)}&role=${user.role}`
);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = login;

exports.register = register;
exports.googleAuth = googleAuth;
