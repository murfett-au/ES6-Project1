/* 

Good lord this took a long time!

I recently wrote a React App, which exposed some lack of knowledge of ES6,
Hence I am doing this course.

This would have taken about 25% of the time to do in React compared with native JS.

*/
localStorage.setItem('loggedInUserEmail',"");// when someone logs in or registers, this holds their email address

const getListsKey = () => {	return ("lists " + localStorage.getItem('loggedInUserEmail'))};
const getEmailKey = (emailEntered) => "user "+emailEntered;
//const addToDoList = () => { // note that ES6 in this case takes more characters than:
function renameList() {

	const el = document.getElementById('newListname');
	const oldName = el.getAttribute('data-oldListName');
	const newName = el.value;
	
	if (oldName!=newName) {
		let listsObj = getListsObj();
		document.getElementById('listName').innerText = newName;
		if (listsObj[oldName]) {
			listsObj[newName]  = listsObj[oldName];
			delete listsObj[oldName];
			saveListsObj(listsObj);
			refreshToDoList();
			document.getElementById('newListname').value="";
		} else {
			console.log("Can't find the old list by name of '"+ oldName + "'")
		}
		

	}


}

function refreshToDoList() {
	let listsObj = getListsObj();
	const listName = document.getElementById('listName').innerText;
	let list = listsObj[listName];
	let empty=true;
	const items = document.getElementById('items');
	while (items.lastChild) {
		items.removeChild(items.lastChild)
	}
	for(var listItem in list) {
		
		empty = false;
		let li = document.createElement('li');
		let label = document.createElement('label');
		label.innerText=listItem;
		const checkBox = document.createElement('input');
		checkBox.type='checkbox';
		checkBox.checked = list[listItem].done;
		label.appendChild(checkBox);
		li.appendChild(label);
		items.appendChild(li);
	}
	if (empty) {
		const li = document.createElement('li');
		li.innerHTML = "<em>No items</em>";
		items.appendChild(li);
	}
	document.getElementById('newListname').setAttribute('data-oldListName',listName);
	hideAllDivsButOne('oneListDiv');
	
}

function addNewListItem() {
	
	let newListItem = document.getElementById('newListItem').value;
	
	if (newListItem=="") {
		alert('Enter an item first');
	} else {
		let listsObj = getListsObj();
		const listName = document.getElementById('listName').innerText;
		let list = listsObj[listName];
		if (list) {
			if (list[newListItem]) {
				alert("There is already an item '" + newListItem + "' in this list.");
			} else {
				list[newListItem] = {
					done:false
				}
				saveListsObj(listsObj);
				refreshToDoList();
				document.getElementById('newListItem').value="";
			}

		}

	}
}
function toggleItemDoneStatus(e) {
	const nodeName = e.target.nodeName;
	let listItem = false;
	switch (nodeName) {
		case "INPUT":
			e.preventDefault();
			listItem = e.target.parentNode.innerText;
		break;
		case "LABEL":
			listItem = e.target.innerText;
		break;
		case "LI":
			listItem = e.target.firstChild.innerText;
		break
		default:
			console.log('unexpected nodeName:', nodeName);
	}
	if (listItem) {
		const listName = document.getElementById('listName').innerText;
		listsObj = getListsObj();
		
		listsObj[listName][listItem].done = !listsObj[listName][listItem].done;
		
		saveListsObj(listsObj);
		refreshToDoList();
	}
	
	
}
function addToDoList() {
	
	let inp = document.getElementById('newToDoListName');
	let newListName = inp.value;
	if (newListName=="") {
		alert("please enter a list name");
	} else {
		let listsObj = getListsObj();
		if (listsObj[newListName]) {
			alert('please enter a distinct list name (the value you entered is already a list)');
		} else {
			listsObj[newListName] = {};
			saveListsObj(listsObj);
			refreshListOfToDoLists();
			inp.value = "";
		}
	}
}
function getListsObj() {
	let key=getListsKey();
	let listsJson = localStorage.getItem(key);
	return JSON.parse(listsJson);// should be in try catch block
}

function saveListsObj(listsObj) {
	localStorage.setItem(getListsKey(),JSON.stringify(listsObj));
}
function showOneList(e) {
	listName=e.target.innerText;
	document.getElementById('listName').innerText = listName;
	refreshToDoList();
}
const refreshListOfToDoLists = () => {
	
	let ul=document.getElementById('todoLists');
	let listsObj = getListsObj();
	let noLists = true;
	while (ul.lastChild) {
		ul.removeChild(ul.lastChild)
	}

	for(var listName in listsObj) {
		noLists = false;
		let li = document.createElement('li');
		li.innerText = listName;
		// before this course I would have attached an event to each <li>
		//li.addEventListener('click',function(event) {showOneList(event.target.innerText);})
		// now I just attach the onclick to the <UL>
		ul.appendChild(li);
	}
	if (noLists) {
		let li = document.createElement('li');

		li.innerHTML = "<em>No Lists Found</em>";
		ul.appendChild(li);
	}

}

