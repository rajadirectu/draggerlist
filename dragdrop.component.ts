import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css']
})
export class DragdropComponent implements OnInit {
  activeList = [
    'John',
    'Watson'
  ];

  inactiveList = [
    'Adam',
    'Jack',
    'Katherin'
  ];
  
  constructor() { }

  ngOnInit(): void {
    for(let k=0;k<=3010; k++){
      this.inactiveList.push('Items'+k+ ' Dane'+k);
    }
    for(let k=3001;k<=5101; k++){
      this.activeList.push('Items'+k+ ' Kane'+k);
    }
  }
  Options(event){
    console.log(event);
  }

}
