import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-chat-dialog',
  templateUrl: './add-chat-dialog.component.html',
  styleUrls: ['./add-chat-dialog.component.css']
})
export class AddChatDialogComponent implements OnInit {

  public name: string;
  constructor(
    public dialogRef: MatDialogRef<AddChatDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
