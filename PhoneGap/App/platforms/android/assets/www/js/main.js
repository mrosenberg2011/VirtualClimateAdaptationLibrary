/*$(document).on('vclick', '[data-rel=back]', function (e) {
 e.stopImmediatePropagation();
 e.preventDefault();
 $.mobile.back();
});
*/


$(document).on("collapsibleexpand", "[data-role=collapsible]", function () {
    var position = $(this).offset().top;
    $.mobile.silentScroll(position);
});

function closeMeNow() {
    navigator.app.exitApp();
}


document.addEventListener("exitButton", function(){ 
              navigator.notification.confirm(
                        'Do you want to quit', 
                        onConfirmQuit, 
                        'QUIT TITLE', 
                        'OK,Cancel'  
                    );
            }, true); 

    function onConfirmQuit(button){
       if(button == "1"){
        navigator.app.exitApp(); 
    }
}

$(document).on("pageinit", "#mainmenu", function () {
	

    //set up string for adding <li/>
    var li = '';
    //container for $li to be added
        //add the <li> to "li" variable
        //note the use of += in the variable
        //meaning I'm adding to the existing data. not replacing it.
        //store index value in array as id of the <a> tag
        li += '<a href="#browse" id="browse" class="ui-btn ui-icon-eye ui-btn-icon-left" style = "padding-left: 1em;">Browse</a>' +
				'<a href="#search" id="search" class="ui-btn ui-icon-search ui-btn-icon-left" style = "padding-left: 1em;">Search</a>' +
				'<a href="#new" id="new" class="ui-btn ui-icon-recycle ui-btn-icon-left" style = "padding-left: 1em;">New Submissions</a>' +
				'<a href="#favorites" id="favorites" class="ui-btn ui-icon-star ui-btn-icon-left" style = "padding-left: 1em;">Favorites</a>' +
				'<a href="#rss" id="rss" class="ui-btn ui-icon-comment ui-btn-icon-left" style = "padding-left: 1em;">RSS feed</a>' +
				'<a href="#about" id="about" class="ui-btn ui-icon-info ui-btn-icon-left" style = "padding-left: 1em;">About</a>';
		//append list to ul
		$("#menulist").append(li).listview("refresh");
        //refresh list to enhance its styling.
		
});

