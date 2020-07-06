'use strict';

class ChoosePersonScreen extends Screen
{
	constructor(application)
	{
                super(application);

                location.hash = 'choose_person_screen';

                this.setHtml(document.getElementById("choose_person_screen_html_id"));
                this.setMessageElement(document.getElementById("choose_person_screen_message_id"));
                this.setForm(document.getElementById("choose_person_screen_form_id"));
                this.setSpinner(document.getElementById("choose_person_screen_spinner_id"));
                        
                this.setFamilySelect(document.getElementById("choose_person_screen_family_select_id"));
                this.setPersonSelect(document.getElementById("choose_person_screen_select_id"));

		this.mPersonsExists = -1;
		this.mFamiliesExists = -1;

                this.getForm().addEventListener('submit', function(e)
                {
                        e.preventDefault();
                        APPLICATION.getCurrentScreen().hit();
                });
	}

	get()
	{
		console.log('ChoosePersonScreen::get()');
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_families.php?jwt=" + APPLICATION.getJWT()); 
                APPLICATION.getCurrentScreen().ajax();
	}

	getPersons()
	{
		console.log('ChoosePersonScreen::getPersons()');
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_persons.php?" + this.getStandardParameters()); 
                APPLICATION.getCurrentScreen().ajax();
	}

	hit()
	{
		console.log('ChoosePersonScreen::hit()');
		//set value of person select
		this.mApplication.getPersonSelect().value = this.getPersonSelect().value;

		//why are we sending to server????
		//just send jwt authorization
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/choose_person.php?" +  this.getStandardParameters());
                APPLICATION.getCurrentScreen().ajax();

		this.mApplication.mUserSelectedPerson = true;


		//this.mApplication.setAsideMessage('Welcome ' + this.mApplication.getPersonSelect().options[this.mApplication.getPersonSelect().selectedIndex].text, 'white');

		//need to call db here as well.....

	}
	enter()
	{
   		this.mApplication.showLoggedInHeaderHtml(false);
		super.enter();
	}

        execute()
        {
		super.execute();

		if (this.mFamiliesExist == 0)
		{
                	//APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_FAMILY_APPLICATION);
		}
        }

	exit()
	{
   		this.mApplication.showLoggedInHeaderHtml(true);
		super.exit();
	}

        processFamilies()
        {

                if (this.mJson.families)
                {
			console.log('ChoosePersonScreen::processFamilies() families json exists');
                        //load up persons option
                        var select = this.getFamilySelect();
                        select.length = 0;
                        for (var i = 0; i < this.mJson.families.length; i++)
                        {
                                var opt = document.createElement('option');
                                opt.value = this.mJson.families[i].id;
                                var name = this.mJson.families[i].name + ' Family';
                                opt.innerHTML = name;
                                select.appendChild(opt);
                        }
                        this.mFamiliesExist = select.length;
		
			this.mApplication.getFamilySelect().value = this.getFamilySelect().value;

			this.getPersons();
                }
        }

//you need to set person after processing persons to set whoever was chosen on choose screeen
	processPersons()
        {
		//parent will handle application persons select

                if (this.mJson.persons)
                {
			super.processPersons();

			console.log('ChoosePersonScreen::processPersons() persons json exits');
                        //load up persons option
			var select = this.getPersonSelect();
			select.length = 0;
			this.mApplication.mPersonArray.length = 0;			
                        for (var i = 0; i < this.mJson.persons.length; i++)
                        {
                        	var opt = document.createElement('option');
                               	opt.value = this.mJson.persons[i].id;
                               	var full_name = this.mJson.persons[i].first_name + ' ' + this.mJson.persons[i].middle_name + ' ' + this.mJson.persons[i].last_name;
                               	opt.innerHTML = full_name;
                               	select.appendChild(opt);


				this.mApplication.mPersonArray.push(new Person(this.mJson.persons[i].id, this.mJson.persons[i].first_name, this.mJson.persons[i].middle_name, this.mJson.persons[i].last_name, this.mJson.persons[i].player_id, this.mJson.persons[i].parent_id, this.mJson.persons[i].coach_id, this.mJson.persons[i].manager_id, this.mJson.persons[i].administrator_id));

			}
			this.mPersonsExist = select.length;
			
			this.mApplication.getPersonSelect().value = this.getPersonSelect().value;
		
			if (this.mPersonsExist == 0)
			{
                		//APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_PERSON_APPLICATION);
			}
		}
	}
}
