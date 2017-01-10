$(".group_joinrequests").click(function(){
	//alert("group join requests list clicked");
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
					/*
					<div class="ui-grid-b my-breakpoint">
						<div class="ui-block-a">New password:</div>
						<div class="ui-block-b"><input type="password" id="password_new"/></div>
					</div><!-- /grid-b -->
					*/
					var x = $("<div class='ui-block-a'>A</div>");
					x.append( $("<div class='ui-block-b'>B</div>") );
					$("#groupmembers_joinrequest_list").append( $("<li><div class='ui-grid-b my-breakpoint'><div class='ui-block-a'>"+field.lname+", "+field.fname+"</div><div class='ui-block-c' style='float:right	'><input type='checkbox' id='"+field.user_id+"' /></div></div></li>") );
					//$("#groupmembers_joinrequest_list").append($("<li><a href='#' class='groupmembers_joinreq' data-rel='popup' id="+field.user_id+">"+field.lname+", "+field.fname+"</a><a href='#'>A</a><a href='#'>B</a></li>"));		
				});
				$("#groupmembers_joinrequest_list").append( $("<li><a href='#' id='approve_joinrequest_btn'>Submit</a ></li>") );

				$("#approve_joinrequest_btn").click(function(){
					var sList = "";
					$('input[type=checkbox]').each(function () {
					    //sList += "(" + $(this).attr('id') + "-" + (this.checked ? "checked" : "not checked") + ")";
					    if ( this.checked )
					    {
					    	$.post(localStorage.webhost+"group_approvejoinrequest.php",{userid:$(this).attr('id'),groupid:localStorage.grouplistgid})
						    	.done(function(data){
						    		//alert(data);
						    		if (data)
						    		{
						    			alert("Member/s successfully added to group.");
						    			window.location.href = "index.html#group_mngmnt";
						    		}
						    	});
					    }
						});
					//alert(sList);
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
	location.href = "index.html#joinrequests_list";
	});