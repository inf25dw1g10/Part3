const db = require('../utils/db');

const createAula = (params) => new Promise((resolve, reject) => {
  const aula = params.aula || params.body || params;

  if (!aula.nome || !aula.id_professor || !aula.id_sala) {
    return reject({ code: 400, error: "Campos obrigatórios ausentes: nome, id_professor, id_sala" });
  }

  const sql = "INSERT INTO Aulas (nome, id_professor, id_sala) VALUES (?, ?, ?)";
  const values = [aula.nome, aula.id_professor, aula.id_sala];

  db.query(sql, values, (err, result) => {
    if (err) return reject({ code: 500, error: err.message });

    resolve({
      id_aula: result.insertId,
      nome: aula.nome,
      id_professor: aula.id_professor,
      id_sala: aula.id_sala
    });
  });
});

const deleteAula = ({ id_aula }) => new Promise((resolve, reject) => {
  const sql = "DELETE FROM Aulas WHERE id_aula = ?";
  db.query(sql, [id_aula], (err) => {
    if (err) return reject(err);
    resolve({ message: "Aula removida" });
  });
});

const retrieveAula = ({ id_aula }) => new Promise((resolve, reject) => {
  const sql = "SELECT * FROM Aulas WHERE id_aula = ?";
  db.query(sql, [id_aula], (err, results) => {
    if (err) return reject(err);
    resolve(results[0] || {});
  });
});

const retrieveAulas = () => new Promise((resolve, reject) => {
  const sql = "SELECT * FROM Aulas";
  db.query(sql, (err, results) => {
    if (err) return reject(err);
    resolve(results);
  });
});

const updateAula = (params) => new Promise((resolve, reject) => {
  const aula = params.aula || params.body || params;
  const { id_aula } = params;

  const sql = "UPDATE Aulas SET nome = ?, id_professor = ?, id_sala = ? WHERE id_aula = ?";
  const values = [aula.nome, aula.id_professor, aula.id_sala, id_aula];

  db.query(sql, values, (err) => {
    if (err) return reject(err);
    resolve({ message: "Aula atualizada" });
  });
});

module.exports = {
  createAula,
  deleteAula,
  retrieveAula,
  retrieveAulas,
  updateAula,
};
