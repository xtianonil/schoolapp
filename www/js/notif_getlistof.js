$('#home').on('pageinit', function() {
	//alert("pasok home");
	$.post(localStorage.webhost+"notif_getlistof.php",{userid:localStorage.user_id})
		.done(function(result){
			var group_membership = JSON.parse(result);
			$("#notifs_list").empty();
			for (var i=0; i<group_membership.length; i++)
			{	//for every group the user is a member of 
				//fetch notifs
				$("#notifs_list").append("<ul>");
				$.post(localStorage.webhost+"notif_view.php",{groupid:group_membership[i].group_id})
					.done(function(data){
						var notifs = JSON.parse(data);
						for (var i=0; i<notifs.length; i++)
						{
							$("#notifs_list").append("<li><a href='#' style='text-decoration:none'>message: "	+notifs[i].payload+"</a></li>");
							$("#notifs_list").append("<li><a href='#' style='text-decoration:none'>posted by: "	+notifs[i].username+"</a></li>");
							$("#notifs_list").append("<li><a href='#' style='text-decoration:none'>posted on: "	+notifs[i].created_on+"</a></li>");
							$("#notifs_list").append("<hr>");
						}
					});
				$("#notifs_list").append("</ul>");
			}
			//$("#notifs_list").append("</ul>");
		});
	});