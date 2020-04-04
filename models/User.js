const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type : {
    type: String
  },
  fathername : {
    type: String
  },
  mothername : {
    type: String
  },
  gender : {
    type: String
  },
  dob : {
    type: Date
  },
  nationality : {
    type: String
  },
  college : {
    type: String
  },
  stream : {
    type: String
  },
  unit : {
    type: String
  },
  state : {
    type: String
  },
  district : {
    type: String
  },
  education : {
    type: String
  },
  email : {
    type: String
  },
  comaddress : {
    type: String
  },
  comdist : {
    type: String
  },
  postoffice : {
    type: String
  },
  railway : {
    type: String
  },
  peraddress : {
    type: String
  },
  uniquemark : {
    type: String
  },
  bloodgroup : {
    type: String
  },
  medicalcomplaints : {
    type: String
  },
  sport1 : {
    type: String
  },
  sport2 : {
    type: String
  },
  sport3 : {
    type: String
  },
  curricular1 : {
    type: String
  },
  curricular2 : {
    type: String
  },
  curricular3 : {
    type: String
  },
  prevenno : {
    type: String
  },
  prevres : {
    type: String
  },
  kinname : {
    type: String
  },
  kinaddress : {
    type: String
  },
  mobile : {
    type: String
  },
  age : {
    type: String
  },
  post : {
    type: String
  },
  kinmobile : {
    type: String
  },
  criminal : {
    type: Boolean
  },
  radio : {
    type: Boolean
  },
  serve : {
    type: Boolean
  },
  anytimebefore : {
    type: Boolean
  },
  dismissed : {
    type: Boolean
  },
  paraddress: {
    type: String
  },
  kinrelation: {
    type: String
  }
});



const Login = mongoose.model('loginTable', LoginSchema);

module.exports = Login;
