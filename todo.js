const showOneDivHideButtons=(divIdToShow) => {
	const showThisDiv = document.getElementById(divIdToShow);
	if (showThisDiv) {
		showThisDiv.style.display='';
		const buttonsDiv = document.getElementById('buttons');
		buttonsDiv.style.display='none';
	}
}
const showDashboardHideDivById = (id) => {
	const hideThisDiv = document.getElementById(id);
	hideThisDiv.style.display='none';
	const dashboardDiv = document.getElementById('dashboardDiv');
	dashboardDiv.style.display = '';
}
function signUpClick() {
	showOneDivHideButtons('signupDiv');
}
function loginClick() {
	showOneDivHideButtons('loginDiv');
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
	const inputFields = ['firstname','lastname','email','password'];
	let validationPassed = validateCompulsoryTextFields(inputFields);
	let compulsoryCheckBoxField = document.getElementById('agree');
	let checkBoxErrorField = document.getElementById("agreeerror");
	if (!(compulsoryCheckBoxField.checked===true) ) {
		checkBoxErrorField.innerText = "You must agree to the terms of use";
		validationPassed = false;
	} else {
		checkBoxErrorField.innerText = "";
	}
	const emailEntered = document.getElementById('email').value;
	const userEmailKey = "user " + emailEntered;// space is not valid in email so this is unique for this user
	const curUserWithEmail = localStorage.getItem(userEmailKey);
	if (curUserWithEmail) {
		validationPassed = false;
		document.getElementById('emailerror').innerText = "That email address is already in use!";
	}
	if (validationPassed) {
		const userObj = {};
		for(var key of inputFields) {
			userObj[key] = document.getElementById(key).value;
		}
		localStorage.setItem(userEmailKey,JSON.stringify(userObj));
		localStorage.setItem('lists '+ emailEntered,JSON.stringify({}));
		showDashboardHideDivById('signupDiv');
	}
}
function loginAttempt() {
	debugger;

	const inputFields = ['email','password'];
	let validationPassed = validateCompulsoryTextFields(inputFields);
	if (validationPassed) {
		const loginDiv = document.getElementById('loginDiv');
		signupDiv.style.display='none';
	}
}