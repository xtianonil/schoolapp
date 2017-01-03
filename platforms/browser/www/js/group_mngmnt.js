$(document).on('pagebeforeshow','#group_mngmnt',function(){
	$("#groupmodslist_new").empty();
	
	$.post(localStorage.webhost+"user_listall.php")
		.done(function(data_result){
			var users = JSON.parse(data_result);
			//$("#groupmodslist_new").append($("<select id='modslist'></select>"));
			$.each(users, function(i,field){
				$("#groupmodslist_new").append(new Option(field.lname+", "+field.fname+" ("+field.email+")",field.user_id));
				$("#groupmodslist_new").selectmenu("refresh");
			});
		//$("#groupmodslist_new").append(modslist);
		});
	//populate list of groups
	$.post(localStorage.webhost+"group_listallnonschool.php")
		.done(function(data_result){
			var groups = JSON.parse(data_result);
			$("#groupslist").empty();
			$.each(groups,function(i,field){
				$("#groupslist").append($("<li><a href='#' class='groupslist' data-rel='popup' id="+field.group_id+">"+field.group_name+" ("+field.group_type+")</a></li>"));		
				$("#groupslist").listview("refresh");
			});
			var groupslist_isclicked = false;
			$(".groupslist").click(function(){
				//alert($(this).attr('id'));
				groupslist_isclicked = true;
				$("#group_popup").popup("open");
				$.post(localStorage.webhost+"group_listspecific.php",{groupid:$(this).attr('id')})
					.done(function(data){
						//alert(data);
						var grp = JSON.parse(data);
						$("#group_name_update").val(grp[0].group_name);
						$("#group_type_update").append(new Option(grp[0].group_type,grp[0].group_id));
						$("#group_type_update").selectmenu("refresh");
						$("#mod_id_update").append(new Option(grp[0].lname+", "+grp[0].fname,grp[0].group_id));
						$("#mod_id_update").selectmenu("refresh");
					});
				});
		});//end of group_listall

	});//end of group-mngmnt