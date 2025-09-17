import { Controller, Get } from '@nestjs/common';
import { ShipService } from './ship.service';

@Controller('ship')
export class ShipController {
  constructor(private ship: ShipService) {}

  @Get()
  getAll() {
    return this.ship.findAll();
  }
}
