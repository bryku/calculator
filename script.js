// Create our Event Listeners.
window.onload = function(){// Wait until page is done loading.
	// Since Display is an Input Element and users can type direction into it. We want to remove invalid characters.
	document.querySelector('#display').addEventListener('keyup',(event)=>{
		event.target.value = removeInvalidCharacters(event.target.value);
	});
	// Find the buttons and Add Event Listeners so we can handle clicks.
	document.querySelectorAll('#buttons > *').forEach((element)=>{// Find buttons and loop through them.
		element.addEventListener('click',(event)=>{// Add Event Listener
			let button = event.target.innerHTML;// Get text from button
			switch(button){// Handle Buttons
				case '=': calculateDisplay(); break;
				case 'AC': clearDisplay(); break;
				default: updateDisplay(button); 
			}
		});
	});
};
function removeInvalidCharacters(string){
	return string.replace(/[^0-9\-\.\-\+\*\/\(\)\^]/gmsi,'');
}
function updateDisplay(string){
	document.querySelector('#display').value+= removeInvalidCharacters(string);
}
function clearDisplay(){
	document.querySelector('#display').value = '';
}
function calculateDisplay(){
	var string = document.querySelector('#display').value;
	var result = processEquation(string);
	document.querySelector('#display').value = string + '=' + result;
}
function processEquation(string){
	var match = string.match(/\*|\/|\+|\-|\^/gmsi) || [];
	while(match.length > 0){
		string = string.replace(/\((.*?)\)/gmsi,(_,s)=>{
			return processEquation(s)
		}).replace(/([0-9\.\-]+)\^([0-9\.\-]+)/gmsi,(_,n1,n2)=>{
			return Math.pow(n1,n2)
		}).replace(/([0-9\.\-]+)(\*|\/)([0-9\.\-]+)/gmsi,(_,n1,o,n2)=>{
			console.log(1,n1);
			console.log(2,n2);
			return o == '*' ? Number(n1) * Number(n2) : Number(n1) / Number(n2)
		}).replace(/([0-9\.\-]+)(\-|\+)([0-9\.\-]+)/gmsi,(_,n1,o,n2)=>{
			return o == '+' ? Number(n1) + Number(n2) : Number(n1) - Number(n2)
		});
		match = string.match(/\*|\/|\+|\-/gmsi) || [];
	}
	return string
}
