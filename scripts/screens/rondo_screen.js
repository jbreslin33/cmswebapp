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

		this.mPitch = new Pitch(this);
		this.mPlayer = new Player(this.mPitch);
	}
        
	exit()
        {
                this.removeDivs();
                super.exit();
        }
	
        removeDivs()
        {
                //remove pitch
                this.mPitch.mCanvas.remove();
        }

	hit()
	{
		console.log('hit the hit');
                APPLICATION.getCurrentScreen().mWebSocket.send(document.getElementById('rondo_screen_outgoing_message_id').value);
	}
}
