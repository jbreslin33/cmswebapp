'use strict';

class DeletePersonScreen extends Screen
{
	constructor(application)
	{
                super(application);

                location.hash = 'delete_person_screen';

                this.setHtml(document.getElementById("delete_person_screen_html_id"));
                this.setMessageElement(document.getElementById("delete_person_screen_message_id"));
                this.setForm(document.getElementById("delete_person_screen_form_id"));
                this.setSpinner(document.getElementById("delete_person_screen_spinner_id"));

                this.getForm().addEventListener('submit', function(e)
                {
                        e.preventDefault();
                        APPLICATION.getCurrentScreen().hit();
                });

	}

	get()
	{
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_persons.php?" + this.getStandardParameters()); 
                APPLICATION.getCurrentScreen().ajax();
	}

	hit()
	{
		var select = document.getElementById("delete_person_screen_select_id");
                var delete_person_id = select.options[select.selectedIndex].value;
		
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/delete_person.php?" + this.getStandardParameters() + '&delete_person_id=' + delete_person_id);
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
}
