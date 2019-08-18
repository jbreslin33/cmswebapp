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
/*
        execute()
        {
                this.processData();

                if (this.mJson && this.mHit)
                {
                        if (this.mJson.persons)
                        {
                                this.mApplication.mStateMachine.changeState(this.mApplication.mMAIN_APPLICATION);
                        }
                }
              
		this.resetDataVariables();
        }
*/
	/*
	processJsonData()
	{
               if (this.mJson.persons)
               {
                	//load up persons for delete option
                        console.log('got persons in delete');
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
	*/
}
