$(document).on('pagebeforeshow','#group_userprofile',function(){
	$("#groupmodslist_new2").empty();
	
	$.post(localStorage.webhost+"user_listall.php")
		.done(function(data_result){
			var users = JSON.parse(data_result);
			$.each(users, function(i,field){
				$("#groupmodslist_new2").append(new Option(field.lname+", "+field.fname+" ("+field.email+")",field.user_id));
			});
		});
	//populate list of groups
	/*
	$.post(localStorage.webhost+"group_listall.php")
		.done(function(data_result){
			//alert(data_result);
			var groups = JSON.parse(data_result);
			$("#groupslist2").empty();
			$.each(groups,function(i,field){
				$("#groupslist2").append($("<li><a href='#' class='groupslist2' data-rel='popup' id="+field.group_id+">"+field.group_name+" ("+field.group_type+")</a></li>"));		
				$("#groupslist2").listview("refresh");
			});
		});
	*/	

	$.post(localStorage.webhost+"user_showlistofgroupsjoined.php",{userid:localStorage.user_id})
		.done(function(res){
			var user_groups = JSON.parse(res);
			$("#groupslist_niuser").empty();
			$.each(user_groups, function(i, field)
			{
				$("#groupslist_niuser").append( $("<li><div id="+field.group_id+" class='ui-grid-b my-breakpoint group_joined'><div class='ui-block-a'>"+field.group_name+"</div><div class='ui-block-b'>"+((field.notif_subs==='1')?"subscribed to notifs":"not subscribed") +"</div><div class='ui-block-c'></div></li>") );
				//$("#groupslist_niuser").append($("<li><a href='#' class='groupslist' data-rel='popup' id="+field.group_id+">"+field.group_name+" ("+field.notif_subs+")</a></li>"));		
				//$("#groupslist_niuser").append($("<li><a href='#' class='groupslist' data-rel='popup' id="+field.group_id+">"+field.group_name+" ("+field.notif_subs+")</a></li>"));		
				$("#groupslist_niuser").listview("refresh");
				//$("#groupslist_niuser").append( $("<li><div class='ui-grid-b my-breakpoint'><div class='ui-block-a'>"+field.lname+"</div><div class='ui-block-c'><input type='checkbox' id='"+field.user_id+"' /></div></div></li>") );
			});

			$( ".group_joined" ).on( "tap", tapHandler_notif );
			function tapHandler_notif( event ){
				//$("#group_subscriptiontoggle").empty();
				localStorage.groupidtemp = $(this).attr('id');
				$.post(localStorage.webhost+"group_listspecific_joined.php",{groupid:$(this).attr('id'),userid:localStorage.user_id})
					.done(function(data){
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
				$("#group_subscriptiontoggle").popup("open");
			}
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
			/*
			var groupjoined_isclicked = false;
			$(".group_joined").click(function(){
				//alert($(this).attr('id'));
				groupjoined_isclicked = true;
				$("#group_subscriptiontoggle").empty();
				$.post(localStorage.webhost+"group_listspecific_joined.php",{groupid:$(this).attr('id'),userid:localStorage.user_id})
					.done(function(data){
						var grp = JSON.parse(data);
						//alert(grp[0].notif_subs);
						$("#group_subscriptiontoggle").append( $("<h3>What do you want to do?</h3>") );
						if ( grp[0].notif_subs === '1' )
						{
							$("#group_subscriptiontoggle").append( $("<li id='unsubscribe_fromlist'>Unsubscribe</li>") );
							
						}
						else
						{
							$("#group_subscriptiontoggle").append( $("<li id='subscribe_tolist'>Subscribe to list</li>") );
						}
						$("#group_subscriptiontoggle").append( $("<li><a href='#' class='cancel_subs'>Cancel</a></li>") );
						$("#group_subscriptiontoggle").listview("refresh");

						$(".cancel_subs").click(function(){
							if( groupjoined_isclicked )
								alert("cancel subs");
							});
					});
				
				$("#group_subscriptiontoggle").popup("open");

				});//end of groupjoined.click
			*/
		});

	$.post(localStorage.webhost+"user_showlistofgroupsnotjoined.php",{userid:localStorage.user_id})
		.done(function(res){
			var user_groups = JSON.parse(res);
			$("#groupslist_niuser_not").empty();
			$.each(user_groups,function(i,field)
			{
				$("#groupslist_niuser_not").append($("<li><a href='#' class='groupslist_niuser_not' data-rel='popup' id="+field.group_id+">"+field.group_name+" ("+field.group_type+")</a></li>"));		
				$("#groupslist_niuser_not").listview("refresh");
			});//end of each

			$(".groupslist_niuser_not").click(function(){
				joinGroup($(this).attr('id'));
				$("#user_join_another_group").popup("open");
				});
			

			function joinGroup(group_id)
			{
				$("#user_join_group").click(function(){
					$.post(localStorage.webhost+"group_join.php",{groupid:group_id,userid:localStorage.user_id})
						.done(function(join_group_success){
							if ( join_group_success )
								alert("You requested to join group; awaiting group moderator's approval.");
						});
					$("#user_join_another_group").popup("close");
					});
				$("#user_cancel_join_group").click(function(){
					$("#user_join_another_group").popup("close");
					});
			}
		});//end of $.post user_listgroupsof_not

	$.post(localStorage.webhost+"user_showgroupsyoureamoderatorof.php",{userid:localStorage.user_id})
		.done(function(data){
			var user_groups = JSON.parse(data);
			$("#groupslist_niuser_modsya").empty();
			$.each(user_groups, function(i, field)
			{
				$("#groupslist_niuser_modsya").append($("<li><a href='#' class='groupslist_mod' data-rel='popup' id="+field.group_id+">"+field.group_name+" ("+field.group_type+")</a></li>"));		
				$("#groupslist_niuser_modsya").listview("refresh");
			});

			$(".groupslist_mod").click(function(){
				checkPendingJoinRequests($(this).attr('id'));
				$("#check_pending_join_requests").popup("open");
				});

			function checkPendingJoinRequests(group_id)
			{
				$.post(localStorage.webhost+"user_modcheckforpendingjoinrequest.php",{groupid:group_id})
					.done(function(res){
						var user_groups = JSON.parse(res);
						$("#pending_join_requests").empty();
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
							//alert("userid:"+user_id+" groupid:"+group_id);
							
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
	});//end of pagebeforeshow