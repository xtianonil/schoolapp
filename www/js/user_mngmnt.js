$(document).on('pagebeforeshow','#user_mngmnt',function(){
//$(document).on('pagebeforechange','#user_mngmnt',function(){
	showUsersManagement();
});//end of $document pagebeforeshow

function showUsersManagement()
{
	$.post(localStorage.webhost+"user_listnonadmin.php")
		.done(function(result_set){
			var users = JSON.parse(result_set);
			$("#listahan_users").empty();
			$.each(users, function(i, field)
			{
				var userid 		= field.user_id;
				var email 		= field.email;
				var fname 		= field.fname;
				var mname 		= field.mname;
				var lname 		= field.lname;
				$("#listahan_users").append($("<li><a href='#user_popup' class='userslist' data-rel='popup' id="+userid+">"+lname+", "+fname+"</a></li>"));		
				$("#listahan_users").listview("refresh");
			});
			
			var userslist_isclicked = false;
			var userslistmember_isclicked = false;
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
	
							    showUsersManagement();
							    setTimeout(function(){$("#user_popup").popup("close");},100);
							}
						});
				}//end of if userslist_isclicked
				});//end of user delete click
			$(".user_membership").click(function(){
				if ( userslist_isclicked )
				{
					userslistmember_isclicked = true;
					$("#user_popup").popup("close");

					$( "#user_popup" ).on( "popupafterclose", function( event, ui ) {
					    $("#email_edit").removeAttr('value');
						$("#firstname_edit").val("");
						$("#lastname_edit").val("");
						$("#middlename_edit").val("");
					});

					setTimeout(function(){
			        	$("#user_membership1").popup("open");
			        	$.post(localStorage.webhost+"user_showlistofgroupsjoined.php",{userid:localStorage.userlistuid})
			        		.done(function(res){
			        			var user_groups = JSON.parse(res);
			        			$("#listahan_groups").empty();
			        			$.each(user_groups, function(i, field)
								{
									$("#listahan_groups").append($("<li><a href='#' class='groupslist' data-rel='popup' id="+field.group_id+">"+field.group_name+" ("+field.group_type+")</a></li>"));		
									$("#listahan_groups").listview("refresh");
								});
			        		});
			        }, 100);	//delay is 100ms
				}
				});//end of user membership clicked
			$(".user_affinity").click(function(){
				if ( userslist_isclicked )
				{
					$("#user_popup").popup("close");
					//alert(localStorage.userlistuid);
					
					$.post(localStorage.webhost+"user_listspecific.php",{userid:localStorage.userlistuid})
						.done(function(data){
							var user_details = JSON.parse(data);
							//alert(user_details[0].user_id);
							//$("#affinity_nameofuser").empty();
							$("#affinity_nameofuser").val(user_details[0].lname+", "+user_details[0].fname);
							$("#affinity_roleofuser").empty();
							var roles = ["student","father","mother","guardian"];
							for ( var i=0; i<roles.length; i++ )
							{
								if ( user_details[0].role === roles[i] && roles[i] === "student" )
								{
									$("#affinity_roleofuser").append( new Option( roles[i],roles[i],true,true ) );
									$(".affinity_parent").show();
									$(".affinity_student").hide();
								}
								else if ( user_details[0].role === "parent" )
									if ( user_details[0].parent_type === roles[i] )
									{
										$("#affinity_roleofuser").append( new Option( roles[i],roles[i],true,true ) );
										$(".affinity_student").show();
										$(".affinity_parent").hide();
									}
								else
									$("#affinity_roleofuser").append( new Option( roles[i],roles[i] ) );
								$("#affinity_roleofuser").selectmenu("refresh");
							}
							/*
							$.post(localStorage.webhost+"user_listall.php")
								.done(function(data1){
									var users = JSON.parse(data1);
									$.each(users, function(i, field)
									{
										if ( user_details[0].user_id === field.user_id )
											$("#affinity_nameofuser").append( new Option(field.lname+","+field.fname,field.user_id,true,true) );
										else
											$("#affinity_nameofuser").append( new Option(field.lname+","+field.fname,field.user_id) );
										$("#affinity_nameofuser").selectmenu("refresh");

										
									});
								});*/
						});
						
					setTimeout(function(){
			        	$("#user_affinity").popup("open");
			        },100);
				}
				});
			var join_another_isclicked = false;
			$("#join_another_group_btn").click(function(){
				join_another_isclicked = true;
				$("#user_membership1").popup("close");
				setTimeout(function(){
					$("#join_another_group_div").popup("open");
				},100);

				$.post(localStorage.webhost+"user_showlistofgroupsnotjoined.php",{userid:localStorage.userlistuid})
					.done(function(res){
						var user_groups = JSON.parse(res);
						$("#groups_list_notmember").empty();
						$.each(user_groups,function(i,field)
						{
							$("#groups_list_notmember").append(new Option(field.group_name,field.group_id));
							$("#groups_list_notmember").selectmenu("refresh");
						});//end of each
					});//end of $.post user_listgroupsof_not
				});//end of $join_another_group_btn
			/*
			$(".groupslist").click(function(){
				if ( userslistmember_isclicked )
				{

				}
				});
				*/
			$("#join_another_group_submit_btn").click(function(){
				if ( join_another_isclicked )
				{
					$.post(localStorage.webhost+"group_add_member.php",{userid:localStorage.userlistuid,groupid:$("#groups_list_notmember").val()})
						.done(function(groupmember_added){
							alert("Successfully added member to group.");
							location.reload();
						});
				}
				});

			$("#list_users_content").empty();

			$("#users_table tr:even").css("background-color", "#E0E0E0");
			$("#users_table tr:odd").css("background-color", "#F6F6F6");

		});//end of $post localstorage.webhost user_listnonadmin
}