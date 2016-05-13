function validar(){
	var nombre, password, email, expresion;
	nombre = document.getElementById("username").value;
	password = document.getElementById("passwd").value;
	email = document.getElementById("mail").value;

	expresion = /\w+@\w+\.+[a-z]/;

	if(nombre === "" || nombre.lenght>10)
	{
		document.getElementById("usererror").style.display = "block";
		return false;
	}
	else 
	{
		document.getElementById("usererror").style.display = "none";
	}
	if(password === "" || password.lenght>50)
	{
		document.getElementById("passerror").style.display = "block";
		return false;
	}
	else 
	{
		document.getElementById("passerror").style.display = "none";
	}
	if(email === "" || email.lenght>50)
	{
		document.getElementById("emailerror").style.display = "block";
		return false;
	}
	else 
	{
		document.getElementById("emailerror").style.display = "none";
	}
	if(!expresion.test(email))
	{
		document.getElementById("emailerror").style.display = "block";
		return false;
	}
	else 
	{
		document.getElementById("emailerror").style.display = "none";
	}

}