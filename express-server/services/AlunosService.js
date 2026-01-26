const db = require('../utils/db');

const createAluno = (params) => new Promise((resolve, reject) => {
  const aluno = params.aluno || params.body || params;

  if (!aluno.nome || !aluno.email || !aluno.curso) {
    return reject({ code: 400, error: "Campos obrigatórios ausentes: nome, email, curso" });
  }

  const sql = "INSERT INTO Alunos (nome, email, curso) VALUES (?, ?, ?)";
  const values = [aluno.nome, aluno.email, aluno.curso];

  db.query(sql, values, (err, result) => {
    if (err) return reject({ code: 500, error: err.message });
    resolve({
      id_aluno: result.insertId,
      nome: aluno.nome,
      email: aluno.email,
      curso: aluno.curso
    });
  });
});




const deleteAluno = ({ id_aluno }) => new Promise((resolve, reject) => {
  const sql = "DELETE FROM Alunos WHERE id_aluno = ?";
  db.query(sql, [id_aluno], (err) => {
    if (err) return reject(err);
    resolve({ message: "Aluno removido" });
  });
});

const retrieveAluno = ({ id_aluno }) => new Promise((resolve, reject) => {
  const sql = "SELECT * FROM Alunos WHERE id_aluno = ?";
  db.query(sql, [id_aluno], (err, results) => {
    if (err) return reject(err);
    resolve(results[0] || {});
  });
});

const retrieveAlunos = () => new Promise((resolve, reject) => {
  const sql = "SELECT * FROM Alunos";
  db.query(sql, (err, results) => {
    if (err) return reject(err);
    resolve(results);
  });
});

const updateAluno = ({ id_aluno, aluno }) => new Promise((resolve, reject) => {
  const sql = "UPDATE Alunos SET nome = ?, email = ?, curso = ? WHERE id_aluno = ?";
  const params = [aluno.nome, aluno.email, aluno.curso, id_aluno];

  db.query(sql, params, (err) => {
    if (err) return reject(err);
    resolve({ message: "Aluno atualizado" });
  });
});

module.exports = {
  createAluno,
  deleteAluno,
  retrieveAluno,
  retrieveAlunos,
  updateAluno,
};
