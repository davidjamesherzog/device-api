import {Router, Request, Response, NextFunction} from 'express';
const Devices = require('../data');
const primaryKey = require('../primary');

export class DeviceRouter {
  router: Router

  /**
   * Initialize the DeviceRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Devices.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.send(Devices);
  }

  /**
   * GET one device by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let query = parseInt(req.params.id);
    let device = Devices.find(device => device.id === query);
    if (device) {
      res.status(200)
        .send({
          message: 'Success',
          status: res.status,
          device
        });
    }
    else {
      res.status(404)
        .send({
          message: 'No device found with the given id.',
          status: res.status
        });
    }
  }

  /**
   * POST create a device
   */
  public create(req: Request, res: Response, next: NextFunction) {
    let device = req.body
    if (device) {
      device.id = primaryKey.id;
      primaryKey.id += 1;
      console.log(primaryKey.id);
      Devices.push(device);
      res.status(201)
        .send(device);
    }
    else {
      res.status(400)
        .send({
          message: 'Device is invalid.',
          status: res.status
        });
    }
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
    this.router.post('/', this.create);
    //this.router.put('/:id', this.getOne);
    //this.router.delete('/:id', this.getOne);
  }

}

// Create the DeviceRouter, and export its configured Express.Router
const deviceRoutes = new DeviceRouter();
deviceRoutes.init();

export default deviceRoutes.router;
