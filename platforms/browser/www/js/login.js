$("#login").click(function(){
	//var element = document.getElementById('deviceProperties');
	//alert(device.uuid);
	var email_login = $("#email_login").val();
	var password = $("#password").val();
	var dataString="email_login="+email_login+"&password="+password+"&login=";
	if($.trim(email_login).length>0 & $.trim(password).length>0)
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
				//alert("SFS");
				//alert(device.uuid);
				//alert("ASDFa");
				if (data === "login_error")
				{
					alert("invalid email or password");

				}
				else if(data !== "login_error")
				{	// login success
					var user_details = JSON.parse(data);

					if (user_details[0].is_active === false)
					{
						alert("Unregistered account");
						
					}
					else
					{	//registered account
						localStorage.login = "true";
						localStorage.email_login = email_login;
						if (user_details[0].is_admin === true)
							localStorage.is_admin = "true";
						localStorage.user_id = user_details[0].user_id;

						//update registration id of logged in user
						app.initialize();

						//alert(device.uuid);
						//alert("ASDF");
						$.post(localStorage.webhost+"user_register.php",
							{
								email : email_login,
								regid : localStorage.getItem('registrationId')
							})
							.done(function(registration_successful){
								if (registration_successful)
								{
									//alert("reg_id updated");
									//window.location.href = "index.html#home";
								}
								
								if (localStorage.is_admin === "true")
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
								$("#logout").val(localStorage.email_login);
								*/
								//alert(localStorage.email_login);
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