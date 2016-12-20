$(document).on('pagebeforeshow','#user_mngmnt',function(){
	$.post(localStorage.webhost+"user_listnonadmin.php")
		.done(function(result_set){
			var users = JSON.parse(result_set);
			var users_tbl = $("<ul data-role='listview' data-filter='true' data-inset='true'>");

			$.each(users, function(i, field)
			{
				var userid 		= field.user_id;
				//var username 	= field.username;
				var password 	= field.password;
				//var verif_code 	= field.verif_code;
				//var user_type 	= field.user_type;
				//var user_status = field.user_status;
				var email 		= field.email;
				var fname 		= field.fname;
				var mname 		= field.mname;
				var lname 		= field.lname;

				$("#listahan_users").append($("<li><a href='#user_popup' class='userslist' data-rel='popup' id="+userid+">"+lname+", "+fname+"</a></li>"));		
				$("#listahan_users").listview("refresh");
			});
			
			var userslist_isclicked = false;
			$(".userslist").click(function(event){
				userslist_isclicked = true;
				$.post(localStorage.webhost+"user_listspecificonly.php",{userid:$(this).attr("id")})
					.done(function(data){
						//alert(data);
						var user_details = JSON.parse(data);
						$("#email_edit").val(user_details[0].email);
						$("#firstname_edit").val(user_details[0].fname);
						$("#lastname_edit").val(user_details[0].lname);
						$("#middlename_edit").val(user_details[0].mname);

						localStorage.userlistuid = user_details[0].user_id;
					});//end of $post userlistpecific
				//event.stopPropagation();
				});//end of li a click
			$(".user_update").click(function(){
				if ( userslist_isclicked )
				{
					$.post(localStorage.webhost+"user_update.php",
					{
						//userid : localStorage.usermngntuserid,
						userid  : localStorage.userlistuid,
						lname 	: $("#lastname_edit").val(),
						fname 	: $("#firstname_edit").val(),
						mname 	: $("#middlename_edit").val(),
						email 	: $("#email_edit").val()
					})
						.done(function(update_successful){
							//alert(update_successful);
							if (update_successful)
							{
								alert("User account updated successfully");
								location.reload();
							}//end of if update_successful
						});//end of $,post user update
				}	//end of if userslist_isclicked
				});//end of user update
			$(".user_delete").click(function(){
				if ( userslist_isclicked )
				{
					$.post(localStorage.webhost+"user_delete.php",
					{
						userid : localStorage.userlistuid
					})
						.done(function(deletion_successful){
							if(deletion_successful)
							{
								alert("User account deleted successfully");
								location.reload();
							}
						});
				}//end of if userslist_isclicked
				});//end of user delete click
			$(".user_membership").click(function(){
				//alert("membership");
				$("#user_popup").popup("close");

				$( "#user_popup" ).on( "popupafterclose", function( event, ui ) {
				    $("#email_edit").removeAttr('value');
					$("#firstname_edit").val("");
					$("#lastname_edit").val("");
					$("#middlename_edit").val("");
				});

				setTimeout(function(){
		        	$("#user_membership1").popup("open");

		        	alert(user_details[0].user_id);
		        }, 100);	//delay is 100ms
			});

			$("#list_users_content").empty();

			$("#users_table tr:even").css("background-color", "#E0E0E0");
			$("#users_table tr:odd").css("background-color", "#F6F6F6");

		});//end of $post localstorage.webhost user_listnonadmin
});//end of $document pagebeforeshow