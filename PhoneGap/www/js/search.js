//Variables for dropdown lists
var pageList = document.getElementById('PC');
var regionList = document.getElementById('regions');

//Array for boolean on query options
var options =[] ; options.length = 21;
options.fill(false);


//Shows and hides the lists when clicked
regionList.getElementsByClassName('anchor')[0].onclick = function (evt) {
	if (regionList.classList.contains('visible'))
		regionList.classList.remove('visible');
	else
		regionList.classList.add('visible');
}
pageList.getElementsByClassName('anchor')[0].onclick = function (evt) {
	if (pageList.classList.contains('visible'))
		pageList.classList.remove('visible');
	else
		pageList.classList.add('visible');
}

//Mirror text input function
function getBoxInfo(){
	document.getElementById("Typed").innerHTML = document.getElementById("SearchBoxText").value;
	document.getElementById("AdvTyped").innerHTML = document.getElementById("AdvSearchBoxText").value;
}

//Contains array of selected options
function addQueryOptions(id){	
	if(options[id])
		options[id] = false;
	else
		options[id] = true;
	
	document.getElementById("AR").innerHTML = options[0];
}