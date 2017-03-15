
function burgerMenu()
{
	//init burger menu
	$("[data-role=navbar]").navbar();
	$("[data-role=header]").toolbar();
	//format overlay panel menu items
	$(".overlaypanel_menu").listview();
}
//init overlay panel
//$( "#overlaypanel_user" ).panel();

$(".burger_menu").click(function(){
	//alert("ASDF");
	//$( "#overlaypanel_user" ).panel("open");
});