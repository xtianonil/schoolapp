$(document).on('pagebeforeshow','#groups',function(){
	//alert(localStorage.webhost+"group_list.php");
	$.post(localStorage.webhost+"group_list.php",{userid:localStorage.user_id })
		.done(function(result_set){
			var groups = JSON.parse(result_set);
			var table = $('<table class="groups_table" style="border-collapse:collapse; margin:0; table-layout:fixed; width:100%;"></table>');
			//alert(result_set);
			$.each(groups, function(i, field)
			{
				var groupid 	= field.group_id;
				var grouptype 	= field.group_type;
				var modid	 	= field.moderator_id;
				var groupkey 	= field.group_key;
				var groupname 	= field.group_name;
				/*
				var user_status = field.user_status;
				var email 		= field.email;
				var first_name 	= field.first_name;
				var last_name 	= field.last_name;*/

				//$("#list_users_content").append("<ul> <li>"+username+"</li> <li> <ul> <li>"+verif_code+"</li> <li>"+user_status+"</li> </ul></li></ul>");
				row = $('<tr></tr>');
				var rowData = $("<td></td>")
							.attr('id',groupid)
							//.addClass('cells')
							.css('padding','1em')
							.text(groupname);
				row.append(rowData);

				var rowData = $("<td></td>")
							.attr('id',groupid)
							//.addClass('cells')
							.text(grouptype);
				row.append(rowData);

				table.append(row);
			});

			$("#listall_groups_memberof_content").empty();
			$("#listall_groups_memberof_content").append(table);

			$(".groups_table tr:even").css("background-color", "#E0E0E0");
			$(".groups_table tr:odd").css("background-color", "#F6F6F6");
		});
	$.post(localStorage.webhost+"group_listall.php")
		.done(function(result_set){
			//alert(result_set);
			var groups = JSON.parse(result_set);
			var table = $('<table class="groups_table" style="border-collapse:collapse; margin:0; table-layout:fixed; width:100%;"></table>');
			//alert(result_set);
			$.each(groups, function(i, field)
			{
				var groupid 	= field.group_id;
				var grouptype 	= field.group_type;
				var modid	 	= field.moderator_id;
				var groupkey 	= field.group_key;
				var groupname 	= field.group_name;
				/*
				var user_status = field.user_status;
				var email 		= field.email;
				var first_name 	= field.first_name;
				var last_name 	= field.last_name;*/

				//$("#list_users_content").append("<ul> <li>"+username+"</li> <li> <ul> <li>"+verif_code+"</li> <li>"+user_status+"</li> </ul></li></ul>");
				row = $('<tr></tr>');
				var rowData = $("<td></td>")
							.attr('id',groupid)
							.addClass('cells')
							.css('padding','1em')
							.text(groupname);
				row.append(rowData);

				var rowData = $("<td></td>")
							.attr('id',groupid)
							.addClass('cells')
							.text(grouptype);
				row.append(rowData);

				table.append(row);
			});

			$("#list_groups_content").empty();
			$("#list_groups_content").append(table);

			$(".groups_table tr:even").css("background-color", "#E0E0E0");
			$(".groups_table tr:odd").css("background-color", "#F6F6F6");

			$(".cells").click(function(){
				var id = $(this).attr('id');
				//alert(pg);
				$("#list_groups").click();

				$.post(localStorage.webhost+"record_view_group.php",
				{
					table 			: "user_group",
					field 			: "group_id",
					searchstring 	: id,
					orderby			: "group_name"
				}
					)
					.done(function(res){
						var group_details = JSON.parse(res);
						var table = $('<table id="group_details_table" style="border-collapse:collapse; margin:0;"></table>');

						var row = $('<tr></tr>');
						var rowData = $("<td></td>")
							.attr('id',group_details[0].group_id)
							.addClass('cells')
							.text("Name of group:");
						row.append(rowData);
						var rowData = $("<td></td>")
							.attr('id',group_details[0].group_id)
							.addClass('cells')
							.text(group_details[0].group_name);
						row.append(rowData);
						table.append(row);

						var row = $('<tr></tr>');
						var rowData = $("<td></td>")
							.attr('id',group_details[0].group_id)
							.addClass('cells')
							.text("Moderator:");
						row.append(rowData);
						var rowData = $("<td></td>")
							.attr('id',group_details[0].group_id)
							.addClass('cells')
							.text(group_details[0].username);
						row.append(rowData);
						table.append(row);
						/*
						var row = $('<tr></tr>');
						var rowData = $("<td></td>")
							.attr('id',group_details[0].group_id)
							.addClass('cells')
							.text("group type:");
						row.append(rowData);
						var rowData = $("<td></td>")
							.attr('id',group_details[0].group_id)
							.addClass('cells')
							.text(group_details[0].group_type);
						row.append(rowData);
						table.append(row);
						*/
						$("#group_details_div").empty();
						$("#group_details_div").append(table);
					});

				$("#join_group_btn").click(function(){
						//alert("group:"+id+" deleted from...");

						//check if tama yung group key
						$.post(localStorage.webhost+"group_check_groupkey.php",{groupkey:$("#join_group_key").val()})
							.done(function(groupkey_check){
								if (groupkey_check === "group_key_invalid")
								{
									alert("Invalid group key");
								}
								else if (groupkey_check === "group_key_valid")
								{
									//alert("valid group key");
									$.post(localStorage.webhost+"group_add_member.php",{groupid:id,userid:localStorage.user_id})
										.done(function(join_successful){
											if (join_successful)
											{
												//alert("group deletion successful");
												$("#groups_list_dialog").dialog("close");
												$(".collapsible").collapsible('collapse');
												//$("#list_users").click();
											}
										});
								}//end of else if
							});
					});//end of delete user btn click
				});//end of .cells click
	});
	});