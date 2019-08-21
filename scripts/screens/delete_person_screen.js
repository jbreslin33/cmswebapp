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
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_persons.php?jwt=" + APPLICATION.getJWT()); 
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

	processPersons()
        {
		if (this.mJson)
		{
               		if (this.mJson.persons)
               		{
               			//load up persons option
                       		var select = document.getElementById("person_select_id");
                       		select.length = 0;
                       		for (var i = 0; i < this.mJson.persons.length; i++)
                       		{
                       		       	var opt = document.createElement('option');
                               		opt.value = this.mJson.persons[i].id;
                                	var full_name = this.mJson.persons[i].first_name + ' ' + this.mJson.persons[i].middle_name + ' ' + this.mJson.persons[i].last_name;
                                	opt.innerHTML = full_name;
                                	select.appendChild(opt);
                        	}
                	}
                	if (this.mJson.persons)
                	{
                		//load up persons option
                		var select = document.getElementById("delete_person_screen_select_id");
                                select.length = 0;
                                for (var i = 0; i < this.mJson.persons.length; i++)
                                {
                                        var opt = document.createElement('option');
                                        opt.value = this.mJson.persons[i].id;
                                        var full_name = this.mJson.persons[i].first_name + ' ' + this.mJson.persons[i].middle_name + ' ' + this.mJson.persons[i].last_name;
                                        opt.innerHTML = full_name;
                                        select.appendChild(opt);
                                }
                        }
		}
        }

        processCodes()
        {
		/*
                if (this.mJson.codes)
                {
                        var code = 0;
                        for (var i = 0; i < this.mJson.codes.length; i++)
                        {
                                code = this.mJson.codes[i].code;
                        }
                }
		*/
        }
}
