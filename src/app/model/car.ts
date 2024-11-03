export class Car {
    carId: number;
    carName: string;
    ratePerHr: number;
    ratePerDay: number;
    carImage: string;

    constructor() {
        this.carId = 0;
        this.carName = '';
        this.ratePerHr = 0;
        this.ratePerDay = 0;
        this.carImage = '';
    }
}
export class Booking {
    bookingId: number;
    customerName: string;
    mobileNo: string;
    carId: number;
    carName: string;
    bookingDate: Date;
    rentType: string;
    rentDuration: number;
    noOfCars: number;

    constructor() {
        this.bookingId = 0;
        this.customerName = '';
        this.mobileNo = '';
        this.carId = 0;
        this.carName = '';
        this.bookingDate = new Date();
        this.rentType = '';
        this.rentDuration = 0;
        this.noOfCars = 0;
    }
}
