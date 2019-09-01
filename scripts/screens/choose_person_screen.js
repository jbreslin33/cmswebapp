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

		var select = document.getElementById("choose_person_screen_select_id");
                var person_id = select.options[select.selectedIndex].value;
		
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/choose_person.php?name=" + "&jwt=" + APPLICATION.getJWT() + '&person_id=' + person_id);
                APPLICATION.getCurrentScreen().ajax();
	}

	processPersons()
        {
		super.processPersons();
                if (this.mJson.persons)
                {
                        //load up persons option
                        var select = document.getElementById("choose_person_screen_select_id");
                        select.length = 0;
                        for (var i = 0; i < this.mJson.persons.length; i++)
                        {
                                var opt = document.createElement('option');
                                opt.value = this.mJson.persons[i].id;
                                var full_name = this.mJson.persons[i].first_name + ' ' + this.mJson.persons[i].middle_name + ' ' + this.mJson.persons[i].last_name;
				console.log('full_name:' + full_name);
                                opt.innerHTML = full_name;
                                select.appendChild(opt);
                        }
                }
	}
}
