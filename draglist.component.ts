import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'pro-draglist',
  templateUrl: './draglist.component.html',
  styleUrls: ['./draglist.component.css']
})
export class DragListComponent implements OnInit {
@Input() activeList:any;
@Input() inactiveList:any;
@Input() dragOptions:any;
@Input() dragger:boolean = false;
@Input() proWidth:string = '';
@Input() ProSearch:boolean = true;
@Input() ProSelectAll:boolean = true;
@Input() proListClass:string = 'mypanel-draglist';
@Input() ProSelectAllText:string = 'Mark all affected';
@Input() ProDeSelectAllText:string = 'Mark all unaffected';
@Input() ProSelectAllClass:string = '';
@Input() ProDeSelectAllClass:string = '';
@Input() ProPlaceholder:string = 'Search List';
activeListCopy;
inactiveListCopy;
searchActiveText: string;
searchInactiveText: string;
keyOutList:any = [];

@Output() draggerListOpts = new EventEmitter();
@Output() draggerScrollList = new EventEmitter();
@Output() draggerSearchList = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
   this.keyOutList['Active'] = this.activeList;
    this.keyOutList['Inactive'] = this.inactiveList;
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
     // console.log('dropped Event', `> dropped '${event.item.data}' into '${event.container.id}'`);
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
     // console.log('dropped Event', `> dropped '${event.item.data}' into '${event.container.id}'`);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.keyOutList['Active'] = this.activeList;
    this.keyOutList['Inactive'] = this.inactiveList;
    this.emitOutValue(this.keyOutList);
  }

emitOutValue(evt){
  this.draggerListOpts.emit(evt);
}

  dragallcheckList(type){
    if (type=='inactive') {
      this.activeList = this.activeList.concat(this.inactiveList);
      this.inactiveList = [];
    } else if(type== 'active') {
      this.inactiveList = this.inactiveList.concat(this.activeList);
      this.activeList = [];
    }
    this.keyOutList['Active'] = this.activeList;
    this.keyOutList['Inactive'] = this.inactiveList;
    this.emitOutValue(this.keyOutList);
  }

  dragSearch(evt:any, type) {
    const val = [{'search':evt.target.value, 'type':type}]
    this.draggerSearchList.emit(val);
  }

  public onScrollEvent(event: any): void {
    this.draggerScrollList.emit(event);
  }

 dragClickList($event, list, indx, type){
    if (type=='inactive') {
      this.inactiveList = this.inactiveList.filter(item => item !== list);
      this.activeList.push(list);
    } else if(type== 'active') {
      this.activeList = this.activeList.filter(item => item !== list);
      this.inactiveList.push(list);
    }
    this.keyOutList['Active'] = this.activeList;
    this.keyOutList['Inactive'] = this.inactiveList;
    this.emitOutValue(this.keyOutList);
  }
}
