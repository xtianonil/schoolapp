//bind group_mngmnt as event
channel.bind('group_mngmnt', function(data) {
	alert(data.context);
	if ( data.userid === localStorage.user_id )
	{	//refresh only specified user's groups tab
		//alert(data.context);
		if ( data.context === "request_approved" )
		{
			$("#groups_joined").empty();
			showGroupsJoined();
			showPendingJoinRequests();
			showGroupsJoinedNot();
		}
		else if ( data.context === "request_canceled" )
		{
			//showGroupsJoined();
			showPendingJoinRequests();
			showGroupsJoinedNot();
		}
		else if ( data.context === "request_sent" )
		{
			//showGroupsJoined();
			//$("#pending_join_requests").empty();
			showPendingJoinRequests();
			showGroupsJoinedNot();
		}
		else if ( data.context === "group_leave" )
		{
			showGroupsJoined();
			showPendingJoinRequests();
			showGroupsJoinedNot();
		}
		else if ( data.context === "group_subscribe" )
		{
			showGroupsJoined();
		}
		else if ( data.context === "group_flushed" )
		{
			alert(data.groupid);
			//check if user is a member of the group that has been flushed
			$.post(localStorage.webhost+"group_checkifuserbelongs.php",{userid:data.userid,groupid:data.groupid})
				.done(function(member_of_group){
					if ( member_of_group )
					{
						alert("member of group: "+member_of_group);
						showGroupsJoined();
						showPendingJoinRequests();
						showGroupsJoinedNot();
					}//end of member_of_group
					else
					{
						alert("not a member: "+member_of_group);
					}
				});//end user_checkifuserbelongs
		}//end of if 
	}
	
	});
/*
$( "#join_another_group_collapsible" ).on( "collapsibleexpand", function( event, ui ) {
	$("#groupslist_niuser_not").empty();
	showGroupsJoinedNot();
	} );
$( "#join_another_group_collapsible" ).on( "collapsiblecollapse", function( event, ui ) {
	$("#groupslist_niuser_not").empty();
	} );
*/
$(document).on('pagebeforeshow','#group_userprofile',function(){
	//alert("SDFs");
	showGroupsTab();
	});//end of pagebeforeshow
