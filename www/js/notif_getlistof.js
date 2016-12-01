/*
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    $(document).delegate("#home", "pageshow", function() {
        //console.log("Hello world!");
        $.post(localStorage.webhost+"notif_getlistof.php",{userid:localStorage.user_id})
			.done(function(result){
				var group_membership = JSON.parse(result);
				$("#notifs_list").empty();
				for (var i=0; i<group_membership.length; i++)
				{	//for every group the user is a member of 
					//fetch notifs
					var ul = $("<ul data-role='listview' data-theme='a'>");
					//$("#notifs_list").append(ul);
					$.post(localStorage.webhost+"notif_view.php",{groupid:group_membership[i].group_id})
						.done(function(data){
							var notifs = JSON.parse(data);
							for (var i=0; i<notifs.length; i++)
							{
								var li = $("<li><a href='#' style='text-decoration:none'>message: "	+notifs[i].payload+"</a></li>");
								ul.append(li);
								var li = $("<li><a href='#' style='text-decoration:none'>posted by: "	+notifs[i].username+"</a></li>");
								ul.append(li);
								var li = $("<li><a href='#' style='text-decoration:none'>posted on: "	+notifs[i].created_on+"</a></li>");
								ul.append(li);
								ul.append("<hr>");
							}
						});
					ul_close = $("</ul>");
					ul.append(ul_close);
					$("#notifs_list").append(ul);
					//$("#notifs_list").append("</ul>");
				}
				//$("#notifs_list").append("</ul>");
			});
    });
}
*/
/*
$('#home').on('pagebeforeshow',function() {
	$('#home').trigger("pagecreate");
	});
	*/
//document.addEventListener("deviceready", onDeviceReady, false);

//function onDeviceReady() {
//$(document).delegate('#home', 'pageshow', function () {
$('#home').on('pageshow',function() {
	//alert("pasok home");
	//window.location.href = "index.html#home";
	$.post(localStorage.webhost+"notif_getlistof.php",{userid:localStorage.user_id})
		.done(function(result){
			var group_membership = JSON.parse(result);
			$("#notifs_list").empty();
			for (var i=0; i<group_membership.length; i++)
			{	//for every group the user is a member of 
				//fetch notifs
				var ul = $("<ul data-role='listview' data-theme='a'>");
				//$("#notifs_list").append(ul);
				$.post(localStorage.webhost+"notif_view.php",{groupid:group_membership[i].group_id})
					.done(function(data){
						var notifs = JSON.parse(data);
						for (var i=0; i<notifs.length; i++)
						{
							var li = $("<li><a href='#' style='text-decoration:none'>message: "	+notifs[i].payload+"</a></li>");
							ul.append(li);
							var li = $("<li><a href='#' style='text-decoration:none'>posted by: "	+notifs[i].username+"</a></li>");
							ul.append(li);
							var li = $("<li><a href='#' style='text-decoration:none'>posted on: "	+notifs[i].created_on+"</a></li>");
							ul.append(li);
							ul.append("<hr>");
						}
					});
				ul_close = $("</ul>");
				ul.append(ul_close);
				$("#notifs_list").append(ul);
				//$("#notifs_list").append("</ul>");
			}
			//$("#notifs_list").append("</ul>");
			window.location.href = "index.html#home";
			});
	});
$( ":mobile-pagecontainer #home" ).on( "pagecontainershow", function( event, ui ) {
  alert( "This page was just hidden: " + ui.prevPage );
  $.post(localStorage.webhost+"notif_getlistof.php",{userid:localStorage.user_id})
		.done(function(result){
			var group_membership = JSON.parse(result);
			$("#notifs_list").empty();
			for (var i=0; i<group_membership.length; i++)
			{	//for every group the user is a member of 
				//fetch notifs
				var ul = $("<ul data-role='listview' data-theme='a'>");
				//$("#notifs_list").append(ul);
				$.post(localStorage.webhost+"notif_view.php",{groupid:group_membership[i].group_id})
					.done(function(data){
						var notifs = JSON.parse(data);
						for (var i=0; i<notifs.length; i++)
						{
							var li = $("<li><a href='#' style='text-decoration:none'>message: "	+notifs[i].payload+"</a></li>");
							ul.append(li);
							var li = $("<li><a href='#' style='text-decoration:none'>posted by: "	+notifs[i].username+"</a></li>");
							ul.append(li);
							var li = $("<li><a href='#' style='text-decoration:none'>posted on: "	+notifs[i].created_on+"</a></li>");
							ul.append(li);
							ul.append("<hr>");
						}
					});
				ul_close = $("</ul>");
				ul.append(ul_close);
				$("#notifs_list").append(ul);
				//$("#notifs_list").append("</ul>");
			}
			//$("#notifs_list").append("</ul>");
			window.location.href = "index.html#home";
			});
});

