import { Controller, Get } from '@nestjs/common';
import { ShipService } from './ship.service';

@Controller('ship')
export class ShipController {
  constructor(private ship: ShipService) {}

  @Get()
  async getAll() {
    const ships = await this.ship.findAll();
    return {
      ships,
    };
  }
}
