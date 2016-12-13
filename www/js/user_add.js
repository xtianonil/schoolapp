$("#add_user_btn").click(function(){
	//check if email field is empty, do not allow input field to be empty
	if ( $.trim( $("#email_new").val() ) < 1 )
		alert("Email field cannot be empty.");
	else
	{
		$.post(localStorage.webhost+"user_add.php",
		{
			username : $.trim($("#username_new").val()),
			password : $.trim($("#password_new").val()),
			//verif_code : $.trim($("#verif_code_new").val()),
			user_type : $.trim($("#user_type_new").val()),
			user_status : $.trim($("#user_status_new").val()),
			email : $.trim($("#email_new").val()),
			first_name : $.trim($("#first_name_new").val()),
			last_name : $.trim($("#last_name_new").val())
			})
			.done(function(userid_lastinserted){
				//alert("last inserted id: "+userid_lastinserted);
				if (userid_lastinserted)
				{
					//user automatically becomes a member of the school
					
					$.post(localStorage.webhost+"group_add_member.php",
						{
							userid : userid_lastinserted,
							groupid : "1"
						}
						)
						.done(function(){

					});

					alert("New user added successfully");
					window.location.href = "index.html#user_management";

					$(".collapsible").collapsible('collapse');	//opposite: expand
					//$(".add_new_user").removeAttr('value');
					$(".add_new_user").val('');
				}		
		});
	}//end of else 
});