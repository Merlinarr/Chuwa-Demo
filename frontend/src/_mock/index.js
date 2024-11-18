import { setupWorker } from 'msw/browser';


import demoMockApi from './handlers/_demo';

const handlers = [ ...demoMockApi];
const worker = setupWorker(...handlers);

export default worker
