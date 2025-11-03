import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PASSENGER } from './common/models/models';
import { IPassenger } from './common/interface/passenger.interface';

@Injectable()
export class PassengerService {

    constructor(@InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>){}

    async create( passengerDto: PassengerDTO): Promise<IPassenger>{
        const newPassenger = new this.model(passengerDto);
        return await newPassenger.save();
    }

    async findAll(): Promise<IPassenger[]>{
        return this.model.find();
    }

    async findOne(id: string): Promise<IPassenger>{
        const passenger = await this.model.findById(id);
        if (!passenger) {
            throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);
        }
        return passenger;
    }
    
    async update(id: string, passengerDto: PassengerDTO): Promise<IPassenger>{
        const passengerUpdate = await this.model.findByIdAndUpdate(id, passengerDto, { new: true });
        if (!passengerUpdate) {
            throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);
        }
        return passengerUpdate;
    }

    async delete(id: string){
        await this.model.findByIdAndDelete(id);
        return { status: HttpStatus.OK, msg: 'Delete passenger'};
    }
    
}
