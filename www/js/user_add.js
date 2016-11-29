$("#add_user_btn").click(function(){
	$.post(localStorage.webhost+"user_add.php",
	{
		username : $.trim($("#username_new").val()),
		password : $.trim($("#password_new").val()),
		verif_code : $.trim($("#verif_code_new").val()),
		user_type : $.trim($("#user_type_new").val()),
		user_status : $.trim($("#user_status_new").val()),
		email : $.trim($("#email_new").val()),
		first_name : $.trim($("#first_name_new").val()),
		last_name : $.trim($("#last_name_new").val())
		})
		.done(function(new_user_added){
			if (new_user_added)
			{
				alert("New user added successfully");
				window.location.href = "index.html#user_management";

				$(".collapsible").collapsible('collapse');	//opposite: expand
				//$(".add_new_user").removeAttr('value');
				$(".add_new_user").val('');
			}		
	});
});