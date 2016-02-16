var checkList1 = document.getElementById('PC');
var checkList = document.getElementById('regions');
	
checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
	if (checkList.classList.contains('visible'))
		checkList.classList.remove('visible');
	else
		checkList.classList.add('visible');
}
checkList1.getElementsByClassName('anchor')[0].onclick = function (evt) {
	if (checkList1.classList.contains('visible'))
		checkList1.classList.remove('visible');
	else
		checkList1.classList.add('visible');
}

function getBoxInfo(){
	document.getElementById("Typed").innerHTML = document.getElementById("SearchBoxText").value;
	document.getElementById("AdvTyped").innerHTML = document.getElementById("AdvSearchBoxText").value;
}