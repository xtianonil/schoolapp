$("#group_new_button").click(function(){
	$.post(localStorage.webhost+"group_add.php",
	{
		groupname 	: $("#groupname_new").val(),
		grouptype 	: $("#grouptype_new").val(),
		groupmod	: $("#groupmod_new").val()
	}
		).done(function(groupadd_successful){
			if (groupadd_successful)
			{
				alert("New group is successfully created.");
				//window.location.href = "index.html#groups";
				//$(".collapsible").collapsible('collapse');	//opposite: expand
			}
		});
	});