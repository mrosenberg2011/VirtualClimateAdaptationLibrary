$(document).on('vclick', '[data-rel=back]', function (e) {
 e.stopImmediatePropagation();
 e.preventDefault();
 $.mobile.back();
});

$(document).on("pageinit", "#mainmenu", function () {
    //set up string for adding <li/>
    var li = '';
    //container for $li to be added
        //add the <li> to "li" variable
        //note the use of += in the variable
        //meaning I'm adding to the existing data. not replacing it.
        //store index value in array as id of the <a> tag
        li += '<li><a href="#browse" id="browse" class="view">Browse</a></li>' +
				'<li><a href="#search" id="search" class="view">Search</a></li>' +
				'<li><a href="#" id="favorites" class="view">Favorites</a></li>' +
				'<li><a href="#" id="rss" class="view">RSS feed</a></li>' +
				'<li><a href="#about" id="about" class="view">About</a></li>';
		//append list to ul
		$("#menulist").append(li).listview("refresh");
        //refresh list to enhance its styling.
});

$(document).on("pageinit", "#browse", function () {
   $.ajax({
		url: 'http://localhost:8888/services/getregions.php',
		dataType: 'jsonp',
		cache: false,
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(info, status){
			var li = '';
			$.each(info, function (i, item) {
				//add the <li> to "li" variable
				//note the use of += in the variable
				//meaning I'm adding to the existing data. not replacing it.
				//store index value in array as id of the <a> tag
				li += '<li><a href="#" id="' + item.r_regionkey + '" class="info-go">' + item.r_name + '</a></li>';
			});
    //append list to ul
			$("#regionlist").append(li).listview("refresh").promise().done(function () {
				//wait for append to finish - thats why you use a promise()
				//done() will run after append is done
				//add the click event for the redirection to happen to #details-page
				$(this).on("click", ".info-go", function (e) {
					e.preventDefault();
					e.stopImmediatePropagation();
					//store the information in the next page's data
					$("#subregions").data("info", this.id);
					//change the page # to second page. 
					//Now the URL in the address bar will read index.html#details-page
					//where #details-page is the "id" of the second page
					//we're gonna redirect to that now using changePage() method
					$.mobile.pageContainer.pagecontainer("change", "#subregions");
				});
			});
		},
		error: function(){
			$("#regionlist").text('There was an error loading the data.');
		}
	});
});

$(document).on("pagebeforeshow", "#subregions", function () {
    //get from data - you put this here when the "a" wa clicked in the previous page
	$( ".list" ).empty();
    var info = $(this).data("info");
    //string to put HTML in
    $.ajax({
		url: 'http://localhost:8888/services/getsubregions.php',
		data: {reg: info},
		dataType: 'jsonp',
		cache: false,
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			var li = '';
			$.each(data, function(i,item){ 
				li += '<li><a href="#" id='+ item.s_regionkey +' class="info-go">' + item.s_name + '</a></li>';
			});
			$("#subregionList").append(li).listview("refresh").promise().done(function () {
				//wait for append to finish - thats why you use a promise()
				//done() will run after append is done
				//add the click event for the redirection to happen to #details-page
				$(this).on("click", ".info-go", function (e) {
					e.preventDefault();
					e.stopImmediatePropagation();
					//store the information in the next page's data
					$("#documents").data("info", this.id);
					//change the page # to second page. 
					//Now the URL in the address bar will read index.html#details-page
					//where #details-page is the "id" of the second page
					//we're gonna redirect to that now using changePage() method
					$.mobile.pageContainer.pagecontainer("change", "#documents");;
				});
			});
		},
		error: function(){
			$("#subregionList").text('There was an error loading the data.');
		}
	});
});