const refreshDashboard = () => {
	
	var loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
	if (loggedInUserEmail!="") {
		hideAllDivsButOne('dashboardDiv',loggedInUserEmail);
		refreshListOfToDoLists();
	} else {
		hideAllDivsButOne('buttons',loggedInUserEmail);
	}
}
const hideAllDivsButOne = (showThisDiv,loggedInUserEmail) => {
	
	if (typeof loggedInUserEmail =='undefined') {
		loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
	}
	for(var hideThisDivId of ['buttons','signupDiv','loginDiv','dashboardDiv','oneListDiv']) {
		if (showThisDiv !== hideThisDivId) {
			document.getElementById(hideThisDivId).style.display = 'none';
		}
	}
	
	document.getElementById(showThisDiv).style.display = '';// could crash is showThisDiv does not exist
	

	if (loggedInUserEmail ==="") {
		logoutDiv.style.display = 'none';
	} else {
		logoutDiv.style.display = '';
	}

}
function signUpClick() {
	
	hideAllDivsButOne('signupDiv');
}
function loginClick() {
	hideAllDivsButOne('loginDiv');
}
const validateCompulsoryTextFields=(inputFieldsArray) => {
	let valid = true;
	let compulsoryField;
	let errorField;
	
	for(let fieldId of inputFieldsArray) {
		compulsoryField = document.getElementById(fieldId);
		errorField = document.getElementById(fieldId + "error");
		if (compulsoryField.value=='') {
			valid = false;
			errorField.innerText="Please enter a value";
		} else {
			errorField.innerText="";
		}
	}
	return valid;
}

function signupSubmit() {
	const inputFields = ['firstname','lastname','signupemail','signuppassword'];
	let validationPassed = validateCompulsoryTextFields(inputFields);
	let compulsoryCheckBoxField = document.getElementById('agree');
	let checkBoxErrorField = document.getElementById("agreeerror");
	if (!(compulsoryCheckBoxField.checked===true) ) {
		checkBoxErrorField.innerText = "You must agree to the terms of use";
		validationPassed = false;
	} else {
		checkBoxErrorField.innerText = "";
	}
	const emailEntered = document.getElementById('signupemail').value;
	const userEmailKey = getEmailKey(emailEntered);// space is not valid in email so this is unique for this user
	const curUserWithEmail = localStorage.getItem(userEmailKey);
	if (curUserWithEmail) {
		validationPassed = false;
		document.getElementById('signupemailerror').innerText = "That email address is already in use!";
	}
	if (validationPassed) {
		const userObj = {};
		let userObjKey;
		for(var key of inputFields) {
			if (key.substring(0,6)==='signup') {
				userObjKey=key.substring(6);
			} else {
				userObjKey = key;
			}
			userObj[userObjKey] = document.getElementById(key).value;
		}
		

		localStorage.setItem('loggedInUserEmail',emailEntered);
		localStorage.setItem(userEmailKey,JSON.stringify(userObj));
		localStorage.setItem(getListsKey(),JSON.stringify({}));
		refreshDashboard();
		
		
	}
}
function loginAttempt() {
	loggedInUserEmail = "";// unless we find a matching user below, this will log people out.
	const inputFields = ['loginemail','loginpassword'];
	let validationPassed = validateCompulsoryTextFields(inputFields);
	if (validationPassed) {
		// see if user exists:
		const emailEntered = document.getElementById('loginemail').value;
		const userEmailKey = getEmailKey(emailEntered);// space is not valid in email so this is unique for this user
		const userWithEnteredEmail = localStorage.getItem(userEmailKey);
		
		if (userWithEnteredEmail) {
			const userObj = JSON.parse(userWithEnteredEmail)
			const passwordEntered = document.getElementById('loginpassword').value;
			if (userObj.password==passwordEntered) {
				localStorage.setItem('loggedInUserEmail',emailEntered);
				refreshDashboard();
				

			} else {
				document.getElementById('loginpassworderror').innerText="Incorrect password";
			}
		} else {
			document.getElementById('loginemailerror').innerText='email not recognised';
		}	
		
	}
}
function localStorageDumpUpdate() {
	const innerDiv = document.getElementById('localStorageDumpInner');
	var len = localStorage.length;
	while (innerDiv.lastChild) {
	    innerDiv.removeChild(innerDiv.lastChild);
	}
	if (len>0) {
		const ul = document.createElement('ul');
		innerDiv.appendChild(ul);

		for ( var i = 0; i < len; ++i ) {
			var newLi = document.createElement('li');
			let key = localStorage.key( i );
			newLi.innerText = key + ": " + localStorage.getItem(key);
	  		ul.appendChild(newLi);
		}

	} else {
		const p = document.createElement('p');
		p.innerText = 'No data in local storage';
		innerDiv.appendChild(p);
	}
}
const clearLocalStorage = () => localStorage.clear();
const logout = () => {
	localStorage.setItem('loggedInUserEmail',"");
	hideAllDivsButOne('buttons');
}