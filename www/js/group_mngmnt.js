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
				localStorage.grouplistgid = $(this).attr('id');
				groupslist_isclicked = true;
				$("#group_popup").popup("open");
				$.post(localStorage.webhost+"group_listspecific.php",{groupid:$(this).attr('id')})
					.done(function(data){
						//alert(data);
						var grp = JSON.parse(data);
						
						$("#group_name_update").val(grp[0].group_name);
						localStorage.grouplistname = grp[0].group_name;
						/*
						$.each(groups,function(i,field){
							if ( field.group_id === grp[0].group_id )
								$("#mod_id_update").append(new Option(grp[0].lname+", "+grp[0].fname,grp[0].group_id,true,true));
							else
								$("#mod_id_update").append(new Option(grp[0].lname+", "+grp[0].fname,grp[0].group_id));
						});*/

						$("#group_type_update").empty();
						if ( grp[0].group_type === "section" )
						{
							$("#group_type_update").append(new Option(grp[0].group_type,grp[0].group_type,true,true));
							$("#group_type_update").append(new Option("club","club"));
						}
						else if ( grp[0].group_type === "club" )
						{
							$("#group_type_update").append(new Option(grp[0].group_type,grp[0].group_type,true,true));
							$("#group_type_update").append(new Option("section","section"));
						}

						$("#group_type_update").selectmenu("refresh");
						$("#mod_id_update").empty();
						$.post(localStorage.webhost+"user_listall.php")
							.done(function(data){
								var users = JSON.parse(data);
								$.each(users,function(i,field){
									if ( grp[0].moderator_id === field.user_id )
										$("#mod_id_update").append(new Option(grp[0].lname+", "+grp[0].fname,grp[0].moderator_id,true,true));
									else
										$("#mod_id_update").append(new Option(field.lname+", "+field.fname,field.user_id));
									$("#mod_id_update").selectmenu("refresh");
								});//end of $each
							});		
					});
				});
			$(".group_memberslist").click(function(){
				$("#group_popup").popup("close");
				if ( groupslist_isclicked )
				{
					$("#groupmembers_list").empty();
					$.post(localStorage.webhost+"group_listmembers.php",{groupid:localStorage.grouplistgid})
						.done(function(data){
							var groupmembers = JSON.parse(data);
							//alert(jQuery.isEmptyObject(groupmembers));

							$("#groupmembers_list").append($("<li><h3>GROUP: "+localStorage.grouplistname+"</h3></li>"));
							$("#groupmembers_list").append($("<li>List of Members</li>"));
							//alert(groupmembers);
							if ( !jQuery.isEmptyObject(groupmembers) )
							{
								$.each(groupmembers,function(i,field){
									$("#groupmembers_list").append($("<li><a href='#' class='groupmembers' data-rel='popup' id="+field.user_id+">"+field.lname+", "+field.fname+"</a></li>"));		
								});
								$("#groupmembers_list").append($("<li><button id='flush_members_admin'>Flush members</button></li>"));
							}
							else
								$("#groupmembers_list").append($("<li>n/a</li>"));
							$("#groupmembers_list").listview("refresh");
							
							setTimeout(function(){$("#groupmembers_popup").popup("open");},100);

							$("#flush_members_admin").click(function(){
								$.post(localStorage.webhost+"group_flushmembers.php",{groupid:localStorage.grouplistgid})
									.done(function(flush_successful){
										if ( flush_successful )
										{
											alert("All members were removed from the group.");
											location.reload();
										}
									});
								});
						});
				}
				});
			
			var group_joinrequests_isclicked = false;
			$(".group_joinrequests").click(function(){
				group_joinrequests_isclicked = true;
				$("#group_popup").popup("close");
				if ( groupslist_isclicked )
				{
					$("#groupmembers_joinrequest_list").empty();
					$.post(localStorage.webhost+"group_listmembers_joinrequest.php",{groupid:localStorage.grouplistgid})
						.done(function(data){
							//alert(data);
							var groupmembers = JSON.parse(data);

							$("#groupmembers_joinrequest_list").append($("<li><h3>GROUP: "+localStorage.grouplistname+"</h3></li>"));
							$("#groupmembers_joinrequest_list").append($("<li>Pending requests to join group</li>"));

							if ( !jQuery.isEmptyObject(groupmembers) )
							{
								$.each(groupmembers,function(i,field){
									$("#groupmembers_joinrequest_list").append($("<li><a href='#' class='groupmembers_joinreq' data-rel='popup' id="+field.user_id+">"+field.lname+", "+field.fname+"</a></li>"));		
								});
							}
							else
								$("#groupmembers_joinrequest_list").append($("<li>n/a</li>"));
							$("#groupmembers_joinrequest_list").listview("refresh");
							
							setTimeout(function(){$("#groupmembers_joinrequest_popup").popup("open");},100);

							var joinrequest_click = false;
							$(".groupmembers_joinreq").click(function(){

								joinrequest_click = true;
								//alert($(this).attr('id'));
								localStorage.userlistuid = $(this).attr('id');

								$("#groupmembers_joinrequest_popup").popup("close");
								setTimeout(function(){$("#groupmembers_joinrequest_approve_popup").popup("open");},100);

								});

							$("#joinrequest_approve_admin").click(function(){
								if ( joinrequest_click )
								{
									$.post(localStorage.webhost+"group_approvejoinrequest.php",{userid:localStorage.userlistuid,groupid:localStorage.grouplistgid})
										.done(function(member_added_to_group){
										if ( member_added_to_group )
										{
											alert("Member is added to group successfully.");
											location.reload();
										}
									});//group_approvejoinrequest.php
								}
								});//joinrequest_approve_admin
							$("#joinrequest_cancel_admin").click(function(){
								if ( joinrequest_click )
								{
									$("#groupmembers_joinrequest_approve_popup").popup("close");
								}
								});//joinrequest_approve_admin
						});//group_listmembers_joinrequest.php
				}
				});
			
			$(".group_update").click(function(){
				if ( groupslist_isclicked )
				{
					$.post(localStorage.webhost+"group_update.php",
						{
							groupid 	: localStorage.grouplistgid,
							groupname 	: $("#group_name_update").val(),
							grouptype 	: $("#group_type_update").val(),
							moderatorid	: $("#mod_id_update").val()
						})
						.done(function(update_successful){
							if ( update_successful )
							{
								alert("Update successful.");
								location.reload();
							}
						});
				}
				});//end of group update click
			$(".group_delete").click(function(){
				if ( groupslist_isclicked )
				{
					$.post(localStorage.webhost+"group_delete.php",{groupid:localStorage.grouplistgid})
						.done(function(delete_successful){
							if ( delete_successful )
							{
								alert("Delete successful.");
								window.location.href = "index.html#group_mngmnt";
								setTimeout(function(){location.reload();},100);
								//location.reload();
							}
						});
				}
			});
		});//end of group_listall

	});//end of group-mngmnt