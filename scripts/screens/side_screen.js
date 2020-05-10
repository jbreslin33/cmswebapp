'use strict';

class SideScreen extends Screen
{
	constructor(application)
	{
		super(application);

		//location.hash = 'side_screen';
		//insert_team_screen
		location.hash = 'side_screen';

		console.log("SideScreen Constructor");

          	this.setHtml(document.getElementById("side_screen_html_id"));
                //this.setMessageElement(document.getElementById("side_screen_message_id"));
          	//this.setForm(document.getElementById("side_screen_form_id"));
          	//this.setSpinner(document.getElementById("side_screen_spinner_id"));
/*
               	this.getForm().addEventListener('submit', function(e)
                {
                        e.preventDefault();
                        APPLICATION.getCurrentScreen().hit();
                });
		*/
	}
        enter()
        {
                this.setMessage('','red');
                this.show();
                this.showFooter();
                this.hideCanvas();
                this.get();
        }

        execute()
        {
                this.processData();
                this.resetDataVariables();
        }

        exit()
        {
                this.hide();
                this.hideFooter();
                this.resetDataVariables();
                this.mApplication.setSideScreen(null);
        }


	get()
        {
		/*
        	if (APPLICATION.getJWT())
                {
                        APPLICATION.getSideScreen().setUrl("/php/classes/screens/select_roles.php?" + this.getStandardParameters());
                        APPLICATION.getSideScreen().ajax();
                }
		*/
        }
}