function showPendingJoinRequests()
{
	$("#groups_pendingrequests").empty();
	$("#groups_pendingrequests").listview("refresh");
	$.post(localStorage.webhost+"user_showlistofgroupsjoinedpending.php",{userid:localStorage.user_id})
		.done(function(result_set){
			var group_pending_requests = JSON.parse(result_set);
			$.each(group_pending_requests,function(i,field){
				$("#groups_pendingrequests").append( $("<li><div id="+field.group_id+" class='ui-grid-a my-breakpoint group_pendingrequests'><div class='ui-block-a'>"+field.group_name+"</div><div class='ui-block-b' style='text-align:right;'><a href='#' name="+field.group_name+" class='cancel_joinrequest' id="+field.group_id+">Cancel</a></div></div></li>") );
				$("#groups_pendingrequests").listview("refresh");
			});//end of $each

			$(".cancel_joinrequest").on('click',function(){
				localStorage.groupname_joinreq_cncl = $(this).attr('name');
				$.post(localStorage.webhost+"group_leave.php",{userid:localStorage.user_id,groupid:$(this).attr('id')})
					.done(function(delete_successful){
						if(delete_successful)
						{
							//alert("Join request canceled.");
							showAlertDialog("You have canceled your request to join this group:", localStorage.groupname_joinreq_cncl, "Okay", function() {
								$.post(localStorage.webhost+"websock_groupsmgt.php",{userid:localStorage.user_id,context:"request_canceled"})
				    				.done(function(){
				    				});
								});
						}
					});
			});
		});//end of pending post
}
function showGroupsJoined()
{
	$("#groups_joined").empty();
	//$("#groups_joined").listview("refresh");
	$.post(localStorage.webhost+"user_showlistofgroupsjoined.php",{userid:localStorage.user_id})
		.done(function(res){
			var user_groups = JSON.parse(res);
			$.each(user_groups, function(i, field)
			{
				//group options popup
				$("#groups_joined").append( $("<li><div id="+field.group_id+" class='ui-grid-a my-breakpoint group_joined'><div class='ui-block-a'>"+field.group_name+"</div><div class='ui-block-b'>"+((field.notif_subs==='1')?"(subscribed to notifs)":"(not subscribed)") +"</div><div class='ui-block-c'></div></li>") );
				$("#groups_joined").listview("refresh");
			});
			$( ".group_joined" ).on( "swipeleft", swipeleftHandler_notif );
			function swipeleftHandler_notif( event ){
				localStorage.groupidtemp = $(this).attr('id');
				$.post(localStorage.webhost+"group_listspecific_joined.php",{groupid:$(this).attr('id'),userid:localStorage.user_id})
					.done(function(data){
						leftswiped = true;
						var grp = JSON.parse(data);
						if ( grp[0].notif_subs === '1' )
						{	//user is subscribed
							$("#group_subscribe").hide();
							$("#group_unsubscribe").show();
						}
						else
						{
							$("#group_subscribe").show();
							$("#group_unsubscribe").hide();
						}
					});
				$("#group_subscriptiontoggle").popup("open",{positionTo: '#'+$(this).attr('id')});
			}
			$( "#group_leave" ).on( "click", function() {
				if ( leftswiped )
				{
					showConfirmDialog("Are you sure?", "", "Okay", function() {
					 	$.post(localStorage.webhost+"group_leave.php",{userid:localStorage.user_id,groupid:localStorage.groupidtemp})
					 		.done(function(left_group_successful){
					 			if (left_group_successful)
					 			{
					 				alert("You have left the group.");
					 				//showGroupsTab();
					 				//publish user has left the group
					 				$.post(localStorage.webhost+"websock_groupsmgt.php",{userid:localStorage.user_id,context:"group_leave"})
				    					.done(function(){
				    				});
					 			}
					 		});
					});
					leftswiped = false;
				}
			});
			$("#group_cancelsub").on('click',function(){
				setTimeout(function(){$("#group_subscriptiontoggle").popup("close");},100)
				});

			$("#group_subscribe").on('click',function(){
				$.post(localStorage.webhost+"notif_subscriptiontoggle.php",
					{
						groupid 		: localStorage.groupidtemp,
						userid  		: localStorage.user_id,
						toggleoption 	: "subscribe"
					})
					.done(function(success){
						if ( success )
						{
							$.post(localStorage.webhost+"websock_groupsmgt.php",{userid:localStorage.user_id,context:"group_subscribe"})
		    					.done(function(){
		    				});
							location.href = "index.html#group_userprofile";
						}
					});
				});
			$("#group_unsubscribe").on('click',function(){
				$.post(localStorage.webhost+"notif_subscriptiontoggle.php",
					{
						groupid 		: localStorage.groupidtemp,
						userid  		: localStorage.user_id,
						toggleoption 	: "unsubscribe"
					})
					.done(function(success){
						if ( success )
						{
							//location.href = "index.html#group_userprofile";
							//location.reload();
							$.mobile.changePage("index.html#group_userprofile", {
						        //transition: "slide",
						        //reverse: false	//from right
						    });
						}
					});
				});
		});
}
function showGroupsJoinedNot()
{
	$("#groupslist_niuser_not").empty();
	$.post(localStorage.webhost+"user_showlistofgroupsnotjoined.php",{userid:localStorage.user_id})
		.done(function(res){
			var user_groups = JSON.parse(res);
			$.each(user_groups,function(i,field)
			{
				$("#groupslist_niuser_not").append($("<li><a href='#' class='groupslist_niuser_not' data-rel='popup' id="+field.group_id+" name="+field.group_name+">"+field.group_name+" ("+field.group_type+")</a></li>"));		
				$("#groupslist_niuser_not").listview("refresh");
			});//end of each

			var join_request = false;

			$(".groupslist_niuser_not").on('click',function(){
				join_request = true;	//set join request button to clicked(true)
				localStorage.groupid_joinreq = $(this).attr('id');
				localStorage.groupname_joinreq = $(this).attr('name');
				confirmToJoinGroup();
				});	//end of groupslist_niuser_not
			function confirmToJoinGroup()
			{
				if ( join_request )
				{
					join_request = false; //reset join_request flag to not clicked
					showConfirmDialog("Join this group?", localStorage.groupname_joinreq, "Okay", function() {
						$.post(localStorage.webhost+"group_join.php",{groupid:localStorage.groupid_joinreq,userid:localStorage.user_id})
							.done(function(join_group_success){
								if ( join_group_success )
								{
									$.post(localStorage.webhost+"websock_groupsmgt.php",{userid:localStorage.user_id,context:"request_sent"})
					    				.done(function(){
					    					//showGroupsTab();
					    					$("#join_another_group_collapsible").collapsible("collapse");
					    				});
								}
							});
						});//end of showConfirmDialog
				}//end of if ( join_request )
			}//end of confirmToJoinGroup
					
			//$("#user_join_group").on('click',function(){
				/*
				if ( join_request )
				{
					$.post(localStorage.webhost+"group_join.php",{groupid:localStorage.groupid_joinreq,userid:localStorage.user_id})
						.done(function(join_group_success){
							if ( join_group_success )
							{
								alert("You requested to join group; awaiting group moderator's approval.");
								showGroupsTab();
								$("#join_another_group_collapsible").collapsible("collapse");

								$.post(localStorage.webhost+"websock_groupsmgt.php",{userid:localStorage.user_id,context:"request_sent"})
				    				.done(function(){
				    				});
							}
						});
						//$("#user_join_another_group").popup("close");
					join_request = false; //reset join_request flag to not clicked
				}
				*/
				//});//end of user_join_group click

			$("#user_cancel_join_group").on('click',function(){
				$("#user_join_another_group").popup("close");
				
				});			
		});//end of $.post user_listgroupsof_not
}
function showGroupsYouOwn()
{
	$("#groupslist_niuser_not").empty();
	$("#groupslist_niuser_modsya").empty();
	$("#pending_join_requests").empty();
	$.post(localStorage.webhost+"user_showgroupsyoureamoderatorof.php",{userid:localStorage.user_id})
		.done(function(data){
			var user_groups = JSON.parse(data);
			$.each(user_groups, function(i, field)
			{
				$("#groupslist_niuser_modsya").append($("<li><a href='#' class='groupslist_mod' data-rel='popup' id="+field.group_id+" name="+field.group_name+">"+field.group_name+" ("+field.group_type+")</a></li>"));		
				$("#groupslist_niuser_modsya").listview("refresh");
			});

			$(".groupslist_mod").on('click',function(){
				localStorage.grouprequestedtojoin = $(this).attr('id');
				localStorage.groupnamerequestedtojoin = $(this).attr('name');
				dialogOptions3("Group Options",localStorage.groupnamerequestedtojoin,"Members List","Join Requests","Invite New Members","Flush All Members",function(option){
					//alert(opt);
					if ( option === "members_list" )
					{
						//$("#groupmembers_list").empty();
						$(".group_memberslist").trigger("click");
					}
					else if ( option === "join_requests" )
					{
						showJoinRequests();
						window.location.href = "index.html#joinrequests_list";
												/*
						$.mobile.changePage("index.html#joinrequests_list", {
						        //transition: "slide",
						        //reverse: false	//from right
						    });*/
					}
					else if ( option === "invite_members" )
					{
						//alert("ASDF");
						inviteMembers();
						window.location.href = "index.html#members_invite";
						//alert("SDFSDFSD");
						/*
						$.mobile.changePage("index.html#joinrequests_list", {
						        //transition: "slide",
						        //reverse: false	//from right
						    });*/
					}
					else if ( option === "flush_group" )
					{
						flushGroupMembers();
					}
					});//end of dialogOptions3
				});

			function checkPendingJoinRequests(group_id)
			{
				$.post(localStorage.webhost+"user_modcheckforpendingjoinrequest.php",{groupid:group_id})
					.done(function(res){
						var user_groups = JSON.parse(res);
						
						$.each(user_groups, function(i, field)
						{
							$("#pending_join_requests").append($("<li><a href='#' class='join_requests' data-rel='popup' id="+field.user_id+">"+field.user_id+" ("+field.lname+")</a></li>"));		
							$("#pending_join_requests").listview("refresh");
						});

						$(".join_requests").on('click',function(){
							//checkPendingJoinRequests($(this).attr('id'));
							$("#check_pending_join_requests").popup("close");
							approveGroupJoinRequest($(this).attr('id'),group_id);
							});
						function approveGroupJoinRequest(user_id,group_id)
						{
							
							setTimeout(function(){
								$("#approve_request_popup").popup("open");
							},100);
							$("#approve_join_request").on('click',function(){
								$.post(localStorage.webhost+"user_modapprovejoinrequest.php",{userid:user_id,groupid:group_id})
									.done(function(request_approved){
										if ( request_approved )
										{
											alert("Request approved successful.");
											//location.reload();
										}
									});
							});
							$("#ignore_join_request").on('click',function(){
								$("#approve_request_popup").popup("close");
							});
						}

					});
			}
		});
}
function showGroupsTab()
{
	showPendingJoinRequests();

	var leftswiped = false;		//left swipe false;
	showGroupsJoined();

	var join_request = false; 	//join request sent; default value is false
	showGroupsJoinedNot();

	showGroupsYouOwn();

	$("#start_new_group").on('click',function(){
		$.post(localStorage.webhost+"group_add.php",{groupname:$("#groupname_new").val(),grouptype:"club",groupmod:localStorage.user_id})
			.done(function(last_inserted_groupid){
				if ( last_inserted_groupid )
				{
					$.post(localStorage.webhost+"group_add_member.php",{userid:localStorage.user_id,groupid:last_inserted_groupid})
						.done(function(){
							alert("New group created successfully.");
							$("#groupname_new").val("");
							$("#start_new_group_collapsible").collapsible("collapse");
							//location.reload();
							showGroupsTab();
					});
				}
			});
		});
}