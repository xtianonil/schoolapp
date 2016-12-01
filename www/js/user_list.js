$("#user_management").on('pageshow',function(){
//$("#list_users_header")
	//.on("collapsibleexpand",function( event, ui ) {
	$.post(localStorage.webhost+"user_list.php")
		.done(function(result_set){
			var users = JSON.parse(result_set);
			var table = $('<table id="users_table" style="border-collapse:collapse; margin:0;"></table>');

			$.each(users, function(i, field)
			{
				var userid 		= field.user_id;
				var username 	= field.username;
				var password 	= field.password;
				var verif_code 	= field.verif_code;
				var user_type 	= field.user_type;
				var user_status = field.user_status;
				var email 		= field.email;
				var first_name 	= field.first_name;
				var last_name 	= field.last_name;

				//$("#list_users_content").append("<ul> <li>"+username+"</li> <li> <ul> <li>"+verif_code+"</li> <li>"+user_status+"</li> </ul></li></ul>");
				row = $('<tr></tr>');
				var rowData = $("<td></td>")
							.attr('id',userid)
							.addClass('cells')
							.css('padding','1em')
							.text(username);
				row.append(rowData);

				var rowData = $("<td></td>")
							.attr('id',userid)
							.addClass('cells')
							.text(user_type);
				row.append(rowData);

				table.append(row);
			});

			$("#list_users_content").empty();
			$("#list_users_content").append(table);

			$("#users_table tr:even").css("background-color", "#E0E0E0");
			$("#users_table tr:odd").css("background-color", "#F6F6F6");

			$(".cells").click(function(){
				var id = $(this).attr('id');
				//alert(pg);
				$("#list_users").click();

				$.post(localStorage.webhost+"record_view.php",
				{
					table 			: "user",
					field 			: "user_id",
					searchstring 	: id,
					orderby			: "username"
				}
					)
					.done(function(res){
						var user_details = JSON.parse(res);
						var table = $('<table id="user_details_table" style="border-collapse:collapse; margin:0;"></table>');

						var row = $('<tr></tr>');
						var rowData = $("<td></td>")
							.attr('id',user_details[0].user_id)
							.addClass('cells')
							.text("Username:");
						row.append(rowData);
						var rowData = $("<td></td>")
							.attr('id',user_details[0].user_id)
							.addClass('cells')
							.text(user_details[0].username);
						row.append(rowData);
						table.append(row);

						var row = $('<tr></tr>');
						var rowData = $("<td></td>")
							.attr('id',user_details[0].user_id)
							.addClass('cells')
							.text("Email:");
						row.append(rowData);
						var rowData = $("<td></td>")
							.attr('id',user_details[0].user_id)
							.addClass('cells')
							.text(user_details[0].email);
						row.append(rowData);
						table.append(row);

						var row = $('<tr></tr>');
						var rowData = $("<td></td>")
							.attr('id',user_details[0].user_id)
							.addClass('cells')
							.text("User type:");
						row.append(rowData);
						var rowData = $("<td></td>")
							.attr('id',user_details[0].user_id)
							.addClass('cells')
							.text(user_details[0].user_type);
						row.append(rowData);
						table.append(row);
						
						$("#user_details_div").empty();
						$("#user_details_div").append(table);
					});

				$("#delete_user_btn").click(function(){
						//alert("user:"+id+" deleted from...");
						$.post(localStorage.webhost+"user_delete.php",{userid:id})
							.done(function(deletion_successful){
								if (deletion_successful)
								{
									alert("User deletion successful");
									$("#users_list_dialog").dialog("close");
									$(".collapsible").collapsible('collapse');
									//$("#list_users").click();
								}
							});
					});//end of delete user btn click
				});//end of .cells click
		});
});


/*
$.each(result, function(i, field) {
	var id = field.id;
	var title = field.title;
	var duration = field.duration;
	var price = field.price;
	$("#listview").append("<a class='item' href='form.html?id=" + id + "&title=" + title + "&duration=" + duration + "&price=" + price + "'><span class='item-note'>$" + price + "</span><h2>" + title + " </h2><p>" + duration + "</p></a>");
	});
*/