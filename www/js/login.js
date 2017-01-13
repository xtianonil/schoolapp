$("#login").click(function(){
	localStorage.registrationId = '';
	localStorage.login = 'false';
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
			},
			success: function(data){
				//alert(data);
				if (data === "email_does_not_exist")
				{
					alert("Email does not exist");
				}
				else if ( data === "wrong_password" )
				{
					alert("wrong password");
				}
				else if ( data === "unregistered" )
				{
					alert("Unregistered account.");
				}

				else 
				{	// login success
					//alert("ASF");
					//alert(data);
					var user_details = JSON.parse(data);

					if (user_details[0].is_active === 0)
					{
						alert("Your account is inactive. You must first verify your email address.");
						
					}
					else
					{	//registered account
						alert("device uuid:"+device.uuid);
						localStorage.login = "true";
						localStorage.email_login = email_login;
						if (user_details[0].is_admin === '1')
							localStorage.is_admin = "true";
						else
							localStorage.is_admin = "false";
						localStorage.user_id = user_details[0].user_id;
						localStorage.name = user_details[0].lname + " " + user_details[0].fname + " " + user_details[0].mname;


						//update registration id of logged in user
						app.initialize();

						//check if user has logged in on the device
						//aka check if uuid exists in user_device table
						//alert(localStorage.registrationId);
						//alert(localStorage.reg_id);
						/*
						$.post(localStorage.webhost+"user_add_device.php",
							{
								userid 	: user_details[0].user_id,
								//uuid 	: device.uuid,
								//platform: device.platform,
								//model	: device.model,
								regid 	: localStorage.reg_id
							})
							.done(function(data){
								//alert(data);
								location.reload();
								$("#login").html('Login');
							});
							*/
						$.post(localStorage.webhost+"user_check_if_uuid_exists.php",{uuid:device.uuid,userid:user_details[0].user_id,regid:localStorage.reg_id})
							.done(function(data){
								alert(data);
								if (data === "uuid_exists")
								{	//means user has logged in on this device before, just update device details
									$.post(localStorage.webhost+"user_update_device.php",
										{
											userid 	: user_details[0].user_id,
											uuid 	: device.uuid,
											platform: device.platform,
											model	: device.model,
											regid 	: localStorage.reg_id
										})
										.done(function(){
											location.reload();
											$("#login").html('Login');
										});
								}
								else
								{	//means users has not logged in on this device before, create a new record for device details
									$.post(localStorage.webhost+"user_add_device.php",
										{
											userid 	: user_details[0].user_id,
											uuid 	: device.uuid,
											platform: device.platform,
											model	: device.model,
											regid 	: localStorage.reg_id
										})
										.done(function(){
											location.reload();
											$("#login").html('Login');
										});
								}
							});
						$("#login").html('Login');
						/*

						$.post(localStorage.webhost+"user_register.php",
							{
								userid : user_details[0].user_id,
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
								
								//alert(localStorage.email_login);
							});
						//window.location.href = "index.html#home";
						*/
					}
				}
				/*
				else
				{	//login error
					alert("Login error");
					
				}*/
				$("#login").html('Login');
			}//end of success
		});//end of ajax
	}
	return false;
});