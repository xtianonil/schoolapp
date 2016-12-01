$("#register_btn").click(function(){
	var uname = $("#reg_username").val();
	//var pword = $("#reg_password").val();
	var eml = $("#reg_email").val();
	var vcode = $("#verif_code").val();
	
	$.post(localStorage.webhost+"check_if_username_exists.php",
	{
		username : uname
	})
		.done(function(user_availability){
			if (user_availability === "username_available")
			{
				alert("Invalid username");
			}
			else if (user_availability === "username_exists")
			{
				$.post(localStorage.webhost+"check_if_user_registered.php",{username:uname})
					.done(function(is_user_registered){
						if (is_user_registered === "user_registered_true")
						{
							alert("Username already registered");
						}
						else
						{
							$.post(localStorage.webhost+"check_verif_code.php",
							{
								username : uname,
								verif_code : vcode
								})
								.done(function(code_verification){
									if (code_verification === "verif_code_true")
									{
										app.initialize();
										$.post(localStorage.webhost+"user_register.php",
											{
												username : uname,
												regid : localStorage.getItem('registrationId')
											})
											.done(function(registration_successful){
												if (registration_successful)
												{
													alert("registration successful");
													window.location.href = "index.html#not_logged_in";
													location.reload();
													$("#login").html('Login');
												}
												else
													alert("registration error");
										});
									}
									else if (code_verification === "verif_code_false")
									{
										alert("invalid verification code");
									}
							});//end of $.post check verif code
						}
				});		
			}
	});//end of $.post check if username exists
});//end of register.btn click