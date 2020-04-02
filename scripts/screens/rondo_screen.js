'use strict';

class RondoScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'rondo_screen';

          	this.setHtml(document.getElementById("rondo_screen_html_id"));
                this.setMessageElement(document.getElementById("rondo_screen_message_id"));
          	this.setForm(document.getElementById("rondo_screen_form_id"));
          	this.setSpinner(document.getElementById("rondo_screen_spinner_id"));

               	this.getForm().addEventListener('submit', function(e)
                {
                        e.preventDefault();
                        APPLICATION.getCurrentScreen().hit();
                });
	}

	hit()
	{
      		//var name  = document.getElementById("rondo_screen_name_id").value;
               	//var address = document.getElementById("rondo_screen_address_id").value;
	
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/rondo.php?" + this.getStandardParameters()); 
		APPLICATION.getCurrentScreen().ajax();
	}
}
