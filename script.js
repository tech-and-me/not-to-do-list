const taskList = [];
const badList = [];
let taskListElm = document.getElementById("task-list");
let badListElm = document.getElementById("bad-list");
// let taskListElm = document.getElementsByClassName("task-list");


const handleOnSubmit = e => {
    const frmDt = new FormData(e);
    const task = frmDt.get('task');
    const hr = +frmDt.get('hr');
    console.log(task,hr);
    // console.log(frmDt);
    const obj = {
        // task : task,
        // hr : hr
        task,
        hr
    }
    taskList.push(obj);
    console.log(obj);
    // console.log(task-list);
    display();
};


//Display task list in the DOM
const display = () =>{
    //clear the dom
    let str = ''


    // loop through the task list and convert in to tr string
    taskList.map((item,index)=>{
        str += ` 
            <tr>
                <td>
                    <input type="checkbox">
                </td>
                <td>${item.task}</td>
                <td>${item.hr} hours</td>
                <td>
                    <button class="btn btn-danger" onclick ="deleteTaskList(${index})"><i class="fa-solid fa-trash-can"></i></button>
                    <button class="btn btn-primary" onclick = "markAsNotToDo(${index})"><i class="fa-solid fa-arrow-right-long"></i></button>
                </td>
            </tr>
            `
    });

    taskListElm.innerHTML = str;


}   // end of const display method


//display bad task list in the dom
const displayBadList = () => {
    let str = '';
    badList.map((item,index)=>{

        str += `
                <tr>
                <td>
                    <input type="checkbox">
                </td>
                <td>${item.task}</td>
                <td>${item.hr}hrs</td>
                <td>
                    <button class="btn btn-warning" onclick="markAsToDo(${index})"><i class="fa-solid fa-arrow-left-long"></i></button>
                    <button class="btn btn-danger" onclick="deleteBadList(${index})"><i class="fa-solid fa-trash-can"></i></button>

                </td>
            </tr>
        `

    })

    badListElm.innerHTML = str;

}


//delete item from task list
const deleteTaskList = i =>{
    // console.log(i);
    const itm = taskList.splice(i,1);
    // 1 mean delete only 1 item
    // i here represent index of the trash can item that was clicked.
    display();
    return itm[0];
}

//delete item from bad list
const deleteBadList = i =>{
    // console.log(i);
    const itm = badList.splice(i,1);
    // 1 mean delete only 1 item
    // i here represent index of the trash can item that was clicked.
    displayBadList();
    return itm[0];
}



//transfer item as not to do item
const markAsNotToDo = i => {
    // console.log(i);
    const  badItem = deleteTaskList(i);
    badList.push(badItem);

    displayBadList();
}

//transfer item back to to-do list
const markAsToDo = i => {
    // console.log(i);
    const  badItem = deleteBadList(i);
    taskList.push(badItem);
    
    display();
}






