$("#register_btn").click(function(){
	var uname = $("#reg_username").val();
	var pword = $("#reg_password").val();
	var eml = $("#reg_email").val();
	var vcode = $("#verif_code").val();

	alert(reg_id);
	/*
	var dataString="username="+uname;
	$.ajax({
			type: "POST",
			url: "http://192.168.0.16/school_connect_server/check_if_username_exists.php",
			data: dataString,
			crossDomain: true,
			cache: false,
			beforeSend: function(){

			},
			success: function(data){
				alert(dataString);
			}
	});
	*/
	
	$.post("http://192.168.0.16/school_connect_server/check_if_username_exists.php",
	{
		username : uname
	})
		.done(function(data){
			//alert(data);
			if (data === "username_exists")
			{
				//alert("username exists");
			}
			else if (data === "username_available")
			{
				//alert("error");
			}
	});
	
	/*
	alert("submit registration");
	var username = $("#username").val();
	var password = $("#password").val();
	var dataString="username="+username+"&password="+password+"&register=";
	if($.trim(username).length>0 & $.trim(password).length>0)
	{
		$.ajax({
			type: "POST",
			url: "http://192.168.0.16/school_connect_server/register.php",
			data: dataString,
			crossDomain: true,
			cache: false,
			beforeSend: function(){ 
				$("#register").html('Connecting...');
				//`alert(dataString);
			},
			success: function(data){
				if(data)
				{	// register success
					var user_details = JSON.parse(data);
					localStorage.register = "true";
					localStorage.username = username;
					localStorage.user_type = user_details[0].user_type;
					//alert(localStorage.user_type); 

					window.location.href = "index.html#logged_in";
				}
				else if(data)
				{	//register error
					alert("register error");
					$("#register").html('register');
				}
			}
		});
	}
	return false;
	*/
});