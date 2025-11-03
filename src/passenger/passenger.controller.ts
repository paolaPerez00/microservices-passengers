import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PassengerMsg } from './common/constants';

@Controller()
export class PassengerController {

    constructor(private readonly passengerService: PassengerService){}

    @MessagePattern(PassengerMsg.CREATE)
    create(@Payload() passengerDto: PassengerDTO){
        return this.passengerService.create(passengerDto);
    }
    @MessagePattern(PassengerMsg.FIND_ALL)
    findAll(){
        return this.passengerService.findAll();
    }

    @MessagePattern(PassengerMsg.FIND_ONE)
    findOne(@Payload() id: string){
        return this.passengerService.findOne(id);
    }

    @MessagePattern(PassengerMsg.UPDATE)
    update(@Payload() payload){
        return this.passengerService.update(payload.id, payload.passengerDto);
    }

    @MessagePattern(PassengerMsg.DELETE)
    delete(@Payload() id: string){
        return this.passengerService.delete(id);
    }
}
