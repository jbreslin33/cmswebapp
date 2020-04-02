'use strict';

class RondoScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'rondo_screen';

		this.mWebSocket = null;

          	this.setHtml(document.getElementById("rondo_screen_html_id"));
                this.setMessageElement(document.getElementById("rondo_screen_message_id"));
          	this.setForm(document.getElementById("rondo_screen_form_id"));
          	this.setSpinner(document.getElementById("rondo_screen_spinner_id"));

               	this.getForm().addEventListener('submit', function(e)
                {
                        e.preventDefault();
                        APPLICATION.getCurrentScreen().hit();
                });
 
		document.getElementById("rondoscreenjoinbuttonid").onclick = this.hitJoinRondo.bind(document.getElementById("rondoscreenjoinbuttonid"));

	}
	/*
	                                  <div id="rondo_screen_spinner_id" class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Loading...</span>
                                        </div>

                                        <label for="rondo_name_id">Message to other Players:</label>
                                        <input type="text" id="rondo_screen_outgoing_message_id">
                                        <button id="rondoscreensendbuttonid">Send Message</button>

                                        <span id='rondo_screen_message_id'></span>

                                        <button id="rondoscreenjoinbuttonid">Join Rondo</button>
*/

	hit()
	{
      		//var name  = document.getElementById("rondo_screen_name_id").value;
               	//var address = document.getElementById("rondo_screen_address_id").value;
	
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/rondo.php?" + this.getStandardParameters()); 
		APPLICATION.getCurrentScreen().ajax();
	}

	hitJoinRondo()
	{
		APPLICATION.getCurrentScreen().mWebSocket = new WebSocket('ws://127.0.0.1:8080/');

        	APPLICATION.getCurrentScreen().mWebSocket.onopen = function ()
        	{
        		//this.send('2'); //2 is connect new client code
        		APPLICATION.getCurrentScreen().mWebSocket.send('2');
        	}

        	APPLICATION.getCurrentScreen().mWebSocket.onmessage = function(event)
        	{
        		document.getElementById('rondo_screen_outgoing_message_id').innerHTML = event.data;
               		document.getElementById('rondo_screen_message_id').value='';
        	}
	}
/*
        send()
       	{ 
        	//this.mWebSocket.send(document.getElementById('outMsg').value);
        }
	*/

}