$(document).on("pageinit", "#browse", function () {
   $.ajax({
		url: 'http://projects.fit.edu/caladmin/services/getregions.php',
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
				li += '<li><a href="#" id="' + item.r_key + '" class="info-go">' + item.r_name + '</a></li>';
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
		url: 'http://projects.fit.edu/caladmin/services/getsubregions.php',
		data: {reg: info},
		dataType: 'jsonp',
		cache: false,
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			var li = '';
			$.each(data, function(i,item){ 
				var count = 0 
				if (item.doc_count) {
				count = item.doc_count;
				}
				li += '<li><a href="#" id='+ item.s_key +' class="info-go">' + item.s_name + '<span class="ui-li-count">'+ count +'</span></a></li>';
				console.log(item.r_key);
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
	console.log(info);
    //string to put HTML in
    $.ajax({
		url: 'http://projects.fit.edu/caladmin/services/getdocuments.php',
		data: {sreg: info},
		dataType: 'jsonp',
		cache: false,
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			var li = '';
			$.each(data, function(i,item){ 
				console.log(item.d_key);
				li += '<li><a href="#" id= ' + item.d_key + ' class="info-go">' + item.d_title + '</a></li>';
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
		url: 'http://projects.fit.edu/caladmin/services/getdocdetails.php',
		data: {did: info},
		dataType: 'jsonp',
		cache: false,
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			var details = '';
			details += 	'<li>Title: ' + data[0].d_title + '</li>' +
						'<li>Author: ' + data[0].d_authors + '</li>' + 
						'<li>Region: ' + data[0].r_name + '</li>' +
						'<li>Subregion: ' + data[0].s_name + '</li>';
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
			link = 'http:'+ data[0].d_document_origin.replace(/\\/g,"/");
			console.log(link);
			buttons += 	'<br><a href="http:'+ link + '" class="ui-btn ui-btn-inline">Download</a>' +
						'<a href="https://docs.google.com/viewer?url='+ link+ '" class="ui-btn ui-btn-inline">Open</a>' +
						'<a href="#" class="ui-btn ui-btn-inline ui-state-disabled">Add to Favorites</a>';
						
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

$(document).on("pageinit", "#rss", function () {

//EDIT THESE LINES
//Title of the blog
//RSS url
var RSS = "http://rss.sciam.com/sciam/energy-and-sustainability";
//Stores entries
var entries = [];
var selectedEntry = "";

//listen for detail links
$(".contentLink").on("click", function() {
	console.log("clicked");
    selectedEntry = $(this).data("entryid");
});

//Listen for main page


	$.get(RSS, {}, function(res, code) {
        var xml = $(res);
        var items = xml.find("item");
        $.each(items, function(i, v) {
            entry = { 
                    title:$(v).find("title").text(), 
                    link:$(v).find("link").text(), 
                    description:$.trim($(v).find("description").text())
                    };
            entries.push(entry);
        });

        //now draw the list
        var s = '';
        $.each(entries, function(i, v) {
            s += '<li><a href="#contentPage" id= ' + i + ' class="info-go">' + v.title + '</a></li>';
        });
        $("#linksList").append(s);
        $("#linksList").listview("refresh").promise().done(function () {
				//wait for append to finish - thats why you use a promise()
				//done() will run after append is done
				//add the click event for the redirection to happen to #details-page
				$(this).on("click", ".info-go", function (e) {
					e.preventDefault();
					e.stopImmediatePropagation();
					//store the information in the next page's data
					$("#contentPage").data("info", this.id);
					//change the page # to second page. 
					//Now the URL in the address bar will read index.html#details-page
					//where #details-page is the "id" of the second page
					//we're gonna redirect to that now using changePage() method
					$.mobile.pageContainer.pagecontainer("change", "#contentPage");;
				});
			});;
    });



//Listen for the content page to load 
$("#contentPage").on("pageshow", function(prepage) {
//Set the title 
	var info = $(this).data("info")
	$("h1", this).text(entries[info].title);
	console.log(selectedEntry);
	var contentHTML = "";
	contentHTML += entries[info].description; 
	contentHTML += '<p/><a href="'+entries[info].link + '">Read Entry on Site</a>';
	$("#entryText",this).html(contentHTML); });

});

$(document).on("pageinit", "#search", function () {
		
		$.ajax({
		url: 'http://projects.fit.edu/caladmin/services/getregions.php',
		dataType: 'jsonp',
		cache: false,
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(info, status){
			var li = '<label><input type="checkbox" class = "regions" id="0" value = "0"/>ANY</label>';
			$.each(info, function (i, item) {
				//add the <li> to "li" variable
				//note the use of += in the variable
				//meaning I'm adding to the existing data. not replacing it.
				//store index value in array as id of the <a> tag
				li += '<label><input type="checkbox" class = "regions" id="'+ item.r_key + '" value= "' + item.r_key + '"   />'+ item.r_name +'</label>';
			});
			$('#regions_check').append(li);
			$('[type=checkbox]').checkboxradio().trigger('create');
			$('#regions_check').controlgroup().trigger('create');
			
			$(".regions").on("change", function () {
				if ($(this).is(":checked") && this.id == "0") {
					$('.regions').prop('checked', false).checkboxradio("refresh");
					$(this).prop('checked', true).checkboxradio("refresh");
				} else {
					$('#0').prop('checked', false).checkboxradio("refresh");
			}
    });
		},
		error: function(){
			$("#regionlist").text('There was an error loading the data.');
		}
	});
	
	$('#submit').on("click",function() {
		var input = document.getElementById("search-basic").value;
		console.log(input);
		if(input.length < 3){
			alert("Make sure your search input is at least 3 characters long");
		}
		else{
			var input_arr = input.replace(/(\b(\w{1,2})\b(\W|$))/g,'').split(/\s+/);
			var input_arr1 = input_arr.filter(function(v){return v!==''});

			console.log(input_arr1);
			var checked = [];
			console.log(input);
			$("input[class='regions']:checked").each(function ()
			{
				checked.push(parseInt($(this).val()));
			});
			console.log(checked);
			
			var query = '(';
			if(checked.length > 0 && checked[0] != 0) {
				
				for(i = 0; i < checked.length; i++) {
					query += "d_regionkey = '" + checked[i] +"'";
					if (i+1 != checked.length) {
						query += ' OR ';
					} else {
						query += ') ';
					}
				}
				query += 'AND (';
			}
			
			for(i = 0; i < input_arr1.length; i++) {
				query += "((d_title LIKE '%" + input_arr1[i] + "%') OR ";
				query += "(d_authors LIKE '%" + input_arr1[i] + "%') OR ";
				query += "((t_name  LIKE '%" + input_arr1[i] + "%') AND tags.d_key = document.d_key))";
				
				
				if (i+1 != input_arr1.length) {
					query += ' OR ';
				} else {
					query += ') ';
				}
			}
			console.log(query);
			
			$.ajax({
			
			url: 'http://projects.fit.edu/caladmin/services/getsearchresult.php',
			data: {q: query},
			dataType: 'jsonp',
			cache: false,
			jsonp: 'jsoncallback',
			timeout: 5000,
			success: function(data, status){
				console.log(data[0].d_title);
				$("#search_results").data("info", data);
				$.mobile.pageContainer.pagecontainer("change", "#search_results");
			},
			error: function(){
				$("#documentsList").text('There was an error loading the data.');
			}
		});
	
		console.log(query);
		}
		}); 
	
});

$(document).on("pagebeforeshow", "#search_results", function (e) {
	e.stopImmediatePropagation();
    //get from data - you put this here when the "a" wa clicked in the previous page
	$( ".list" ).empty();
    var data = $(this).data("info");
	console.log(data);
    //string to put HTML in
		var li = '';
		$.each(data, function(i,item){ 
			console.log(item.d_key);
			li += '<li><a href="#" id= ' + item.d_key + ' class="info-go">' + item.d_title + '</a></li>';
		});
		$("#resultList").append(li).listview("refresh").promise().done(function () {
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
				$.mobile.pageContainer.pagecontainer("change", "#pdfdetails");
			});
		});
});

$(document).on("pageinit", "#new", function () {
   $.ajax({
		url: 'http://projects.fit.edu/caladmin/services/getnew.php',
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
				li += '<li><a href="#" id="' + item.d_key + '" class="info-go">' + item.d_title + ' <p>Uploaded: '+ item.d_submit_date +'</p> </a></li>';
			});
    //append list to ul
			$("#newlist").append(li).listview("refresh").promise().done(function () {
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
					$.mobile.pageContainer.pagecontainer("change", "#pdfdetails");
				});
			});
		},
		error: function(){
			$("#newlist").text('There was an error loading the data.');
		}
	});
});


$(document).on("pageinit", "#favorites", function () {
   window.localStorage.setItem("key", "value");
   alert(window.localStorage.getItem("key"));
});


$('#exitButton').on('click',function() { 
navigator.app.exitApp(); 
}); 

