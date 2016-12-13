/*
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    $(document).delegate("#user_mngmnt", "pageshow", function() {
        //console.log("Hello world!");
    });
}
*/
//$(document).delegate('#user_mngmnt', 'pageshow', function () {
$(document).on('pagebeforeshow','#user_mngmnt',function(){
	//restrict access
	if (localStorage.user_type === "school_admin")
		$(".admin_only").show();
	else
		$(".admin_only").hide();
//$("#user_mngmnt_link").click(function(){
	//alert("pasok user mgnt");
	//$(":mobile-pagecontainer").pagecontainer("change", "#user_mngmnt", { options });
	//window.location.href = "index.html#user_mngmnt";
//$("#list_users_header")
	//.on("collapsibleexpand",function( event, ui ) {
	$.post(localStorage.webhost+"user_listnonadmin.php")
		.done(function(result_set){
			//alert(result_set);
			var users = JSON.parse(result_set);
			var table = $('<table id="users_table" style="border-collapse:collapse; margin:0; table-layout:fixed; width:100%;"></table>');

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

				//var users_tbl = $("<ul data-role='listview'>");
				//$("#list_users_content").append("<ul> <li>"+username+"</li> <li> <ul> <li>"+verif_code+"</li> <li>"+user_status+"</li> </ul></li></ul>");
				row = $('<tr></tr>');
				var rowData = $("<td></td>")
							.attr('id',userid)
							.addClass('cells')
							.css('padding','1em')
							.text(username);
				row.append(rowData);
				$("#listahan_users").append($("<li><a href='#user_popup' data-rel='popup' id="+userid+">"+lname+", "+fname+"</a></li>"));
				
				//$("#user_details_popup").empty();
				//$("#user_details_popup").html(username+" "+user_type);
				//$("#user_details_popup").append($("<h1>"+username+" "+user_type+"</h1>"));
				$("#listahan_users").listview("refresh");
				//rown.listview("refresh");

				var rowData = $("<td></td>")
							.attr('id',userid)
							.addClass('cells')
							.text(user_type);
				row.append(rowData);
				//users_tbl.append($("<li>"+user_type+"</li>"));
				
				table.append(row);

				//users_tbl.listview("refresh");
			});
			$("li a").click(function(){
				//alert($(this).attr("id"));
				$.post(localStorage.webhost+"user_listspecific.php",{userid:$(this).attr("id")})
					.done(function(data){
						var user_details = JSON.parse(data);
						$("#email_edit").val(user_details[0].email);
						$("#firstname_edit").val(user_details[0].fname);
						$("#lastname_edit").val(user_details[0].lname);
						//$("#firstname_edit").val(user_details[0].first_name);

						$(".user_update").click(function(){
							$.post(localStorage.webhost+"user_update.php",
							{
								userid : user_details[0].user_id,
								lname 	: $("#lastname_edit").val(),
								fname 	: $("#firstname_edit").val(),
								email 	: $("#email_edit").val()
							})
								.done(function(update_successful){
									//alert(update_successful);
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

							//location.reload();
							//$("#list_users_header").trigger("expand");
							//$("#user_membership1").popup("open");
							//$("#user_popup").popup();
							//$("#user_membership1").popup("open");

							setTimeout(function(){
					          $("#user_membership1").popup();
					          $("#user_membership1").popup("open");
					        }, 3100);
						});

						$( "#user_popup" ).on( "popupafterclose", function( event, ui ) {
						    $("#email_edit").removeAttr('value');
							$("#firstname_edit").val("");
							$("#lastname_edit").val("");
							$("#middlename_edit").val("");
						});
						
					});//end of $post userlistpecific
				});//end of li a click

			/*
			$( "#user_popup" ).bind({
				   popupbeforeposition: function(event, ui)
				   {
				   		//var parameters = $(this).data("url").split("?")[1];;
			            //parameter = parameters.replace("id=","");  
			            //alert(id);
				   		$("#email_edit").val($(this).attr("id"));
				   		//$("#lastname_edit").val(last_name);
				   		//$("#firstname_edit").val(first_name);
				   }
				});
			$(document).on('pagebeforeshow', "#user_mngmnt",function () {
	            var parameters = $(this).data("url").split("?")[1];;
	            parameter = parameters.replace("id=","");  
	            alert(id);
	        });
			*/

			$("#list_users_content").empty();
			//$("#list_users_content").append(users_tbl);
			//$("#list_users_content").append(table);

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
						var input = $("<input type='text' id='username_edit'/>").val(user_details[0].username);
						//input.val(user_details[0].username);
						var rowData = $("<td>")
							.attr('id',user_details[0].user_id)
							.addClass('cells')
							.append(input);
							//.text(user_details[0].username);
						row.append(rowData);
						table.append(row);

						var row = $('<tr></tr>');
						var rowData = $("<td></td>")
							.attr('id',user_details[0].user_id)
							.addClass('cells')
							.text("Email:");
						row.append(rowData);
						input = $("<input type='text' id='email_edit'/>").val(user_details[0].email);
						var rowData = $("<td>")
							.attr('id',user_details[0].user_id)
							.addClass('cells')
							.append(input);
							//.text(user_details[0].email);
						row.append(rowData);
						table.append(row);

						var row = $('<tr></tr>');
						var rowData = $("<td></td>")
							.attr('id',user_details[0].user_id)
							.addClass('cells')
							.text("User type:");
						row.append(rowData);
						dropdown = $("<select id='usertype_edit'>");

						switch(user_details[0].user_type)
						{
							case 'teacher' :
								dropdown.append(new Option('teacher','teacher',true,true));
								dropdown.append(new Option('parent','parent'));
								dropdown.append(new Option('student','student'));
								dropdown.append(new Option('group_mod','group_mod'));
								break;
							case 'parent' :
								dropdown.append(new Option('teacher','teacher'));
								dropdown.append(new Option('parent','parent',true,true));
								dropdown.append(new Option('student','student'));
								dropdown.append(new Option('group_mod','group_mod'));
								break;
							case 'student' :
								dropdown.append(new Option('teacher','teacher'));
								dropdown.append(new Option('parent','parent'));
								dropdown.append(new Option('student','student',true,true));
								dropdown.append(new Option('group_mod','group_mod'));
								break;
							case 'group_mod' :
								dropdown.append(new Option('teacher','teacher'));
								dropdown.append(new Option('parent','parent'));
								dropdown.append(new Option('student','student'));
								dropdown.append(new Option('group_mod','group_mod',true,true));
								break;
						}

						var rowData = $("<td></td>")
							.attr('id',user_details[0].user_id)
							.addClass('cells')
							.append(dropdown);
							//.text(user_details[0].user_type);
						row.append(rowData);
						table.append(row);
						
						$("#user_details_div").empty();
						$("#user_details_div").append(table);
					});
					/*
				$("#edit_user_btn").click(function(){
						//alert($("#username_edit").val() + " " + $("#usertype_edit").val() + " " + $("#email_edit").val());
						$.post(localStorage.webhost+"user_update.php",
							{
								userid 		: id,
								username 	: $("#username_edit").val(),
								email 		: $("#email_edit").val(),
								usertype 	: $("#usertype_edit").val()
							})
							.done(function(update_successful){
								//alert(update_successful);
								if (update_successful)
								{
									alert("User account update successful");
									$("#users_list_dialog").dialog("close");
									$(".collapsible").collapsible('collapse');
								}
							});
					});//end of edit user btn click

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
				*/
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