// controllers/mcqTestController.js
const db = require("../config/db");

exports.submitTest = (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;

    const {
      lang,
      duration_seconds,
      items,
      is_timeout,
      is_violation
    } = req.body;

    // Validation: at least 1 answer must exist
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No answers submitted."
      });
    }

    // Extract question ids
    const qids = items
      .map(i => Number(i.question_id))
      .filter(x => !isNaN(x));

    if (!qids.length) {
      return res.status(400).json({
        success: false,
        message: "No valid question IDs."
      });
    }

    const sql = `
      SELECT question_id, correct_option 
      FROM mcq_answers 
      WHERE question_id IN (${qids.map(() => "?").join(",")})
    `;

    db.query(sql, qids, (err, rows) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "DB error fetching answers."
        });
      }

      // Correct answers map
      const correctMap = {};
      rows.forEach(r => (correctMap[r.question_id] = Number(r.correct_option)));

      let correctCount = 0;
      const itemsToSave = [];

      items.forEach(it => {
        const qid = Number(it.question_id);
        const userAns =
          it.user_answer !== undefined ? Number(it.user_answer) : null;

        const correctOpt = correctMap[qid] ?? null;

        const isCorrect =
          userAns !== null &&
          correctOpt !== null &&
          userAns === correctOpt
            ? 1
            : 0;

        if (isCorrect) correctCount++;

        itemsToSave.push([qid, userAns, correctOpt, isCorrect]);
      });

      const totalQ = itemsToSave.length;
      const wrong = totalQ - correctCount;
      const percentage = Math.round((correctCount / totalQ) * 100);

      // Insert result summary
      const resultSql = `
        INSERT INTO mcq_results 
        (user_id, lang, total, correct, wrong, percentage, duration_seconds, is_timeout, is_violation)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        resultSql,
        [
          userId,
          lang,
          totalQ,
          correctCount,
          wrong,
          percentage,
          duration_seconds,
          is_timeout ? 1 : 0,
          is_violation ? 1 : 0
        ],
        (err2, result2) => {
          if (err2) {
            return res.status(500).json({
              success: false,
              message: "DB error saving result."
            });
          }

          const resultId = result2.insertId;

          // Insert all MCQ items
          const values = itemsToSave.map(r => [resultId, ...r]);

          const itemsSql = `
            INSERT INTO mcq_result_items 
            (result_id, question_id, user_answer, correct_option, is_correct)
            VALUES ?
          `;

          db.query(itemsSql, [values], err3 => {
            if (err3) {
              return res.json({
                success: true,
                message: "Result saved but items failed to save",
                resultId
              });
            }

            return res.json({
              success: true,
              message: "Test submitted successfully",
              resultId
            });
          });
        }
      );
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Unexpected server error"
    });
  }
};
