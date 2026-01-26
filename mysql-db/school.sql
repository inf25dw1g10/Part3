CREATE DATABASE IF NOT EXISTS school;
USE school;

CREATE TABLE Alunos (
  id_aluno INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  curso VARCHAR(50)
);

CREATE TABLE Professores (
  id_professor INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  departamento VARCHAR(50)
);

CREATE TABLE Salas (
  id_sala INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50),
  capacidade INT
);

CREATE TABLE Aulas (
  id_aula INT AUTO_INCREMENT PRIMARY KEY,
  disciplina VARCHAR(100),
  id_professor INT,
  FOREIGN KEY (id_professor) REFERENCES Professores(id_professor)
);

CREATE TABLE Horarios (
  id_horario INT AUTO_INCREMENT PRIMARY KEY,
  dia_semana VARCHAR(20),
  hora_inicio TIME,
  hora_fim TIME,
  id_sala INT,
  id_professor INT,
  id_aula INT,
  FOREIGN KEY (id_sala) REFERENCES Salas(id_sala),
  FOREIGN KEY (id_professor) REFERENCES Professores(id_professor),
  FOREIGN KEY (id_aula) REFERENCES Aulas(id_aula)
);

  
insert into Alunos (nome, email, curso) values 
('Ana Silva', 'ana.silva@umaia.pt', 'Informática'),
('Bruno Costa', 'bruno.costa@umaia.pt', 'Informática'),
('Carla Mendes', 'carla.mendes@umaia.pt', 'Gestão'),
('Daniel Rocha', 'daniel.rocha@umaia.pt', 'Informática'),
('Eva Martins', 'eva.martins@umaia.pt', 'Design'),
('Filipe Sousa', 'filipe.sousa@umaia.pt', 'Gestão'),
('Gabriela Pinto', 'gabriela.pinto@umaia.pt', 'Informática'),
('Henrique Alves', 'henrique.alves@umaia.pt', 'Design'),
('Inês Ferreira', 'ines.ferreira@umaia.pt', 'Informática'),
('João Carvalho', 'joao.carvalho@umaia.pt', 'Gestão'),
('Kátia Ramos', 'katia.ramos@umaia.pt', 'Informática'),
('Luis Moreira', 'luis.moreira@umaia.pt', 'Design'),
('Marta Gomes', 'marta.gomes@umaia.pt', 'Gestão'),
('Nuno Teixeira', 'nuno.teixeira@umaia.pt', 'Informática'),
('Olga Vieira', 'olga.vieira@umaia.pt', 'Design'),
('Paulo Santos', 'paulo.santos@umaia.pt', 'Informática'),
('Rita Fonseca', 'rita.fonseca@umaia.pt', 'Gestão'),
('Sérgio Matos', 'sergio.matos@umaia.pt', 'Informática'),
('Teresa Almeida', 'teresa.almeida@umaia.pt', 'Design'),
('Urbano Lopes', 'urbano.lopes@umaia.pt', 'Gestão'),
('Vera Correia', 'vera.correia@umaia.pt', 'Informática'),
('Wilson Barros', 'wilson.barros@umaia.pt', 'Design'),
('Xavier Cunha', 'xavier.cunha@umaia.pt', 'Gestão'),
('Yara Monteiro', 'yara.monteiro@umaia.pt', 'Informática'),
('Zara Gomes', 'zara.gomes@umaia.pt', 'Design'),
('Artur Ribeiro', 'artur.ribeiro@umaia.pt', 'Gestão'),
('Beatriz Faria', 'beatriz.faria@umaia.pt', 'Informática'),
('Cristina Lopes', 'cristina.lopes@umaia.pt', 'Design'),
('Duarte Pires', 'duarte.pires@umaia.pt', 'Gestão'),
('Eduardo Nogueira', 'eduardo.nogueira@umaia.pt', 'Informática');

