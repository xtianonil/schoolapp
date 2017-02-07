$("#group_new_button").click(function(){
	if ( $.trim($("#groupname_new_admin").val()) < 1 )
	{
		alert("Group name cannot be empty.");
	}//end of if
	else
	{
		$.post(localStorage.webhost+"group_add.php",
		{
			groupname 	: $("#groupname_new_admin").val(),
			grouptype 	: $("#grouptype_new").val(),
			groupmod	: $("#groupmodslist_new").val()
		}
			).done(function(groupadd_successful){
				if (groupadd_successful)
				{
					alert("New group is successfully created.");
					//window.location.href = "index.html#group_mngmnt";
					location.reload();
					/*
					$.mobile.changePage( "index.html#group_mngmnt", {
						transition: "pop",
						reverse: false,
						changeHash: false
					});
					*/
					//$(".collapsible").collapsible('collapse');	//opposite: expand
				}
			});
	}//end of else
	});//end of group_new_button click

$("#grouptype_new").change(function(){
	if ( $(this).val() !== "school" )
	{
		//$("#groupmodslist_new_li").append( $("<li>School</li>") );
	}
	});