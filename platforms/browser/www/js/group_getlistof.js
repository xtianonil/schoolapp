$(document).on('pagebeforeshow','#group_mngmnt',function(){
	$("#groupmodslist_new").empty();

	
	$.post(localStorage.webhost+"group_listall.php")
		.done(function(data_result){
			var users = JOSN.parse(data_result);
			var modslist = $("<select id='modslist'></select>");
			//$("#groupmodslist_new").append($("<select id='modslist'></select>"));
			$.each(users, function(i,field)){
				modslist.append(new Option(field.lname,field.fname));
			});
		$("#groupmodslist_new").append(modslist);
		});
		
	alert("pasok");
	//alert("get list of groups");
	/*
	$("#footer_div2").empty();
	var logout = $("<h5> (<a href='#' id='logout'> logout </a>)</h5>");
	logout.prepend("signed in as: "+localStorage.username);
	$("#footer_div2").append(logout);*/
	});