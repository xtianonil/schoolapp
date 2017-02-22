$("#group_invitenew").on('click',function(){
	$("[data-role=header]").hide();	//hide burger icon
	inviteMembers();
	location.href = "index.html#members_invite";
});


$("#group_sendinvite").click(function(){
	$('input[type=checkbox]').each(function () {
		if ( this.checked && $(this).hasClass("group_invited") )
		{
			//alert($(this).attr('id')); //localStorage.grouprequestedtojoin
			$.post(localStorage.webhost+"group_invite.php",{userid:$(this).attr('id'),groupid:localStorage.grouprequestedtojoin})
		    	.done(function(data){
		    		if (data)
		    		{
		    			/*
		    			email this user, tell user that user is invited to the group
		    			*/
		    			//alert(data);

		    			//alert("Member/s successfully added to group.");
		    			//window.location.href = "index.html#group_userprofile";
		    		}
		    	});
		}
	});
	alert("Group invites sent.");
	$.mobile.changePage("index.html#group_admin", {
        //transition: "slide",
        //reverse: false	//from right
    });
    $(".group_name").text( "Group: " + localStorage.groupnamerequestedtojoin );
});	
/*
$(document).on('pagebeforeshow',"#group_invitenew",function(){
	//inviteNewMembers();
	inviteMembers();
});*/

//delegate
/*
$(document).on('click','.delete_emailrow',function() {
    var id = $(this).attr('id');
    var x = document.getElementById("li"+id.substring(3));
    //alert($(x).attr('id'));
    $(x).remove();
});*/

function inviteMembers()
{
	//alert("local"+localStorage.groupnamerequestedtojoin);
	$("#group_invites").empty();
	$.post(localStorage.webhost+"group_showlistofnonmembers.php",{groupid:localStorage.grouprequestedtojoin})
		.done(function(data){
			var groups = JSON.parse(data);
			$.each(groups,function(i,field){
				//$("#group_invites").append($("<li><a href='#'>"+field.lname+" "+field.fname+"</a></li>"));
				$("#group_invites").append($("<li><div id="+field.user_id+" class='ui-grid-a my-breakpoint group_joined'><div class='ui-block-a'>"+field.lname+", "+field.fname+"</div><div class='ui-block-b' style='text-align:right;'><input class='group_invited' type='checkbox' id='"+field.user_id+"' /></div><div class='ui-block-c'></div></li>"));
				//"<li><div id="+field.group_id+" class='ui-grid-a my-breakpoint group_joined'><div class='ui-block-a'>"+field.group_name+"</div><div class='ui-block-b' style='text-align:right;'>"+((field.notif_subs==='1')?"subscribed to notifs":"notifs muted") +"</div><div class='ui-block-c'></div></li>"
			});
			$("#group_invites").listview("refresh");
		});
}

function inviteNewMembers()
{
	var ctr = 0;
	$("#mi_emailslist").empty();
	//$("#mi_emailslist").append("<li class='add_email'><a href='#'>ADD</a></li>");
	//var button = "<a id=row"+ctr+" class='delete_emailrow' style='text-decoration:none;' href='#'>X</a>";
	var textbox = "<input class='email_invites' type='text' placeholder='email address' />";
	$("#mi_emailslist").append("<li class='row"+ctr+"'><div class='ui-grid-a'><div class='ui-block-a' style='width:90%'>"+textbox+"</div><div style='width:10%;vertical-align:middle' class='ui-block-b'>"+""+"</div></div></li>");
	$("#mi_emailslist :text").textinput();
	setTimeout(function(){$("#mi_emailslist").listview("refresh");},100); 

	$("#add_email").on('click',function(){
		ctr++;
		var button = "<button id=row"+ctr+" class='delete_emailrow'>X</button>";
		var textbox = "<input class='email_invites' type='text' placeholder='email address' />";
		$("#mi_emailslist").append("<li id=li"+ctr+"><div class='ui-grid-a'><div class='ui-block-a' style='width:90%'>"+textbox+"</div><div style='width:10%;vertical-align:middle' class='ui-block-b'>"+button+"</div></div></li>");
		$("#mi_emailslist :text").textinput();
		$(".delete_emailrow").button('create');
		$("#mi_emailslist").listview("refresh");
	});

	$(".send_invite").on('click',function(){
		$(".email_invites").each(function(){
			//alert($(this).val());
			if ( $.trim( $(this).val() ).length > 0 )
			{

			}
		});//end of input type=text
	});//end of .send_invite
}
