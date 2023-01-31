const StudentRanking = require("../models/stud");
var Validator = require('jsonschema').Validator;
var v = new Validator();


const studentPatchSchema = {
  type: "object",
  properties: {
    _id: {
      type: 'string',
      required: true
    },
    name: {
      type: 'String'
    },
    age: {
      type: 'Number'
    },
    subject: {
      type: 'String'
    },
    gender: {
      type: 'String'
    }
  }
}


// patch Individual Request
const updatingIndividualStudentRequest = async (req, res) => {
    try {
      const valid = v.validate(req.body, studentPatchSchema)
      if(valid.errors.length){
        return res.status(400).json({ errors: valid.errors})
      }
      const _id = req.body;
      const getStudentRecordsIndividual = await StudentRanking.findByIdAndUpdate(_id, req.body, {
        new: true
      })
      res.send(getStudentRecordsIndividual)
  
    } catch (error) {
      if (req.params != req.body) {
        return res.status(400).json("Invalid ID")
      }
      res.status(500).send(error)
    }
  }

  module.exports = {updatingIndividualStudentRequest}