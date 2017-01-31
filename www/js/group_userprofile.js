var pusher = new Pusher('d13c29fea61746c0bf48', {
    	cluster: 'ap1',
    	encrypted: true
    });
var channel = pusher.subscribe('my-channel');
channel.bind('group_mngmnt', function(data) {
	//alert(data.context);
	if ( data.userid === localStorage.user_id )
	{	//refresh user's groups tab
		//showGroupsTab();

		if ( data.context === "request_approved" )
		{
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
			showPendingJoinRequests();
			showGroupsJoinedNot();
		}
		else if ( data.context === "group_leave" )
		{
			showGroupsJoined();
			showPendingJoinRequests();
			showGroupsJoinedNot();
		}
	}
	});

$(document).on('pagebeforeshow','#group_userprofile',function(){
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
				$("#groups_pendingrequests").append( $("<li><div id="+field.group_id+" class='ui-grid-a my-breakpoint group_pendingrequests'><div class='ui-block-a'>"+field.group_name+"</div><div class='ui-block-b' style='text-align:right;'><a href='#' class='cancel_joinrequest' id="+field.group_id+">Cancel</a></div></div></li>") );
				$("#groups_pendingrequests").listview("refresh");
			});//end of $each

			$(".cancel_joinrequest").click(function(){
				//alert("canceled "+$(this).attr('id'));	
				$.post(localStorage.webhost+"group_leave.php",{userid:localStorage.user_id,groupid:$(this).attr('id')})
					.done(function(delete_successful){
						if(delete_successful)
						{
							alert("Join request canceled.");
							showGroupsTab();

							$.post(localStorage.webhost+"websock_groupsmgt.php",{userid:localStorage.user_id,context:"request_canceled"})
			    				.done(function(){

			    				});
						}
					});
			});
		});//end of pending post
}
function showGroupsJoined()
{
	$("#groups_joined").empty();
	$("#groups_joined").listview("refresh");
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
				//$("#group_subscriptiontoggle").popup("open");
				$("#group_subscriptiontoggle").popup("open",{positionTo: '#'+$(this).attr('id')});
			}
			$( "#group_leave" ).on( "click", function() {
				if ( leftswiped )
				{
					//alert(localStorage.groupidtemp);
					showConfirmDialog("Are you sure?", "", "Okay", function() {
					 	$.post(localStorage.webhost+"group_leave.php",{userid:localStorage.user_id,groupid:localStorage.groupidtemp})
					 		.done(function(left_group_successful){
					 			if (left_group_successful)
					 			{
					 				alert("You have left the group.");
					 				showGroupsTab();

					 				$.post(localStorage.webhost+"websock_groupsmgt.php",{userid:localStorage.user_id,context:"group_leave"})
				    					.done(function(){
				    				});
					 			}
					 		});
					});
				}
			});
			$("#group_cancelsub").click(function(){
				setTimeout(function(){$("#group_subscriptiontoggle").popup("close");},100)
				});

			$("#group_subscribe").click(function(){
				$.post(localStorage.webhost+"notif_subscriptiontoggle.php",
					{
						groupid 		: localStorage.groupidtemp,
						userid  		: localStorage.user_id,
						toggleoption 	: "subscribe"
					})
					.done(function(success){
						if ( success )
						{
							location.href = "index.html#group_userprofile";
						}
					});
				});
			$("#group_unsubscribe").click(function(){
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
							location.reload();
						}
					});
				});
		});
}
function showGroupsJoinedNot()
{
	$.post(localStorage.webhost+"user_showlistofgroupsnotjoined.php",{userid:localStorage.user_id})
		.done(function(res){
			var user_groups = JSON.parse(res);
			$.each(user_groups,function(i,field)
			{
				$("#groupslist_niuser_not").append($("<li><a href='#' class='groupslist_niuser_not' data-rel='popup' id="+field.group_id+">"+field.group_name+" ("+field.group_type+")</a></li>"));		
				$("#groupslist_niuser_not").listview("refresh");
			});//end of each

			$(".groupslist_niuser_not").click(function(){
				join_request = true;	//set join request button to clicked(true)
				//joinGroup($(this).attr('id'));
				localStorage.groupid_joinreq = $(this).attr('id');
				$("#user_join_another_group").popup("open");
				});	

			
			$("#user_join_group").click(function(){
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
						$("#user_join_another_group").popup("close");
					join_request = false; //reset join_request flag to not clicked
				}
				});//end of user_join_group click

			$("#user_cancel_join_group").click(function(){
				//alert("ASDF");
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
			//alert(data);
			$.each(user_groups, function(i, field)
			{
				$("#groupslist_niuser_modsya").append($("<li><a href='#' class='groupslist_mod' data-rel='popup' id="+field.group_id+" name="+field.group_name+">"+field.group_name+" ("+field.group_type+")</a></li>"));		
				$("#groupslist_niuser_modsya").listview("refresh");
			});

			$(".groupslist_mod").click(function(){
				//alert("Group ID: "+$(this).attr('id'));
				/*
				checkPendingJoinRequests($(this).attr('id'));
				$("#check_pending_join_requests").popup("open");
				*/
				localStorage.grouprequestedtojoin = $(this).attr('id');
				//alert( $(this).attr('name') );
				localStorage.groupnamerequestedtojoin = $(this).attr('name');
				showJoinRequests();
				location.href = "index.html#joinrequests_list";
				/*
				$("#back_btn").empty();
				$("#back_btn_ul").empty();
				//$("#back_btn_ul").listview("refresh");

				var ul = $('<ul data-role="listview" data-icon="false" id="back_btn_ul"><li><a href="index.html#group_userprofile">&#8592; Back</a></li></ul>');
				//ul.listview("refresh");
				$("#back_btn").append( ul );
				//$("#back_btn").append( $("<ul id='back_btn_ul'/>",{ 'data-role' : 'listview' }).append( $("<li><a href='index.html#group_userprofile'>&#8592; Back</a></li>") ) );
				//$("#back_btn").append($("<ul data-role='listview' id='back_btn_ul'><li><a href='index.html#group_userprofile'>&#8592; Back</a></li></ul>"));
				$("#back_btn_ul").listview("refresh");

				$("#back_btn_ul").click(function(){
					alert("ASDF");
					$("#back_btn_ul").listview("refresh");
					location.href = "index.html#group_userprofile";
					});
				*/

				//$('ul').append('<li><a>hello</a></li>').listview('refresh');
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

						$(".join_requests").click(function(){
							//checkPendingJoinRequests($(this).attr('id'));
							$("#check_pending_join_requests").popup("close");
							approveGroupJoinRequest($(this).attr('id'),group_id);
							});
						function approveGroupJoinRequest(user_id,group_id)
						{
							
							setTimeout(function(){
								$("#approve_request_popup").popup("open");
							},100);
							$("#approve_join_request").click(function(){
								$.post(localStorage.webhost+"user_modapprovejoinrequest.php",{userid:user_id,groupid:group_id})
									.done(function(request_approved){
										if ( request_approved )
										{
											alert("Request approved successful.");
											location.reload();
										}
									});
							});
							$("#ignore_join_request").click(function(){
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

	$("#start_new_group").click(function(){
		$.post(localStorage.webhost+"group_add.php",{groupname:$("#groupname_new").val(),grouptype:$("#grouptype_new_nonadmin").val(),groupmod:localStorage.user_id})
			.done(function(last_inserted_groupid){
				//alert(last_inserted_groupid);
				if ( last_inserted_groupid )
				{
					$.post(localStorage.webhost+"group_add_member.php",{userid:localStorage.user_id,groupid:last_inserted_groupid})
						.done(function(){
							alert("New group created successfully.");
							location.reload();
					});
				}
			});
		});
}