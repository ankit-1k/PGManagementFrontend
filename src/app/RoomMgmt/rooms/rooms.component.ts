import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomsService } from 'src/app/services/RoomMgmt/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  addRoomvisible: boolean = false;
  addRoomposition: string = 'center';
  roomForm: FormGroup;
  rooms: any[] = [];
  customers: any[] = [];
  editRoomVisible: boolean = false;
  selectedRoomId: string = '';
  users: any[] = [];
  roomDetails: any;
  roomMembersVisible: boolean = false;

  constructor(private fb: FormBuilder, private roomService: RoomsService) {
    this.roomForm = this.fb.group({
      roomName: ['', Validators.required],
      roomBedCount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getRooms();
    this.getAllCustomers();
    this.getUsers();
  }

  showDialog(position: string) {
    this.addRoomposition = position;
    this.addRoomvisible = true;
  }

  createRoom() {
    if (this.roomForm.valid) {
      this.roomService.createRoom(this.roomForm.value).subscribe((res) => {
        this.getRooms();
        this.addRoomvisible = false;
        this.roomForm.reset();
      });
    }
  }

  getRooms() {
    this.roomService.getRooms().subscribe((data) => {
      this.rooms = data;
    });
  }

  getAllCustomers() {
    this.roomService.allCustomerList().subscribe((data) => {
      this.customers = data;
    });
  }

  isRoomFull(roomName: string): boolean {
    const room = this.rooms.find((r) => r.roomName === roomName);
    const occupiedBeds = this.customers.filter(
      (c) => c.roomNumber === roomName
    ).length;
    return occupiedBeds >= parseInt(room.roomBedCount, 10);
  }

  submitRoomBooking(roomName: string) {
    if (this.isRoomFull(roomName)) {
      alert('Room is full. Cannot book this room.');
    } else {
      // Proceed with booking logic here
      console.log('Room booking successful');
    }
  }

  editRoom(room: any) {
    this.selectedRoomId = room._id;
    this.roomForm.patchValue(room);
    this.editRoomVisible = true;
  }

  updateRoom() {
    if (this.roomForm.valid) {
      this.roomService
        .updateRoom(this.selectedRoomId, this.roomForm.value)
        .subscribe(() => {
          this.getRooms();
          this.editRoomVisible = false;
          this.roomForm.reset();
        });
    }
  }

  deleteRoom(id: string) {
    this.roomService.deleteRoom(id).subscribe(() => {
      this.getRooms();
    });
  }

  // getOccupiedBeds(roomName: string): number {
  //   const filteredUsers = this.users.filter((user: any) => user.roomNumber === roomName);
  //   return filteredUsers.length; // Returning occupied beds count
  // }

  getOccupiedBeds(roomName: string): number {
    if (!this.users) {
      return 0; // Return 0 if users are not loaded yet
    }
    const filteredUsers = this.users.filter(
      (user: any) => user.roomNumber === roomName
    );
    return filteredUsers.length; // Returning occupied beds count
  }

  getUsers() {
    this.roomService.allCustomerList().subscribe((data) => {
      this.users = data;
    });
  }

  roomMembsers(room: any) {
    console.log('Room Number Sent:', room.roomName);
    this.roomService.getRoomDetails(room.roomName).subscribe(
      (response) => {
        this.roomDetails = response;
        this.roomMembersVisible = true;
      },
      (error) => {
        console.error('Error fetching room details:', error);
      }
    );
  }
}
