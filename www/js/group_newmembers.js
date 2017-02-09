$(document).on('pagebeforeshow',"#members_invite",function(){
	inviteNewMembers();
});

function inviteNewMembers()
{
	var ctr = 0;
	$("#mi_emailslist").empty();
	//$("#mi_emailslist").append("<li class='add_email'><a href='#'>ADD</a></li>");
	var button = "<a id=row"+ctr+" class='delete_emailrow' style='text-decoration:none;' href='#'>X</a>";
	var textbox = "<input type='text' placeholder='email address' />";
	$("#mi_emailslist").append("<li class='row"+ctr+"'><div class='ui-grid-a'><div class='ui-block-a' style='width:90%'>"+textbox+"</div><div style='width:10%;display:inline-block;vertical-align:middle' class='ui-block-b'>"+button+"</div></div></li>");
	$("#mi_emailslist :text").textinput();
	setTimeout(function(){$("#mi_emailslist").listview("refresh");},100); 

	$("#add_email").off().on('click',function(){
		ctr++;
		var button = "<a id=row"+ctr+" class='delete_emailrow' style='text-decoration:none;' href='#'>row"+ctr+"</a>";
		var textbox = "<input id=textboxrow"+ctr+" type='text' placeholder='email address' />";
		$("#mi_emailslist").append("<li><div class='ui-grid-a'><div class='ui-block-a' style='width:90%'>"+textbox+"</div><div style='width:10%;display:inline-block;vertical-align:middle' class='ui-block-b'>"+button+"</div></div></li>");
		$("#mi_emailslist :text").textinput();
		$("#mi_emailslist").listview("refresh");
	});

	$(".delete_emailrow").click(function(){
		//alert(ctr);
		alert($(this).attr('id'));
	});

	/*
	for(var i=0;i<5;i++)
	{
		li = "<li/>";
		button = "<a style='text-decoration:none;' href='#' id='emailinvite_btn'>X</a>";
		//var row = "<div/>";
		//row.append(button);
		textbox = "<input type='text' placeholder='email address' />";
		//$("#mi_emailslist").append(li+button+textbox);
		$("#mi_emailslist").append("<li><div class='ui-grid-a'><div class='ui-block-a' style='width:90%'>"+textbox+"</div><div style='width:10%;display:inline-block;vertical-align:middle' class='ui-block-b'>"+button+"</div></div></li>");
		//$("#mi_emailslist").append("<li>"+row+"</li>");
		//$("#mi_emailslist").append(button);
		//$("#mi_emailslist").listview("refresh");
		$("#mi_emailslist :text").textinput();
		//$("#emailinvite_btn").button();
	}
	*/
	/*
	complete: function() {
            $('#mi_emailslist').listview('refresh');
        } */
}