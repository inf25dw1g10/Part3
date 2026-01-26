const db = require('../utils/db');

const createProfessor = (params) => new Promise((resolve, reject) => {
  const professor = params.professor || params.body || params;

  if (!professor.nome || !professor.email || !professor.departamento) {
    return reject({ code: 400, error: "Campos obrigatórios ausentes: nome, email, departamento" });
  }

  const sql = "INSERT INTO Professores (nome, email, departamento) VALUES (?, ?, ?)";
  const values = [professor.nome, professor.email, professor.departamento];

  db.query(sql, values, (err, result) => {
    if (err) return reject({ code: 500, error: err.message });

    resolve({
      id_professor: result.insertId,
      nome: professor.nome,
      email: professor.email,
      departamento: professor.departamento
    });
  });
});

const deleteProfessor = ({ id_professor }) => new Promise((resolve, reject) => {
  const sql = "DELETE FROM Professores WHERE id_professor = ?";
  db.query(sql, [id_professor], (err) => {
    if (err) return reject(err);
    resolve({ message: "Professor removido" });
  });
});

const retrieveProfessor = ({ id_professor }) => new Promise((resolve, reject) => {
  const sql = "SELECT * FROM Professores WHERE id_professor = ?";
  db.query(sql, [id_professor], (err, results) => {
    if (err) return reject(err);
    resolve(results[0] || {});
  });
});

const retrieveProfessores = () => new Promise((resolve, reject) => {
  const sql = "SELECT * FROM Professores";
  db.query(sql, (err, results) => {
    if (err) return reject(err);
    resolve(results);
  });
});

const updateProfessor = (params) => new Promise((resolve, reject) => {
  const professor = params.professor || params.body || params;
  const { id_professor } = params;

  const sql = "UPDATE Professores SET nome = ?, email = ?, departamento = ? WHERE id_professor = ?";
  const values = [professor.nome, professor.email, professor.departamento, id_professor];

  db.query(sql, values, (err) => {
    if (err) return reject(err);
    resolve({ message: "Professor atualizado" });
  });
});

module.exports = {
  createProfessor,
  deleteProfessor,
  retrieveProfessor,
  retrieveProfessores,
  updateProfessor,
};
