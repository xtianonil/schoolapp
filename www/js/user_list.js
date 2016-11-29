$("#list_users_header")
	.on("collapsibleexpand",function( event, ui ) {
	$.post(localStorage.webhost+"user_list.php")
		.done(function(result_set){
			var users = JSON.parse(result_set);
			var table = $('<table id="users_table" style="border-collapse: collapse;"></table>');

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
							//.addClass('cells')
							.text(username);
				row.append(rowData);

				var rowData = $("<td></td>")
							.attr('id',userid)
							//.addClass('cells')
							.text(user_type);
				row.append(rowData);

				table.append(row);
			});
			$("#list_users_content").empty();
			$("#list_users_content").append(table);

			$("#users_table tr:even").css("background-color", "#CCCCCC");
			$("#users_table tr:odd").css("background-color", "#F4F4F8");
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