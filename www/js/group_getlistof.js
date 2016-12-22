$(document).on('pagebeforeshow','#group_mngmnt',function(){
	$("#groupmodslist_new").empty();
	
	$.post(localStorage.webhost+"user_listall.php")
		.done(function(data_result){
			//alert(data_result);
			var users = JSON.parse(data_result);
			//$("#groupmodslist_new").append($("<select id='modslist'></select>"));
			$.each(users, function(i,field){
				$("#groupmodslist_new").append(new Option(field.lname+", "+field.fname+" ("+field.email+")",field.user_id));
			});
		//$("#groupmodslist_new").append(modslist);
		});
	//populate list of groups
	$.post(localStorage.webhost+"group_listall.php")
		.done(function(data_result){
			//alert(data_result);
			var groups = JSON.parse(data_result);
			$("#groupslist").empty();
			$.each(groups,function(i,field){
				$("#groupslist").append($("<li><a href='#' class='groupslist' data-rel='popup' id="+field.group_id+">"+field.group_name+" ("+field.group_type+")</a></li>"));		
				$("#groupslist").listview("refresh");
			});
		});
	});