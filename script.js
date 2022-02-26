const taskList = [];
const badList = [];
let totalHours = [];
let badHours = [];
let taskListElm = document.getElementById("task-list");
let badListElm = document.getElementById("bad-list");
const weekHrs = 105;


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
    let ttlHr = taskTotalHrs();
    if (hr<=0){
        return alert("Hours should be greater than zero.");
    }
    else if(ttlHr == weekHrs){
        return alert("You have alread allocated the maximum hours for the week. Please consider delete some tasks to be able to add new task.");
    }
    else if(ttlHr + hr > weekHrs){
        return alert(`maximum hours you could enter is ${weekHrs-ttlHr}`);
    }
    else{
        taskList.push(obj);
    }
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
                <td class="text-light">${item.task}</td>
                <td class="text-light">${item.hr} hours</td>
                <td>
                    <button class="btn btn-danger" onclick ="deleteTaskList(${index})"><i class="fa-solid fa-trash-can"></i></button>
                    <button class="btn btn-primary" onclick = "markAsNotToDo(${index})"><i class="fa-solid fa-arrow-right-long"></i></button>
                </td>
            </tr>
            `
    });

    taskListElm.innerHTML = str;

    // console.log(innitialVal);

    taskTotalHrs();


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
                <td class="text-light">${item.task}</td>
                <td class="text-light">${item.hr}hrs</td>
                <td>
                    <button class="btn btn-warning" onclick="markAsToDo(${index})"><i class="fa-solid fa-arrow-left-long"></i></button>
                    <button class="btn btn-danger" onclick="deleteBadList(${index})"><i class="fa-solid fa-trash-can"></i></button>

                </td>
            </tr>
        `

    })

    badListElm.innerHTML = str;
    // console.log(innitialVal);
    badTotalHrs();
    taskTotalHrs();

}


//delete item from task list
const deleteTaskList = i =>{
    // console.log(i);
    const itm = taskList.splice(i,1);
    // 1 mean delete only 1 item
    // i here represent index of the trash can item that was clicked.
    display();
    return itm[0];
    taskTotalHrs();
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
    const  goodItem = deleteBadList(i);
    taskList.push(goodItem);
    display();
}


const taskTotalHrs = () => {
    const badhrs = badTotalHrs();
    const innitialVal = 0;
    totalHours = taskList.reduce((accumVal,item) => accumVal + item.hr,innitialVal); 
    totalHours = totalHours + badhrs;
    console.log(totalHours);
    document.getElementById("total-hours").innerText = totalHours;
    return totalHours;
}


const badTotalHrs = () => {
    const innitialVal = 0;
    totalBadHours = badList.reduce((accumVal,item) => accumVal + item.hr,innitialVal); 
    console.log(totalBadHours);
    document.getElementById("bad-hr").innerText = totalBadHours;
    return totalBadHours;
}