INSERT INTO Professores (nome, email, departamento) VALUES
('João Pereira', 'joao.pereira@umaia.pt', 'Matemática'),
('Maria Santos', 'maria.santos@umaia.pt', 'Informática'),
('Pedro Oliveira', 'pedro.oliveira@umaia.pt', 'Física'),
('Sofia Costa', 'sofia.costa@umaia.pt', 'Gestão'),
('Ricardo Almeida', 'ricardo.almeida@umaia.pt', 'Design'),
('Helena Martins', 'helena.martins@umaia.pt', 'Informática'),
('Carlos Nogueira', 'carlos.nogueira@umaia.pt', 'Matemática'),
('Patrícia Lopes', 'patricia.lopes@umaia.pt', 'Gestão'),
('Miguel Ferreira', 'miguel.ferreira@umaia.pt', 'Física'),
('Sandra Rocha', 'sandra.rocha@umaia.pt', 'Design'),
('António Ribeiro', 'antonio.ribeiro@umaia.pt', 'Informática'),
('Luísa Carvalho', 'luisa.carvalho@umaia.pt', 'Matemática'),
('Fernando Pinto', 'fernando.pinto@umaia.pt', 'Gestão'),
('Cláudia Sousa', 'claudia.sousa@umaia.pt', 'Design'),
('Hugo Teixeira', 'hugo.teixeira@umaia.pt', 'Informática'),
('Isabel Gomes', 'isabel.gomes@umaia.pt', 'Física'),
('Paulo Correia', 'paulo.correia@umaia.pt', 'Gestão'),
('Mónica Barros', 'monica.barros@umaia.pt', 'Design'),
('Tiago Silva', 'tiago.silva@umaia.pt', 'Informática'),
('Rosa Fernandes', 'rosa.fernandes@umaia.pt', 'Matemática'),
('Vítor Costa', 'vitor.costa@umaia.pt', 'Gestão'),
('Andreia Ramos', 'andreia.ramos@umaia.pt', 'Design'),
('Nuno Matos', 'nuno.matos@umaia.pt', 'Informática'),
('Carolina Vieira', 'carolina.vieira@umaia.pt', 'Física'),
('José Moreira', 'jose.moreira@umaia.pt', 'Gestão'),
('Marta Figueiredo', 'marta.figueiredo@umaia.pt', 'Design'),
('Diogo Cunha', 'diogo.cunha@umaia.pt', 'Informática'),
('Patrícia Azevedo', 'patricia.azevedo@umaia.pt', 'Matemática'),
('Bruno Lopes', 'bruno.lopes@umaia.pt', 'Gestão'),
('Teresa Monteiro', 'teresa.monteiro@umaia.pt', 'Design');

INSERT INTO Salas (nome, capacidade) VALUES
('Sala 101', 30),
('Sala 102', 25),
('Sala 103', 40),
('Sala 104', 35),
('Sala 105', 20),
('Sala 106', 50),
('Sala 107', 28),
('Sala 108', 32),
('Sala 109', 45),
('Sala 110', 22),

('Sala 201', 30),
('Sala 202', 25),
('Sala 203', 40),
('Sala 204', 35),
('Sala 205', 20),
('Sala 206', 50),
('Sala 207', 28),
('Sala 208', 32),
('Sala 209', 45),
('Sala 210', 22),

('Laboratório 301', 20),
('Laboratório 302', 25),
('Laboratório 303', 30),
('Laboratório 304', 35),
('Laboratório 305', 40),
('Auditório 401', 100),
('Auditório 402', 80),
('Auditório 403', 60),
('Sala Multiuso 501', 50),
('Sala Multiuso 502', 45);

INSERT INTO Aulas (disciplina, id_professor) VALUES
('Informática', 1),
('Gestão', 2),
('Design', 3),
('Informática', 4),
('Gestão', 5),
('Design', 6),
('Informática', 7),
('Gestão', 8),
('Design', 9),
('Informática', 10),
('Gestão', 11),
('Design', 12),
('Informática', 13),
('Gestão', 14),
('Design', 15),
('Informática', 16),
('Gestão', 17),
('Design', 18),
('Informática', 19),
('Gestão', 20),
('Design', 21),
('Informática', 22),
('Gestão', 23),
('Design', 24),
('Informática', 25),
('Gestão', 26),
('Design', 27),
('Informática', 28),
('Gestão', 29),
('Design', 30);

INSERT INTO Horarios (dia_semana, hora_inicio, hora_fim, id_sala, id_professor, id_aula) VALUES
('Segunda-feira', '08:00', '09:30', 1, 1, 1),
('Segunda-feira', '09:30', '11:00', 2, 2, 2),
('Segunda-feira', '11:00', '12:30', 3, 3, 3),
('Segunda-feira', '14:00', '15:30', 4, 4, 4),
('Segunda-feira', '15:30', '17:00', 5, 5, 5),

('Terça-feira', '08:00', '09:30', 6, 6, 6),
('Terça-feira', '09:30', '11:00', 7, 7, 7),
('Terça-feira', '11:00', '12:30', 8, 8, 8),
('Terça-feira', '14:00', '15:30', 9, 9, 9),
('Terça-feira', '15:30', '17:00', 10, 10, 10),

