$(document).on('pagebeforeshow','#user_mngmnt',function(){
	$.post(localStorage.webhost+"user_listnonadmin.php")
		.done(function(result_set){
			var users = JSON.parse(result_set);
			var users_tbl = $("<ul data-role='listview' data-filter='true' data-inset='true'>");

			$.each(users, function(i, field)
			{
				var userid 		= field.user_id;
				var username 	= field.username;
				var password 	= field.password;
				var verif_code 	= field.verif_code;
				var user_type 	= field.user_type;
				var user_status = field.user_status;
				var email 		= field.email;
				var fname 		= field.fname;
				var lname 		= field.lname;

				$("#listahan_users").append($("<li><a href='#user_popup' data-rel='popup' id="+userid+">"+lname+", "+fname+"</a></li>"));		
				$("#listahan_users").listview("refresh");
			});
			$("li a").click(function(){
				$.post(localStorage.webhost+"user_listspecific.php",{userid:$(this).attr("id")})
					.done(function(data){
						var user_details = JSON.parse(data);
						$("#email_edit").val(user_details[0].email);
						$("#firstname_edit").val(user_details[0].fname);
						$("#lastname_edit").val(user_details[0].lname);
						$("#middlesname_edit").val(user_details[0].middles_name);

						$(".user_update").click(function(){
							$.post(localStorage.webhost+"user_update.php",
							{
								userid : user_details[0].user_id,
								lname 	: $("#lastname_edit").val(),
								fname 	: $("#firstname_edit").val(),
								email 	: $("#email_edit").val()
							})
								.done(function(update_successful){
									if (update_successful)
									{
										alert("User account updated successfully");
										location.reload();
									}
								});
							});
					
						$(".user_delete").click(function(){
							$.post(localStorage.webhost+"user_delete.php",
							{
								userid : user_details[0].user_id
							})
								.done(function(deletion_successful){
									if(deletion_successful)
									{
										alert("User account deleted successfully");
										location.reload();
									}
								});
							});//end of user delete click
					
						$(".user_membership").click(function(){
							$("#user_popup").popup("close");

							$( "#user_popup" ).on( "popupafterclose", function( event, ui ) {
							    $("#email_edit").removeAttr('value');
								$("#firstname_edit").val("");
								$("#lastname_edit").val("");
								$("#middlename_edit").val("");
							});

							setTimeout(function(){
					        	$("#user_membership1").popup("open");
					        }, 100);	//delay is 100ms
						});

					});//end of $post userlistpecific
				});//end of li a click

			$("#list_users_content").empty();

			$("#users_table tr:even").css("background-color", "#E0E0E0");
			$("#users_table tr:odd").css("background-color", "#F6F6F6");

		});//end of $post localstorage.webhost user_listnonadmin
});//end of $document pagebeforeshow