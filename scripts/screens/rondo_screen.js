'use strict';

class RondoScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'rondo_screen';

          	this.setHtml(document.getElementById("rondo_screen_html_id"));
                this.setMessageElement(document.getElementById("rondo_screen_message_id"));
          	this.setForm(document.getElementById("rondo_screen_form_id"));
          	this.setSpinner(document.getElementById("rondo_screen_spinner_id"));

               	this.getForm().addEventListener('submit', function(e)
                {
                        e.preventDefault();
                        APPLICATION.getCurrentScreen().hit();
                });

		document.getElementById("rondoscreensendbuttonid").onclick = this.hit.bind(document.getElementById("rondoscreensendbuttonid"));

 
		//send for new client connection
		this.mWebSocket = new WebSocket('ws://127.0.0.1:8080/');

                this.mWebSocket.onopen = function ()
                {
                        APPLICATION.getCurrentScreen().mWebSocket.send('2');
                }

                this.mWebSocket.onmessage = function(event)
                {
                        document.getElementById('rondo_screen_message_id').innerHTML = event.data;
                        //document.getElementById('rondo_screen_message_id').value='';
                }
	}
	
	hit()
	{
		/*
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/rondo.php?" + this.getStandardParameters()); 
		APPLICATION.getCurrentScreen().ajax();
		*/
		console.log('hit the hit');
		//rondo_screen_outgoing_message_id
                APPLICATION.getCurrentScreen().mWebSocket.send('1');
                //APPLICATION.getCurrentScreen().mWebSocket.send(document.getElementById('rondo_screen_outgoing_message_id').innerHTML);
	
	}
}
