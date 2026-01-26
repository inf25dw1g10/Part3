const db = require('../utils/db');

const createSala = (params) => new Promise((resolve, reject) => {
  const sala = params.sala || params.body || params;

  if (!sala.nome || !sala.capacidade) {
    return reject({ code: 400, error: "Campos obrigatórios ausentes: nome, capacidade" });
  }

  const sql = "INSERT INTO Salas (nome, capacidade) VALUES (?, ?)";
  const values = [sala.nome, sala.capacidade];

  db.query(sql, values, (err, result) => {
    if (err) return reject({ code: 500, error: err.message });

    resolve({
      id_sala: result.insertId,
      nome: sala.nome,
      capacidade: sala.capacidade
    });
  });
});

const deleteSala = ({ id_sala }) => new Promise((resolve, reject) => {
  const sql = "DELETE FROM Salas WHERE id_sala = ?";
  db.query(sql, [id_sala], (err) => {
    if (err) return reject(err);
    resolve({ message: "Sala removida" });
  });
});

const retrieveSala = ({ id_sala }) => new Promise((resolve, reject) => {
  const sql = "SELECT * FROM Salas WHERE id_sala = ?";
  db.query(sql, [id_sala], (err, results) => {
    if (err) return reject(err);
    resolve(results[0] || {});
  });
});

const retrieveSalas = () => new Promise((resolve, reject) => {
  const sql = "SELECT * FROM Salas";
  db.query(sql, (err, results) => {
    if (err) return reject(err);
    resolve(results);
  });
});

const updateSala = (params) => new Promise((resolve, reject) => {
  const sala = params.sala || params.body || params;
  const { id_sala } = params;

  const sql = "UPDATE Salas SET nome = ?, capacidade = ? WHERE id_sala = ?";
  const values = [sala.nome, sala.capacidade, id_sala];

  db.query(sql, values, (err) => {
    if (err) return reject(err);
    resolve({ message: "Sala atualizada" });
  });
});

module.exports = {
  createSala,
  deleteSala,
  retrieveSala,
  retrieveSalas,
  updateSala,
};
