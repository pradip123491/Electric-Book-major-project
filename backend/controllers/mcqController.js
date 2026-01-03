// controllers/mcqController.js
const db = require("../config/db");

/* ===============================================
   ADD NEW MCQ  (CLEANED)
================================================= */
exports.addMCQ = async (req, res) => {
  try {
    const {
      question_en,
      question_gu,
      options_en,
      options_gu,
      answer
    } = req.body;

    if (
      !question_en ||
      !question_gu ||
      !options_en ||
      !options_gu ||
      options_en.length !== 4 ||
      options_gu.length !== 4
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    db.query(
      "INSERT INTO mcq_questions (question_en, question_gu) VALUES (?, ?)",
      [question_en, question_gu],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Failed to add question." });
        }

        const questionId = result.insertId;

        // insert options
        options_en.forEach((_, index) => {
          db.query(
            "INSERT INTO mcq_options (question_id, option_en, option_gu, option_index) VALUES (?, ?, ?, ?)",
            [questionId, options_en[index], options_gu[index], index]
          );
        });

        // insert correct answer
        db.query(
          "INSERT INTO mcq_answers (question_id, correct_option) VALUES (?, ?)",
          [questionId, answer]
        );

        return res.json({
          success: true,
          message: "MCQ added successfully!"
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "Unexpected server error." });
  }
};

/* ===============================================
   GET ALL MCQs (ADMIN LIST)
================================================= */
exports.getAllMCQ = (req, res) => {
  db.query(
    `
    SELECT 
      q.id,
      q.question_en,
      q.question_gu,
      a.correct_option
    FROM mcq_questions q
    LEFT JOIN mcq_answers a ON q.id = a.question_id
    ORDER BY q.id DESC
    `,
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Failed to fetch MCQs." });
      }

      return res.json({ success: true, data: results });
    }
  );
};

/* ===============================================
   GET SINGLE MCQ (EDIT PAGE)
================================================= */
exports.getSingleMCQ = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      q.id,
      q.question_en,
      q.question_gu,
      a.correct_option,
      o.option_index,
      o.option_en,
      o.option_gu
    FROM mcq_questions q
    LEFT JOIN mcq_options o ON q.id = o.question_id
    LEFT JOIN mcq_answers a ON q.id = a.question_id
    WHERE q.id = ?
    ORDER BY o.option_index ASC
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch MCQ." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "MCQ not found." });
    }

    const mcq = {
      id: results[0].id,
      question_en: results[0].question_en,
      question_gu: results[0].question_gu,
      correct_option: results[0].correct_option,
      options_en: results.map(r => r.option_en),
      options_gu: results.map(r => r.option_gu),
    };

    return res.json({ success: true, data: mcq });
  });
};

/* ===============================================
   UPDATE MCQ
================================================= */
exports.updateMCQ = (req, res) => {
  const { id } = req.params;
  const { question_en, question_gu, options_en, options_gu, answer } = req.body;

  if (
    !question_en ||
    !question_gu ||
    !options_en ||
    !options_gu ||
    options_en.length !== 4 ||
    options_gu.length !== 4
  ) {
    return res.status(400).json({ message: "All fields required." });
  }

  db.query(
    "UPDATE mcq_questions SET question_en=?, question_gu=? WHERE id=?",
    [question_en, question_gu, id],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to update question." });
      }

      // update options
      options_en.forEach((_, index) => {
        db.query(
          "UPDATE mcq_options SET option_en=?, option_gu=? WHERE question_id=? AND option_index=?",
          [options_en[index], options_gu[index], id, index]
        );
      });

      // update answer
      db.query(
        "UPDATE mcq_answers SET correct_option=? WHERE question_id=?",
        [answer, id],
        (err2) => {
          if (err2) {
            return res.status(500).json({ message: "Failed to update answer." });
          }

          return res.json({ success: true, message: "MCQ updated successfully!" });
        }
      );
    }
  );
};

/* ===============================================
   DELETE MCQ
================================================= */
exports.deleteMCQ = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM mcq_questions WHERE id=?", [id], (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete MCQ." });
    }

    return res.json({ success: true, message: "MCQ deleted successfully." });
  });
};

/* ===============================================
   GET RANDOM MCQs (EXAM)
================================================= */
exports.getRandom = (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 20;
  const lang = req.query.lang === "gu" ? "gu" : "en";

  // step 1: random ids
  const sqlIds = `SELECT id FROM mcq_questions ORDER BY RAND() LIMIT ?`;

  db.query(sqlIds, [limit], (err, idRows) => {
    if (err) {
      return res.status(500).json({ success: false, message: "DB error" });
    }

    if (!idRows.length) return res.json({ success: true, data: [] });

    const ids = idRows.map(r => r.id);
    const placeholders = ids.map(() => '?').join(',');

    // step 2: fetch full questions
    const sql = `
      SELECT q.id, q.question_en, q.question_gu, a.correct_option,
             o.option_index, o.option_en, o.option_gu
      FROM mcq_questions q
      LEFT JOIN mcq_answers a ON q.id = a.question_id
      LEFT JOIN mcq_options o ON q.id = o.question_id
      WHERE q.id IN (${placeholders})
      ORDER BY q.id ASC, o.option_index ASC
    `;

    db.query(sql, ids, (err2, rows) => {
      if (err2) {
        return res.status(500).json({ success: false, message: "DB error" });
      }

      const map = {};

      rows.forEach(r => {
        if (!map[r.id]) {
          map[r.id] = {
            id: r.id,
            question_en: r.question_en,
            question_gu: r.question_gu,
            correct_option: r.correct_option,
            options_en: ["", "", "", ""],
            options_gu: ["", "", "", ""]
          };
        }

        if (r.option_index !== null) {
          map[r.id].options_en[r.option_index] = r.option_en || "";
          map[r.id].options_gu[r.option_index] = r.option_gu || "";
        }
      });

      return res.json({ success: true, data: Object.values(map) });
    });
  });
};
