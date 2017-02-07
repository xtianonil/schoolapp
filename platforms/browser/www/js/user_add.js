$("#add_user_btn").click(function(){
	//check if email field is empty, do not allow input field to be empty
	if ( $.trim( $("#email_new").val() ) < 1 )
		alert("Email field cannot be empty.");
	else
	{
		$.post(localStorage.webhost+"email_check_if_existing.php",{email:$.trim($("#email_new").val())})
			.done(function(data){
				if ( data !== "email_available" )
				{
					alert("Email is already in use.");
					$("#email_new").focus();
				}
				else
				{	//email address is available
					$.post(localStorage.webhost+"user_add.php",
					{
						email : $.trim($("#email_new").val()),
						first_name : $.trim($("#first_name_new").val()),
						middle_name : $.trim($("#middle_name_new").val()),
						last_name : $.trim($("#last_name_new").val())
					}
						)
						.done(function(userid_lastinserted){
							if (userid_lastinserted)
							{
								//user automatically becomes a member of the school
								$.post(localStorage.webhost+"group_add_member.php",
									{
										userid : userid_lastinserted,
										groupid : "1"	//poveda school
									}
									)
									.done(function()
									{
										alert("New user added successfully");
										
										showUsersManagement();

										$("#list_users_header").collapsible('expand');	//opposite: expand
										$(".add_new_user").val('');

									});
							}		
					});
				}
			});

		/*
		
		*/
	}//end of else 
});