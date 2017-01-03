if ( localStorage.login === "true" )
{
	if ( localStorage.is_admin === "true" )
	{
		window.location.href = "index.html#admin_panel";
		//alert("SDF");
	}
	else
	{
		window.location.href = "index.html#home";
	}
	//location.reload();
}