('Quarta-feira', '08:00', '09:30', 11, 11, 11),
('Quarta-feira', '09:30', '11:00', 12, 12, 12),
('Quarta-feira', '11:00', '12:30', 13, 13, 13),
('Quarta-feira', '14:00', '15:30', 14, 14, 14),
('Quarta-feira', '15:30', '17:00', 15, 15, 15),

('Quinta-feira', '08:00', '09:30', 16, 16, 16),
('Quinta-feira', '09:30', '11:00', 17, 17, 17),
('Quinta-feira', '11:00', '12:30', 18, 18, 18),
('Quinta-feira', '14:00', '15:30', 19, 19, 19),
('Quinta-feira', '15:30', '17:00', 20, 20, 20),

('Sexta-feira', '08:00', '09:30', 21, 21, 21),
('Sexta-feira', '09:30', '11:00', 22, 22, 22),
('Sexta-feira', '11:00', '12:30', 23, 23, 23),
('Sexta-feira', '14:00', '15:30', 24, 24, 24),
('Sexta-feira', '15:30', '17:00', 25, 25, 25),

('Sábado', '08:00', '09:30', 26, 26, 26),
('Sábado', '09:30', '11:00', 27, 27, 27),
('Sábado', '11:00', '12:30', 28, 28, 28),
('Sábado', '14:00', '15:30', 29, 29, 29),
('Sábado', '15:30', '17:00', 30, 30, 30);


UPDATE Horarios SET id_professor = 1, id_aula = 1 WHERE id_horario = 1;
UPDATE Horarios SET id_professor = 2, id_aula = 2 WHERE id_horario = 2;
UPDATE Horarios SET id_professor = 3, id_aula = 3 WHERE id_horario = 3;
UPDATE Horarios SET id_professor = 4, id_aula = 4 WHERE id_horario = 4;
UPDATE Horarios SET id_professor = 5, id_aula = 5 WHERE id_horario = 5;

UPDATE Horarios SET id_professor = 6, id_aula = 6 WHERE id_horario = 6;
UPDATE Horarios SET id_professor = 7, id_aula = 7 WHERE id_horario = 7;
UPDATE Horarios SET id_professor = 8, id_aula = 8 WHERE id_horario = 8;
UPDATE Horarios SET id_professor = 9, id_aula = 9 WHERE id_horario = 9;
UPDATE Horarios SET id_professor = 10, id_aula = 10 WHERE id_horario = 10;

UPDATE Horarios SET id_professor = 11, id_aula = 11 WHERE id_horario = 11;
UPDATE Horarios SET id_professor = 12, id_aula = 12 WHERE id_horario = 12;
UPDATE Horarios SET id_professor = 13, id_aula = 13 WHERE id_horario = 13;
UPDATE Horarios SET id_professor = 14, id_aula = 14 WHERE id_horario = 14;
UPDATE Horarios SET id_professor = 15, id_aula = 15 WHERE id_horario = 15;

UPDATE Horarios SET id_professor = 16, id_aula = 16 WHERE id_horario = 16;
UPDATE Horarios SET id_professor = 17, id_aula = 17 WHERE id_horario = 17;
UPDATE Horarios SET id_professor = 18, id_aula = 18 WHERE id_horario = 18;
UPDATE Horarios SET id_professor = 19, id_aula = 19 WHERE id_horario = 19;
UPDATE Horarios SET id_professor = 20, id_aula = 20 WHERE id_horario = 20;

UPDATE Horarios SET id_professor = 21, id_aula = 21 WHERE id_horario = 21;
UPDATE Horarios SET id_professor = 22, id_aula = 22 WHERE id_horario = 22;
UPDATE Horarios SET id_professor = 23, id_aula = 23 WHERE id_horario = 23;
UPDATE Horarios SET id_professor = 24, id_aula = 24 WHERE id_horario = 24;
UPDATE Horarios SET id_professor = 25, id_aula = 25 WHERE id_horario = 25;

UPDATE Horarios SET id_professor = 26, id_aula = 26 WHERE id_horario = 26;
UPDATE Horarios SET id_professor = 27, id_aula = 27 WHERE id_horario = 27;
UPDATE Horarios SET id_professor = 28, id_aula = 28 WHERE id_horario = 28;
UPDATE Horarios SET id_professor = 29, id_aula = 29 WHERE id_horario = 29;
UPDATE Horarios SET id_professor = 30, id_aula = 30 WHERE id_horario = 30;

