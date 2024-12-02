import { Router } from 'jsr:@oak/oak/router';
import composeAPI from './composeAPI.ts';
import { listAssayPlates, createAssayPlate, deleteAssayPlate } from './assay_plates.ts';

/**
 * Router for all APIs
 */

const router = new Router();

// Options
const allowAllOpts = {};
// const loginRequiredOpts = { loginRequired: true };

// Auth APIs
composeAPI(router, 'GET', '/v1/assay_plates', listAssayPlates, allowAllOpts);
composeAPI(router, 'POST', '/v1/assay_plates', createAssayPlate, allowAllOpts);
composeAPI(router, 'DELETE', '/v1/assay_plates', deleteAssayPlate, allowAllOpts);

export default router;
