const dbconnection = require("../../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");
async function askQuestion(req, res) {
  const { title, description } = req.body;
  const userId = req.user.userId;

  if (!title || !description) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }

  if (title.length > 50 || description.length > 200) {
    return res.status(400).json({ msg: "Title or description is too long" });
  }

  try {
    const questionId = uuidv4();
    await dbconnection.query(
      "INSERT INTO questions( questionId,userId,  title, description) VALUES (?,?,?,?)",
      [questionId, userId, title, description],
    );
    return res.status(201).json({ msg: "Question asked successfully" });
  } catch (error) {
    // console.error(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, try again later" });
  }
}
async function homeQuestion(req, res) {
  try {
    const [questions] = await dbconnection.query(
      "SELECT questionId, title, users.userName FROM  questions JOIN users ON questions.userId = users.userId  ORDER BY questions.id DESC LIMIT 20",
    );
    return res.status(200).json({ questions });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
}
async function singleQuestion(req, res) {
  const { questionId } = req.params;
  try{ 
  const [singlequestion] = await dbconnection.query( "SELECT questions.title,questions.description,    asker.userName AS question_owner, answers.answer, answerer.userName AS answer_owner FROM questions JOIN users AS asker ON questions.userId = asker.userId LEFT JOIN answers ON questions.questionId = answers.questionId LEFT JOIN users AS answerer ON answers.userId = answerer.userId WHERE questions.questionId = ?",[questionId]
  );
  if (singlequestion.length === 0) {
    return res.status(404).json({ msg: "question not found!" });
  }
  return res.status(200).json({ singlequestion});}
  catch(error){
    // console.log(error.message);
    return res.status(500).json({ msg: "some thing went wrong" });
  }
}

module.exports = { askQuestion, homeQuestion, singleQuestion };
