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
                        
                this.setPersonSelect(document.getElementById("choose_person_screen_select_id"));

		this.mPersonsExists = -1;

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

		this.mApplication.mUserSelectedPerson = true;

		//set value of person select
		this.mApplication.getPersonSelect().value = this.getPersonSelect().value;

		this.mApplication.setAsideMessage('Welcome ' + this.mApplication.getPersonSelect().options[this.mApplication.getPersonSelect().selectedIndex].text, 'white');

	}

        execute()
        {
                this.processData();
		
		//do work here
                this.resetDataVariables();
		if (this.mPersonsExist == 0)
		{
                	APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_PERSON_APPLICATION);
		}
		else
		{
			//do nothing 
		}
        }

	exit()
	{
   		this.mApplication.showLoggedInHeaderHtml(true);
		super.exit();
	}
//you need to set person after processing persons to set whoever was chosen on choose screeen
	processPersons()
        {
                if (this.mJson.persons)
                {
                        //load up persons option
			var select = this.getPersonSelect();
			select.length = 0;
                        for (var i = 0; i < this.mJson.persons.length; i++)
                        {
                        	var opt = document.createElement('option');
                               	opt.value = this.mJson.persons[i].id;
                               	var full_name = this.mJson.persons[i].first_name + ' ' + this.mJson.persons[i].middle_name + ' ' + this.mJson.persons[i].last_name;
                               	opt.innerHTML = full_name;
                               	select.appendChild(opt);
			}
			this.mPersonsExist = select.length;
		}
	}
}
