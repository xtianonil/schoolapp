/*
$(document).on('pagebeforeshow','#joinrequests_list',function(){
	//showGroupsTab();
	showJoinRequests();
	});//end of pagebeforeshow
*/
$("#group_joinrequests").on('click',function(){
	showJoinRequests();
	location.href = "index.html#joinrequests_list";
});
function showJoinRequests()
{
	$("#groupmembers_joinrequest_list").empty();
	$.post(localStorage.webhost+"group_listmembers_joinrequest.php",{groupid:localStorage.grouprequestedtojoin})
		.done(function(data){
			var groupmembers = JSON.parse(data);

			$("#overlaypanel_user").append($("<li style='background:#0099cc;color:white;text-shadow:none;'><h3>Group name: "+localStorage.groupnamerequestedtojoin+"</h3></li>"));
			if ( !jQuery.isEmptyObject(groupmembers) )
			{
				$.each(groupmembers,function(i,field){
					var x = $("<div class='ui-block-a'>A</div>");
					x.append( $("<div class='ui-block-b'>B</div>") );
					$("#groupmembers_joinrequest_list").append( $("<li><div class='ui-grid-b my-breakpoint'><div class='ui-block-a'>"+field.lname+", "+field.fname+"</div><div class='ui-block-c' style='float:right'><input class='join_request' type='checkbox' id='"+field.user_id+"' /></div></div></li>") );
				});
				$("#groupmembers_joinrequest_list").append( $("<li><a href='#' id='approve_joinrequest_btn'>Approve join request</a ></li>") );

				$("#approve_joinrequest_btn").click(function(){
					//var sList = "";
					//alert("join_request click");
					$('input[type=checkbox]').each(function () {
					    //sList += "(" + $(this).attr('id') + "-" + (this.checked ? "checked" : "not checked") + ")";
					    if ( this.checked && $(this).hasClass("join_request") )
					    {
					    	$.post(localStorage.webhost+"websock_groupsmgt.php",{userid:$(this).attr('id'),context:"request_approved"})
			    				.done(function(){

			    				});
					    	$.post(localStorage.webhost+"group_approvejoinrequest.php",{userid:$(this).attr('id'),groupid:localStorage.grouprequestedtojoin})
						    	.done(function(data){
						    		if (data)
						    		{
						    			alert("Member/s successfully added to group.");
						    			window.location.href = "index.html#group_userprofile";
						    		}
						    	});
					    }
						});
					});
			}
			else
				$("#groupmembers_joinrequest_list").append($("<li>n/a</li>"));
			$("#groupmembers_joinrequest_list").listview("refresh");
			
			setTimeout(function(){$("#groupmembers_joinrequest_popup").popup("open");},100);

			var joinrequest_click = false;
			$(".groupmembers_joinreq").click(function(){
				joinrequest_click = true;
				localStorage.userlistuid = $(this).attr('id');

				$("#groupmembers_joinrequest_popup").popup("close");
				setTimeout(function(){$("#groupmembers_joinrequest_approve_popup").popup("open");},100);

				});

			$("#joinrequest_approve_admin").click(function(){
				if ( joinrequest_click )
				{
					$.post(localStorage.webhost+"group_approvejoinrequest.php",{userid:localStorage.userlistuid,groupid:localStorage.grouprequestedtojoin})
						.done(function(member_added_to_group){
						if ( member_added_to_group )
						{
							alert("Member is added to group successfully.");
							//location.reload();
						}
					});//group_approvejoinrequest.php
				}
				});//joinrequest_approve_admin
		});//group_listmembers_joinrequest.php
}
/*
$(".group_joinrequests").click(function(){
	showJoinRequests();
	location.href = "index.html#joinrequests_list";
	});
*/