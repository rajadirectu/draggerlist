import React, { useState, MouseEvent, KeyboardEvent } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const tasks = [
  { id: "1", content: "Adams, City of, TN" },
  { id: "2", content: "Alcoa, City of, TN" },
  { id: "3", content: "Allardt, City of, TN" },
  { id: "4", content: "Ardmore, City of, TN" },
  { id: "5", content: "Aloka, City of, TN" }
];

let selectedJurisdictions = [];

const taskStatus = {
  available: {
    selectedItems: false,  
    name: "Available Jurisdiction",
    items: tasks
  },
  selected: {
    selectedItems: true,
    name: "Selected Jurisdiction",
    items: []
  }
//   ,
//   inProgress: {
//     name: "In Progress",
//     items: []
//   },
//   done: {
//     name: "Done",
//     items: []
//   }
};

// Using onClick as it will be correctly
  // preventing if there was a drag
  const onClick1 = (event: MouseEvent,item,index,columns) => {
    console.log(columns);
    console.log(item);
    selectedJurisdictions.push({id:item.id,content:item.content,AppSeqId:index+1});
    // if (event.defaultPrevented) {
    //   return;
    // }

   // if (event.button !== 0) {
   //   return;
   // }

    // marking the event as used
    //event.preventDefault();

    //performAction(event);
  };

  // // Determines if the platform specific toggle selection in group key was used
  // const wasToggleInSelectionGroupKeyUsed = (event: MouseEvent | KeyboardEvent) => {
  //   const isUsingWindows = navigator.platform.indexOf('Win') >= 0;
  //   return isUsingWindows ? event.ctrlKey : event.metaKey;
  // };

  // // Determines if the multiSelect key was used
  // const wasMultiSelectKeyUsed = (event: MouseEvent | KeyboardEvent) => event.shiftKey;
  // let props;
  // const performAction = (event: MouseEvent | KeyboardEvent) => {
  //   console.log(event);
  //   const {
  //     item,
  //     toggleSelection,
  //     toggleSelectionInGroup,
  //     multiSelectTo,
  //   } = props;

  //   if (wasToggleInSelectionGroupKeyUsed(event)) {
  //     toggleSelectionInGroup(item.id);
  //     return;
  //   }

  //   if (wasMultiSelectKeyUsed(event)) {
  //     multiSelectTo(item.id);
  //     return;
  //   }

  //   toggleSelection(item.id);
  // };


const onDragEnd = (result, columns, setColumns) => {
    
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    //console.log(destColumn);    
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    if(destColumn.selectedItems === true){
        selectedJurisdictions = [];
        selectedJurisdictions.push(destItems);
        console.log(selectedJurisdictions);
    }
    else{
        selectedJurisdictions = [];
        selectedJurisdictions.push(sourceItems);
        console.log(selectedJurisdictions);
    }
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function BusinessLicense(props) {
  const [columns, setColumns] = useState(taskStatus);

  

  return (
    <div>
       {/* <h3 style={{ textAlign: "center" }}>Available Jurisdiction</h3>  */}
      <div
        style={{ display: "flex", justifyContent: "center", height: "auto" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <span>{column.name}</span>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (                       
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        //  onClick={onClick}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 400
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                                
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      onClick={()=>{onClick1(item,index,columns)}}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 3px 0",
                                        minHeight: "20px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                        position:"static"
                                      }}
                                    >
                                      <span> {item.content} </span>
                                      {columnId==='selected'?<span>App seq Id {index+1}</span>:''}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default BusinessLicense;
