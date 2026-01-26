const db = require('../utils/db');

const createHorario = (params) => new Promise((resolve, reject) => {
  const horario = params.horario || params.body || params;

  if (!horario.id_aula || !horario.id_professor || !horario.id_sala || !horario.dia_semana || !horario.hora_inicio || !horario.hora_fim) {
    return reject({ code: 400, error: "Campos obrigatórios ausentes: id_aula, id_professor, id_sala, dia_semana, hora_inicio, hora_fim" });
  }

  const sql = "INSERT INTO Horarios (id_aula, id_professor, id_sala, dia_semana, hora_inicio, hora_fim) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [horario.id_aula, horario.id_professor, horario.id_sala, horario.dia_semana, horario.hora_inicio, horario.hora_fim];
  db.query(sql, values, (err, result) => {
    if (err) return reject({ code: 500, error: err.message });

    resolve({
      id_horario: result.insertId,
      ...horario
    });
  });
});

const deleteHorario = ({ id_horario }) => new Promise((resolve, reject) => {
  const sql = "DELETE FROM Horarios WHERE id_horario = ?";
  db.query(sql, [id_horario], (err) => {
    if (err) return reject(err);
    resolve({ message: "Horário removido" });
  });
});

const retrieveHorario = ({ id_horario }) => new Promise((resolve, reject) => {
  const sql = "SELECT * FROM Horarios WHERE id_horario = ?";
  db.query(sql, [id_horario], (err, results) => {
    if (err) return reject(err);
    resolve(results[0] || {});
  });
});

const retrieveHorarios = () => new Promise((resolve, reject) => {
  const sql = "SELECT * FROM Horarios";
  db.query(sql, (err, results) => {
    if (err) return reject(err);
    resolve(results);
  });
});

const updateHorario = (params) => new Promise((resolve, reject) => {
  const horario = params.horario || params.body || params;
  const { id_horario } = params;

  const sql = "UPDATE Horarios SET id_aula = ?, id_professor = ?, id_sala = ?, dia_semana = ?, hora_inicio = ?, hora_fim = ? WHERE id_horario = ?";
  const values = [horario.id_aula, horario.dia_semana, horario.hora_inicio, horario.hora_fim, id_horario];

  db.query(sql, values, (err) => {
    if (err) return reject(err);
    resolve({ message: "Horário atualizado" });
  });
});

module.exports = {
  createHorario,
  deleteHorario,
  retrieveHorario,
  retrieveHorarios,
  updateHorario,
};
