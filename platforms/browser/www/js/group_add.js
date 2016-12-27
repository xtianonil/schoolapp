$("#group_new_button").click(function(){
	if ( $.trim($("#groupname_new").val()) < 1 )
	{
		alert("Group name cannot be left empty.");
	}//end of if
	else
	{
		$.post(localStorage.webhost+"group_add.php",
		{
			groupname 	: $("#groupname_new").val(),
			grouptype 	: $("#grouptype_new").val(),
			groupmod	: $("#groupmodslist_new").val()
		}
			).done(function(groupadd_successful){
				if (groupadd_successful)
				{
					alert("New group is successfully created.");
					location.reload();
					//window.location.href = "index.html#groups";
					//$(".collapsible").collapsible('collapse');	//opposite: expand
				}
			});
	}//end of else
	});//end of group_new_button click