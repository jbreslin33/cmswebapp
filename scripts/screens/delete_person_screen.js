'use strict';

class DeletePersonScreen extends Screen
{
	constructor(application)
	{
                super(application);

                location.hash = 'delete_person_screen';

                document.getElementById("deletepersonscreenbuttonid").onclick = this.hit.bind(this);

                this.setHtml(document.getElementById("delete_person_screen_html_id"));
                this.setMenuItem(document.getElementById("delete_person_nav_id"));
                this.setMessageElement(document.getElementById("delete_person_screen_message_id"));
                this.setForm(document.getElementById("delete_person_screen_form_id"));
                this.setSpinner(document.getElementById("delete_person_screen_spinner_id"));
	}

	get()
	{
		console.log('get is called in delete');
		APPLICATION.getCurrentScreen().setUrl("/php/classes/select/select_persons.php?jwt=" + APPLICATION.getJWT()); 
                APPLICATION.getCurrentScreen().ajax();
	}


	hit()
	{
		this.mHit = true;

		var select = document.getElementById("delete_person_screen_select_id");
                var person_id = select.options[select.selectedIndex].value;
		
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/delete_person.php?name=" + "&jwt=" + APPLICATION.getJWT() + '&person_id=' + person_id);
                APPLICATION.getCurrentScreen().ajax();
	}

        execute()
        {
                this.processData();

                if (this.mJson)
                {
                        if (this.mJson.persons)
                        {
				console.log('fill select');

                                //this.mApplication.mStateMachine.changeState(this.mApplication.mMAIN_APPLICATION);
                        }
                }

                if (this.mJson && this.mHit)
                {
                        if (this.mJson.persons)
                        {
                                this.mApplication.mStateMachine.changeState(this.mApplication.mMAIN_APPLICATION);
                        }
                }
               
		this.mCode = 0;
                this.mData = null;
                this.mJson = null;

        }
}
