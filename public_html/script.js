const baseUrl = `http://flip2.engr.oregonstate.edu:7930/`;
const deleteTable = () =>{
    // delete table - jquery
    $("#workoutsBody").remove();
};
const makeTable = (Rows)=>{
    // delete table first then rebuild:
    // iterate over the rows
    // add table data cells each with data with specific column
    deleteTable();
    var tbody= document.createElement("tbody");
    tbody.id = "workoutsBody";
    tbody.appendChild(makeHeaderRow());
    for (var row in Rows){
        tbody.appendChild(makeRow(Rows[row], false));
    }
    document.querySelector("#workoutsTable").appendChild(tbody);
};
const makeHeaderRow = () =>{
    //the init header values
    categoryList = ["ID", "Name","Reps","Weight", "Unit", "Date"]
    var headerRow = document.createElement("tr");
    for(var n in categoryList){
        var tableHeaders = document.createElement("th")
        if(n == 0){
            tableHeaders.appendChild(document.createTextNode(categoryList[n]));
            //quick use of  style instead of creating css for this - hides column
            tableHeaders.style.display = "none";
            headerRow.appendChild(tableHeaders);
        }else{
            tableHeaders.appendChild(document.createTextNode(categoryList[n]));
            headerRow.appendChild(tableHeaders);
        }
    }
    return headerRow
};
const makeRow = (rowData)=>{
    // make row = makes a tr and then for every piece in rowData it creates a cell. appends the cell to the row 
    // Make the form that wraps the radioInputs
    var tableRow = document.createElement("tr")
    var tableDataCell = document.createElement("td");
    tableDataCell.id = "update";
    var tableDataCell2 = document.createElement("td");
    tableDataCell2.id = "delete";
    for(var cell in rowData){
        var tableRowCell = document.createElement("td");
        // dictates the order the radio inputs are created
        if(rowData.unit==0 && cell =="unit"){
            tableRowCell.appendChild(makeRadioInputs("lbs", 0, true));
            tableRow.appendChild(tableRowCell)
        }else if(rowData.unit==1 && cell=="unit"){
            tableRowCell.appendChild(makeRadioInputs("kgs", 1, true));
            tableRow.appendChild(tableRowCell)
        }else{
            // hides the id data table cell 
            if(cell == "id"){
                tableRowCell.appendChild(makeCell(rowData, cell));
                // quick use of  style instead of creating css for this
                tableRowCell.style.display = "none";
                tableRow.appendChild(tableRowCell)
            }else{
                tableRowCell.appendChild(makeCell(rowData, cell));
                tableRow.appendChild(tableRowCell)
            }
        }
    }
    tableDataCell.appendChild(makeButton("update", "update"));
    tableDataCell2.appendChild(makeButton("remove", "delete"));
    tableRow.appendChild(tableDataCell);
    tableRow.appendChild(tableDataCell2);
    return tableRow
};
const makeCell = (contents, cell)=>{
    // Create a table data cell with if-elses to match the cell name
    if(cell == "name"){
        return makeInput("text", "name", contents[cell]);
    }else if(cell=="reps"){
        return makeInput("number", "reps", contents[cell]);
    }else if(cell == "weight"){
        return makeInput("number", "weight", contents[cell]);
    }else if(cell=="date"){
        return makeInput("date", "date", contents[cell].substring(0,10));
    }else{
        return document.createTextNode(contents[cell]);
    }
};
// cell calls this
const makeInput = (type, name, value)=>{
    // Creates form input
    var input = document.createElement("input");
    //id is newly added
    input.id = name;
    input.type = type;
    input.name = name;
    input.value = value;
    input.placeholder = value;
    input.disabled = true;
    return input
};
// row calls this
const makeButton = (name, txt)=>{
    //making 2 buttons at the end of the rows without making 2 button explicitly
    var button = document.createElement("button")
    button.id = txt
    var buttonContent = document.createTextNode(txt)
    button.appendChild(buttonContent)
    return button
};
// row calls this
// make it so that the checked value stays on there permanently
// wrap in a form so that we can check it off
const makeRadioInputs = (name, value, checked=false)=>{
    var form = document.createElement("form")
    form.action = "";
    var label = document.createElement("label");
    if(value == 0){
        // first input checked
        var initRadio = initRadioInput(name, value);
        label.appendChild(document.createTextNode(name));
        label.appendChild(initRadio)
        // second input not checked
        var secondRadio = secondRadioInput("kgs", 1);
        label.appendChild(document.createTextNode("kgs"));
        label.appendChild(secondRadio)
    }else{
        var initRadio = secondRadioInput("lbs", 0);
        label.appendChild(document.createTextNode("lbs"));
        label.appendChild(initRadio)
        // second input not checked
        var secondRadio = initRadioInput(name, value);
        label.appendChild(document.createTextNode(name));
        label.appendChild(secondRadio)
    }
    form.appendChild(label)
    return form
};
const secondRadioInput = (name, value)=>{
    var radioInputs2 = document.createElement("input");
    radioInputs2.type = "radio";
    radioInputs2.disabled = true;
    radioInputs2.checked = false;
    if(name == "lbs"){
        radioInputs2.name = "radio";
        radioInputs2.value = value;
        radioInputs2.id = name;
        radioInputs2.appendChild(document.createTextNode(name));
        return radioInputs2
    }else{
        radioInputs2.name = "radio";
        radioInputs2.value = value;
        radioInputs2.id = name;
        radioInputs2.appendChild(document.createTextNode(name));
        return radioInputs2
    }
};
const initRadioInput = (name, value)=>{
    var radioInputs = document.createElement("input");
    radioInputs.type = "radio";
    radioInputs.name = "radio";
    radioInputs.value = value;
    radioInputs.disabled = true;
    //newly added
    radioInputs.id = name;
    radioInputs.setAttribute('checked', 'checked');
    // radioInputs.checked = true;
    radioInputs.appendChild(document.createTextNode(name));
    return radioInputs
};
const enableRow = (rowEl) =>{
    // make the row able to edit
    // rowEl is going to be the row of the update button
    var row = rowEl.children;
    // we have to turn disable to false so that we can make inputs
    // this is a HTML collection(9)
    for(var i=1; i<7; i++){
        if(row[i].firstElementChild.tagName =="FORM"){
            // enables the data cells by removing the disabled = 'true' attribute
            row[i].firstElementChild.firstElementChild.firstElementChild.disabled = false;
            // removes the checked attribute from lbs/kgs input
            row[i].firstElementChild.firstElementChild.firstElementChild.removeAttribute("checked")
            row[i].firstElementChild.firstElementChild.lastElementChild.disabled = false;
            row[i].firstElementChild.firstElementChild.firstElementChild.removeAttribute("checked")
        }else{
            row[i].firstElementChild.disabled = false;
        }
    }
};
const toggleUpdateButton  = (rowEl)=>{
    // toggle done and submit
    // rowEl is button
    rowEl.className = "btn btn-info"
    rowEl.id = "done"
    rowEl.firstChild.nodeValue = "done"
};
const getData = ()=>{
    //get request to database
    const req = new XMLHttpRequest();
    req.open("GET", baseUrl, true);
    req.send(null);
};
const postRequest = ()=>{
    var payload = {name:'name', reps: null, weight:null, unit:null, date:null}
    payload.name = document.getElementById("name").value;
    payload.reps = document.getElementById("reps").value;
    payload.weight = document.getElementById("weight").value;
    if(document.getElementById("lbs").checked == true){
        payload.unit = document.getElementById("lbs").value;
    }else{
        payload.unit = document.getElementById("kgs").value;
    }
    payload.date = document.getElementById("date").value;
    return payload
};
const putRequest = (row, id)=>{
    const payload = {name:'name', reps: null, weight:null, unit:null, date:null, id:null}
    const currRow = row.children;
    payload.id = id;
    payloadList = ["null", "name", "reps", "weight", "unit", "date"]
    for(var i=1; i<6; i++){
        payload[payloadList[i]] = currRow[i].firstElementChild.value;
        if(i==4){
            //check add form for tips
            if(currRow[i].firstElementChild.firstElementChild.firstElementChild.checked==true){
                payload[payloadList[i]] = currRow[i].firstElementChild.firstElementChild.firstElementChild.value;
            }else{
                payload[payloadList[i]] = currRow[i].firstElementChild.firstElementChild.lastElementChild.value;
            }
        }
    }
    return payload;
};
// Submit the add form and rebuild the table
document.querySelector("#addForm").addEventListener('submit', event=>{
    var req = new XMLHttpRequest();
    const payload = postRequest();
    req.open('POST', baseUrl, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', ()=>{
        if(req.status >=200 && req.status<400){
            var response = JSON.parse(req.responseText).rows
            // alert(response[0])
            // let tableData = getData();
            makeTable(response);
        }else{
            var response = JSON.parse(req.responseText).rows
            alert(response)
        }
    })
    req.send(JSON.stringify(payload));
    event.preventDefault();
});
//update or delete row 
document.querySelector("#workoutsTable").onclick = (event)=>{
    let target = event.target; //where the click was
    if(target.tagName =="BUTTON"){
        //grabs td 
        var currDataCell = target.parentNode
        //grabs tr
        var currRow = currDataCell.parentNode
        //grabs ID
        var currRowID = currRow.firstElementChild.textContent
        if(target.id =="update"){
        //toggle to done and enable row
        toggleUpdateButton(target);
        enableRow(currRow);
        //if done button then do a put call
        }else if(target.id == "done"){
            //send a put request to server
            var req = new XMLHttpRequest();
            var payload = putRequest(currRow, currRowID);
            req.open('PUT', baseUrl, true);
            req.setRequestHeader('Content-Type', 'application/json');
            req.addEventListener('load', ()=>{
                if(req.status >=200 && req.status<400){
                    var response = JSON.parse(req.responseText).rows
                    makeTable(response);
                }else{
                    var response = JSON.parse(req.responseText).rows
                    alert(response)
                }
            });
            req.send(JSON.stringify(payload));
        }else if(target.id == "delete"){
        //delete call
        //need to traverse to first TD holding ID and then put that in the var object and sent it to delete via delete request
        var rowObject = {id:null}
        rowObject.id = currRowID
        var req = new XMLHttpRequest();
        req.open('DELETE', baseUrl, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', ()=>{
            if(req.status >=200 && req.status<400){
                var response = JSON.parse(req.responseText).rows
                makeTable(response)
            }else{
                var response = JSON.parse(req.responseText).rows
                alert(response)
            }
        })
        req.send(JSON.stringify(rowObject));
        event.preventDefault();
    }
}};
document.querySelector("#reset-table").addEventListener('click', event=>{
    var req = new XMLHttpRequest();
    req.open('GET', baseUrl + 'reset-table', true);
    req.addEventListener('load', ()=>{
        if(req.status >=200 && req.status<400){
            var response = ''
            // let tableData = getData();
            makeTable(response);
        }
    });
    req.send(null);
    event.preventDefault();
});

(async ()=>{
    let tableData = await getData();
    makeTable(tableData);
})();
