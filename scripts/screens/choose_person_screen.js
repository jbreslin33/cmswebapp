'use strict';

class ChoosePersonScreen extends Screen
{
	constructor(application)
	{
                super(application);

                location.hash = 'choose_person_screen';

                document.getElementById("choosepersonscreenbuttonid").onclick = this.hit.bind(this);

                this.setHtml(document.getElementById("choose_person_screen_html_id"));
                this.setMenuItem(document.getElementById("choose_person_nav_id"));
                this.setMessageElement(document.getElementById("choose_person_screen_message_id"));
                this.setForm(document.getElementById("choose_person_screen_form_id"));
                this.setSpinner(document.getElementById("choose_person_screen_spinner_id"));
	}

	get()
	{
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_persons.php?jwt=" + APPLICATION.getJWT()); 
                APPLICATION.getCurrentScreen().ajax();
	}

	hit()
	{
		this.mHit = true;

		//just send jwt authorization
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/choose_person.php?jwt=" + APPLICATION.getJWT());
                APPLICATION.getCurrentScreen().ajax();
	}

	enter()
	{
		super.enter();
               	this.hideNavigationBar();
	}
	exit()
	{
   		this.showNavigationBar();
		super.exit();
	}

	processPersons()
        {
                if (this.mJson.persons)
                {
                        //load up persons option
                        var select = document.getElementById("choose_person_screen_select_id");
                        select.length = 0;
			if (select.length > 0)
			{
				console.log('persons');
                        	for (var i = 0; i < this.mJson.persons.length; i++)
                        	{
                               		var opt = document.createElement('option');
                                	opt.value = this.mJson.persons[i].id;
                                	var full_name = this.mJson.persons[i].first_name + ' ' + this.mJson.persons[i].middle_name + ' ' + this.mJson.persons[i].last_name;
                                	opt.innerHTML = full_name;
                                	select.appendChild(opt);
                        	}
			}
			else
			{
				console.log('no persons');
                        	APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_PERSON_APPLICATION);
			}
		}
	}
}
