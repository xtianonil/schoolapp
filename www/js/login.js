$("#login").click(function(){
	var username = $("#username").val();
	var password = $("#password").val();
	var dataString="username="+username+"&password="+password+"&login=";
	if($.trim(username).length>0 & $.trim(password).length>0)
	{
		$.ajax({
			type: "POST",
			url: localStorage.webhost+"login.php",
			data: dataString,
			crossDomain: true,
			cache: false,
			beforeSend: function(){ 
				$("#login").html('Connecting...');
				//`alert(dataString);
			},
			success: function(data){
				if (data === "login_error")
				{
					alert("invalid username or password");

				}
				else if(data !== "login_error")
				{	// login success
					var user_details = JSON.parse(data);

					if (user_details[0].user_status !== "registered")
					{
						alert("Unregistered account");
						
					}
					else
					{	//registered account
						localStorage.login = "true";
						localStorage.username = username;
						localStorage.user_type = user_details[0].user_type;
						localStorage.user_id = user_details[0].user_id;

						//update registration id of logged in user
						app.initialize();
						$.post(localStorage.webhost+"user_register.php",
							{
								username : username,
								regid : localStorage.getItem('registrationId')
							})
							.done(function(registration_successful){
								if (registration_successful)
								{
									//alert("reg_id updated");
									//window.location.href = "index.html#home";
								}
								if (localStorage.user_type === "school_admin")
									window.location.href = "index.html#admin_panel";
								else
									window.location.href = "index.html#home";
								location.reload();

								$("#login").html('Login');

								/*
								//restrict access
								if (localStorage.user_type === "school_admin")
									$(".admin_only").show();
								else
									$(".admin_only").hide();
								$("#logout").empty();
								$("#logout").val(localStorage.username);
								*/
								//alert(localStorage.username);
							});
						//window.location.href = "index.html#home";
					}
				}
				else
				{	//login error
					alert("Login error");
					
				}
				$("#login").html('Login');
			}//end of success
		});//end of ajax
	}
	return false;
});