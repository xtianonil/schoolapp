$(".group_memberslist").on('click',function(){
	$("#groupmembers_list").empty();
	$.post(localStorage.webhost+"group_listmembers.php",{groupid:localStorage.grouprequestedtojoin})
		.done(function(data){
			var groupmembers = JSON.parse(data);

			$("#groupmembers_list").append($("<li><h3>GROUP: "+localStorage.grouplistname+"</h3></li>"));
			//$("#groupmembers_list").append($("<li>List of Members</li>"));
			if ( !jQuery.isEmptyObject(groupmembers) )
			{
				$.each(groupmembers,function(i,field){
					$("#groupmembers_list").append($("<li><a href='#' class='groupmembers' data-rel='popup' id="+field.user_id+">"+field.lname+", "+field.fname+"</a></li>"));		
				});
				$("#groupmembers_list").append($("<li><a href='#' id='flush_members_admin'>Flush members</a></li>"));
			}
			else
				$("#groupmembers_list").append($("<li>n/a</li>"));
			$("#groupmembers_list").listview("refresh");
			
			setTimeout(function(){$("#groupmembers_popup").popup("open");},100);

			$("#flush_members_admin").on('click',function(){
				flushGroupMembers();
				});//end of flush members
		});

	//location.href = "index.html#members_list";
	$.mobile.changePage("index.html#members_list", {
        //transition: "slide",
        //reverse: true	//from left
    	});
	});

function flushGroupMembers()
{
	$.post(localStorage.webhost+"group_flushmembers.php",{groupid:localStorage.grouprequestedtojoin})
		.done(function(flush_successful){
			//alert(flush_successful);
			//alert(flush_successful);
			if ( flush_successful )
			{
				alert("All members were removed from the group.");
				//location.reload();
				//alert(localStorage.grouprequestedtojoin);
				$.post(localStorage.webhost+"websock_groupsmgt.php",{userid:localStorage.user_id,context:"group_flushed",groupid:localStorage.grouprequestedtojoin})
					.done(function(){
						//alert(localStorage.grouprequestedtojoin);
				});
			}
		});
}

