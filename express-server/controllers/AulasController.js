/**
 * The AulasController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/AulasService');
const createAula = async (request, response) => {
  await Controller.handleRequest(request, response, service.createAula);
};

const deleteAula = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteAula);
};

const retrieveAula = async (request, response) => {
  await Controller.handleRequest(request, response, service.retrieveAula);
};

const retrieveAulas = async (request, response) => {
  await Controller.handleRequest(request, response, service.retrieveAulas);
};

const updateAula = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateAula);
};


module.exports = {
  createAula,
  deleteAula,
  retrieveAula,
  retrieveAulas,
  updateAula,
};
