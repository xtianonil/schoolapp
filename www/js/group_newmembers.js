$(document).on('pagebeforeshow',"#members_invite",function(){
	//inviteNewMembers();
	inviteMembers();
});

//delegate
$(document).off().on('click','.delete_emailrow',function() {
    var id = $(this).attr('id');
    var x = document.getElementById("li"+id.substring(3));
    //alert($(x).attr('id'));
    $(x).remove();
});

function inviteMembers()
{

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

	$("#add_email").off().on('click',function(){
		ctr++;
		var button = "<button id=row"+ctr+" class='delete_emailrow'>X</button>";
		var textbox = "<input class='email_invites' type='text' placeholder='email address' />";
		$("#mi_emailslist").append("<li id=li"+ctr+"><div class='ui-grid-a'><div class='ui-block-a' style='width:90%'>"+textbox+"</div><div style='width:10%;vertical-align:middle' class='ui-block-b'>"+button+"</div></div></li>");
		$("#mi_emailslist :text").textinput();
		$(".delete_emailrow").button('create');
		$("#mi_emailslist").listview("refresh");
	});

	$(".send_invite").off().on('click',function(){
		$(".email_invites").each(function(){
			//alert($(this).val());
			if ( $.trim( $(this).val() ).length > 0 )
			{

			}
		});//end of input type=text
	});//end of .send_invite

	$(".email_invites").off().on('focusin',function(){
		alert("focus in");
	});
}