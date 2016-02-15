var checkList1 = document.getElementById('PC');
var checkList = document.getElementById('regions');
	
function show(){
	checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
		if (checkList.classList.contains('visible'))
			checkList.classList.remove('visible');
		else
			checkList.classList.add('visible');
	}
}
function showNext(){
	checkList1.getElementsByClassName('anchor')[0].onclick = function (evt) {
		if (checkList1.classList.contains('visible'))
			checkList1.classList.remove('visible');
		else
			checkList1.classList.add('visible');
	}
}