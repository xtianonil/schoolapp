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
	/*
$( "#home" ).on( "pagecontainerload", function( event, ui ) {
	alert("pasok sa home");
});*/
/*
$( "a" ).on( "click", function( event ) {

	// Prevent the usual navigation behavior
	event.preventDefault();

	// Alter the url according to the anchor's href attribute, and
	// store the data-foo attribute information with the url
	$.mobile.navigate( $(this).attr( "href" ), {
		//foo: $(this).attr("data-foo")
	});

	// Hypothetical content alteration based on the url. E.g, make
	// an Ajax request for JSON data and render a template into the page.
	alterContent( $(this).attr("href") );
});
*/
/*
$(document).on('pagecontainerbeforeshow', function(e, ui) {
    var pageId = $('body').pagecontainer('getActivePage').prop('id');
    if (pageId === "home")
    {
    	getlistof_notifs();
    	//alert(pageId);
    	//$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html#home");
    	//$(document).pagecontainer( "change", "index.html#home",{ role: "page" });
    	//window.location.href = "index.html#home";
    	//$.mobile.changePage("index.html#home");
    }
});
*/
//$(document).delegate('#home', 'pageshow', function () {
//$(document).on('pagebeforeshow','#home',function(){
	//alert("pasok home");
	//window.location.href = "index.html#home";

$(document).on('pagecontainerbeforeshow', function (e, ui) {
	var ThisPage = $(':mobile-pagecontainer').pagecontainer('getActivePage').attr('id');
	//alert(ThisPage);
  switch(ThisPage){

    case 'admin_panel':
    case 'home':
    	getlistof_notifs();
    	//alert("ASF");
    	//$(":mobile-pagecontainer").pagecontainer("change", "index.html#home", {reload: true});
    	//$("body").pagecontainer("change", "index.html#home", {reload: true});
    	//$(document).pagecontainer("change", "#home", {reload: true});
    	//location.href = "index.html#home";
    	//$(document).pagecontainer( "load" );
    	break;
    case 'Page2':

    case 'Page3':
	}
});
//location.reload();

//
/*
$(document).on('pagebeforeshow','#home',function(){
	getlistof_notifs();
	});
	*/
function getlistof_notifs()
{
	$.post(localStorage.webhost+"notif_getlistof.php",{userid:localStorage.user_id})
		.done(function(result){
			//alert(result);
			//restrict access
			/*
			if (localStorage.user_type === "school_admin")
				$(".admin_only").show();
			else
				$(".admin_only").hide();
			*/
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
							var li = $("<li><h3>"				+notifs[i].payload+"</h3></li>");
							ul.append(li);
							var li = $("<li><h5>posted by: "	+notifs[i].username+" (<font color='red'>"+notifs[i].created_on+"</font>)</h5></li>");
							ul.append(li);

							//var li = $("<h5>posted on: "	+notifs[i].created_on+"</h5>");
							//ul.append(li);
							ul.append("<hr>");
							$("#notifs_list2").append(ul);
						}
						//alert(notifs.length);
					});
				//ul_close = $("</ul>");
				//ul.append(ul_close);
				//$("#notifs_list").append("ASDF");
				//$("#notifs_list").append("</ul>");
			}
			//$("#notifs_list").append("</ul>");
			//window.location.href = "index.html#home";
			//$(document).pagecontainer( "change", "index.html#home",{reload: true});
			//location.reload();
			//$( ":mobile-pagecontainer" ).pagecontainer("change", "#home", {  reload : true, allowSamePageTransition : true, transition : "none" });
			});
		/*
		$("#footer_div").empty();
		var logout = $("<h5> (<a href='#' id='logout'> logout </a>)</h5>");
		logout.prepend("signed in as: "+localStorage.username);
		$("#footer_div").append(logout);
		$("#logout").click(function(){
			localStorage.clear();
			window.location.href = "index.html#not_logged_in";
			location.reload();
			$("#login").html('Login');
			});
			*/
}
/*
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
});*/

