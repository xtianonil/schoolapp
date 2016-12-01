$("#login").click(function(){
	var username = $("#username").val();
	var password = $("#password").val();
	var dataString="username="+username+"&password="+password+"&login=";
	if($.trim(username).length>0 & $.trim(password).length>0)
	{
		$.ajax({
			type: "POST",
			url: "http://192.168.0.16/school_connect_server/login.php",
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

						//restrict access
						if (localStorage.user_type === "school_admin")
							$(".admin_only").show();
						else
							$(".admin_only").hide();

						//update registration id of logged in user
						app.initialize();
						$.post("http://192.168.0.16/school_connect_server/user_register.php",
							{
								username : username,
								regid : localStorage.getItem('registrationId')
							})
							.done(function(registration_successful){
								if (registration_successful)
								{
									alert("reg_id updated");
								}
							});


						window.location.href = "index.html#home";
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