$(document).on("pagebeforeshow", "#documents", function (e) {
	e.stopImmediatePropagation();
    //get from data - you put this here when the "a" wa clicked in the previous page
	$( ".list" ).empty();
    var info = $(this).data("info");
    //string to put HTML in
    $.ajax({
		url: 'http://localhost:8888/services/getdocuments.php',
		data: {sreg: info},
		dataType: 'jsonp',
		cache: false,
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			var li = '';
			$.each(data, function(i,item){ 
				console.log(item.d_title);
				li += '<li><a href="#" id= ' + item.d_title + ' class="info-go">' + item.d_title + '</a></li>';
			});
			$("#documentsList").append(li).listview("refresh").promise().done(function () {
				//wait for append to finish - thats why you use a promise()
				//done() will run after append is done
				//add the click event for the redirection to happen to #details-page
				$(this).on("click", ".info-go", function (e) {
					e.preventDefault();
					e.stopImmediatePropagation();
					//store the information in the next page's data
					$("#pdfdetails").data("info", this.id);
					//change the page # to second page. 
					//Now the URL in the address bar will read index.html#details-page
					//where #details-page is the "id" of the second page
					//we're gonna redirect to that now using changePage() method
					$.mobile.pageContainer.pagecontainer("change", "#pdfdetails");;
				});
			});
		},
		error: function(){
			$("#documentsList").text('There was an error loading the data.');
		}
	});
});


$(document).on("pagebeforeshow", "#about", function () {
    //get from data - you put this here when the "a" wa clicked in the previous page
	$( ".text" ).empty();
	var text = "<center><font size = '4'>" +
						"<p><b>Virtual Climate Adaptation Library</p>" +
						"<font size = '3'><p>Early Mobile Version</p></b>" +
						"<u><p>Senior Design Team:</p></u>" + 
						"<p>Martynas Mickus</p>" +
						"<p>Michael Barber</p>" +
						"<p>Michael Rosenberg</p>" +
						"<p>Cesar Reveron</p>" +
						"<u><p>Client:</u> Dr. Ken Lindeman</p>" +
						"<u><p>Faculty Sponsor:</u> Dr. Keith Gallagher</p>" +
						"</font></font></center>";
	$("#abouttext").append(text);
    
});

$(document).on("pagebeforeshow", "#pdfdetails", function () {
	$( ".abs" ).empty();
	$( ".buttons" ).empty();
    //get from data - you put this here when the "a" wa clicked in the previous page
    var info = $(this).data("info");
	console.log(info);
    $.ajax({
		url: 'http://localhost:8888/services/getdocdetails.php',
		data: {dtitle: info},
		dataType: 'jsonp',
		cache: false,
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			var details = '';
			details += 	'<li>Title: ' + data[0].d_title + '</li>' +
						'<li>Author: ' + data[0].d_authors + '</li>' + 
						'<li>Region: ' + data[0].d_region + '</li>' +
						'<li>Subregion: ' + data[0].d_subregion + '</li>';
			if (data[0].d_document_origin) {
				details += '<li>Origin: ' + data[0].d_document_origin + '</li>';
			}	
			if (data[0].d_page_count) {
				details += '<li>Pages: ' + data[0].d_page_count + '</li>';
			}
			if (data[0].d_publish_date) {
				details += '<li>Published: ' + data[0].d_publish_date + '</li>';
			}			
			if (data[0].d_submit_date) {
				details += '<li>Submited: ' + data[0].d_submit_date + '</li>';
			}	
			$("#detailsList").append(details).listview("refresh");
			
			var buttons = '';
			buttons += 	'<br><a href="#" class="ui-btn ui-btn-inline">Download</a>' +
						'<a href="#" class="ui-btn ui-btn-inline">Open</a>' +
						'<a href="#" class="ui-btn ui-btn-inline">Add to Favorites</a>';
						
			$("#buttons").append(buttons);
			
			var abs = '';
			abs = data[0].d_abstract;
			$("#abstracttext").append(abs);
		},
		error: function(){
			$("#detailsList").text('There was an error loading the data.');
		}
	});
});

$(document).on("pageinit", "#search", function () {
    //set up string for adding <li/>
    var li = '';
    //container for $li to be added
        //add the <li> to "li" variable
        //note the use of += in the variable
        //meaning I'm adding to the existing data. not replacing it.
        //store index value in array as id of the <a> tag
        li += '<li><a href="#basicSearch" id="basicSearch" class="view">Basic Search</a></li>' +
				'<li><a href="#advancedSearch" id="advancedSearch" class="view">Advanced Search</a></li>';
		//append list to ul
		$("#searchlist").append(li).listview("refresh");
        //refresh list to enhance its styling.
});



