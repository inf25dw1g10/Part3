/**
 * Controller de Alunos — trata as rotas e delega para o service.
 * Não precisa de lógica extra, apenas encaminha os pedidos.
 */

const Controller = require('./Controller');
const service = require('../services/AlunosService');

module.exports = {
  createAluno: async (req, res) => {
    await Controller.handleRequest(req, res, service.createAluno);
  },

  deleteAluno: async (req, res) => {
    await Controller.handleRequest(req, res, service.deleteAluno);
  },

  retrieveAluno: async (req, res) => {
    await Controller.handleRequest(req, res, service.retrieveAluno);
  },

  retrieveAlunos: async (req, res) => {
    await Controller.handleRequest(req, res, service.retrieveAlunos);
  },

  updateAluno: async (req, res) => {
    await Controller.handleRequest(req, res, service.updateAluno);
  }
};

