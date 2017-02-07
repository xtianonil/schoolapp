//taken from https://github.com/luis-kaufmann-silva/jquery-p2r

//Notifications feed
$(".pullable_div.notifs_feed").on("refresh.pulltorefresh", function (evt, percent)
{
	//alert("notfs feed pulled");
	$("#notifs_list").empty();
	showNotifs();
});

//Groups tab
$(".pullable_div.groups_tab").on("refresh.pulltorefresh", function (evt, percent)
{
	//alert("groups tab pulled");
	$("#notifs_list").empty();
	showNotifs();
});