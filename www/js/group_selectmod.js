$("#groupmod_new").keyup(function(){
	$("#groupmodslist_new").empty();
	if(($.trim($(this).val())).length > 0)
		list_mods("%"+$.trim($(this).val())+"%");
	});

function list_mods(searchstring)
{
	$.post(localStorage.webhost+"group_listmodmatches.php",
	{
		searchstring : searchstring
	})
		.done(function(data){
			var groups = JSON.parse(data);
			var table = $('<table id="usermods_table" style="border-collapse:collapse; margin:0; table-layout:fixed; width:100%;"></table>');

			$.each(groups, function(i, field)
			{
				var userid 		= field.user_id;
				var username 	= field.username;
				var firstname	= field.first_name;
				var lastname	= field.last_name;
				var usertype	= field.user_type;
				var email		= field.email;

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
							.text(email);
				row.append(rowData);

				var rowData = $("<td></td>")
							.attr('id',userid)
							.addClass('cells')
							.text(usertype);
				row.append(rowData);

				table.append(row);
			});	
			$("#groupmodslist_new").empty();
			$("#groupmodslist_new").append(table);

			$("#usermods_table tr:even").css("background-color", "#E0E0E0");
			$("#usermods_table tr:odd").css("background-color", "#F6F6F6");

			$(".cells").click(function(){
				var selectedid = $(this).attr('id');
				$("#groupmodslist_new").empty();
				$.post(localStorage.webhost+"user_listspecific.php",{userid:selectedid})
					.done(function(data){
						var usr = JSON.parse(data);
						$("#groupmod_new").val(usr[0].user_id);
					});

				});
		});
}

