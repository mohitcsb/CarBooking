import { Component, OnInit } from '@angular/core';
import { Booking, Car } from '../../model/car';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class BookingsComponent implements OnInit {
  isSidePanelVisible: boolean = false;
  carList: Car[] = [];  
  localKeyName: string = 'rentalCar';
  bookingObj: Booking = new Booking();
  bookingList: Booking[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem(this.localKeyName);
    if (localData) {
      this.carList = JSON.parse(localData);
    }
    const localBookingData = localStorage.getItem('rentalBooking');
    if (localBookingData) {
      this.bookingList = JSON.parse(localBookingData);
    }
  }

  onBookingSave() {
    // Ensure carId is always an integer
    if (typeof this.bookingObj.carId === 'string') {
        this.bookingObj.carId = parseInt(this.bookingObj.carId, 10);
    }
    if (this.bookingObj.bookingId === 0) {
      const carData = this.carList.find(m => m.carId === this.bookingObj.carId);
      if (carData) {
        this.bookingObj.carName = carData.carName;
      }
      this.bookingObj.bookingId = this.bookingList.length + 1; // Generate a new ID
      this.bookingList.unshift(this.bookingObj);
    } else {
      // Update existing booking
      const index = this.bookingList.findIndex(item => item.bookingId === this.bookingObj.bookingId);
      if (index !== -1) {
        this.bookingList[index] = { ...this.bookingObj };
      }
    }
    localStorage.setItem('rentalBooking', JSON.stringify(this.bookingList));
    this.resetForm();
  }

  editBooking(item: Booking) {
    this.bookingObj = { ...item }; // Populate the form with the selected booking details
    this.isSidePanelVisible = true; // Show the side panel for editing
  }

  deleteBooking(bookingId: number) {
    this.bookingList = this.bookingList.filter(item => item.bookingId !== bookingId);
    localStorage.setItem('rentalBooking', JSON.stringify(this.bookingList)); // Update local storage
  }

  onReset() {
    this.resetForm();
  }

  private resetForm() {
    this.bookingObj = new Booking();
    this.isSidePanelVisible = false; // Close the side panel
  }
}
