const dbConnection= require("../../db/dbConfig") 
async function postAnswer(req, res) {
  const userId = req.user.userId;
  const questionId=req.params.questionId;
  const {answer}  = req.body;
  if ( !answer) {
    return res.status(400).json({ msg: "enter your answer!" });
  }
  if(answer.length > 200){
    return res.status(400).json({ msg: "the answer is very long please enter less than 200 letters" });
  }
  try {
   await dbConnection.query(
      "INSERT INTO answers(userId,questionId,answer) VALUES (?,?,?)",
      [userId, questionId, answer]
    );
    return res.status(201).json({ msg: "sucessfully send your answer" });

  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Something went wrong, try again later" });
  }
}
module.exports = {  postAnswer };
