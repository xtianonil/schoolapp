$("#overlaypanel_userdetails").empty();
//$("#overlaypanel_userdetails").append("<ul class='userloggedin' data-role='listview' data-icon='false'><li>Logged in as:</li><li>"+localStorage.name+"</li></ul>");
$("#overlaypanel_userdetails").append("<ul class='userloggedin' data-role='listview' data-icon='false'><li>Logged in as: "+localStorage.uname+"</li></ul>");
$("#overlaypanel_userdetails").trigger("create");
$(".userloggedin ul").listview("refresh");