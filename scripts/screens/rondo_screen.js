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
		
		this.mId = null;

		//canvas
                this.mCanvas.width = 480;
                this.mCanvas.height = 270;

                //document.getElementById("rondo_screen_html_id").appendChild(this.mCanvas);

		//game objects
		this.mPitch = new Pitch(this);
		this.mPlayer = new Player(this.mPitch);

 
		//send for new client connection
		this.mWebSocket = new WebSocket('ws://127.0.0.1:8080/');

                this.mWebSocket.onopen = function ()
                {
			//1 for game 1 rondo and 2 for connect thus 12
			var message = '1,2,' + APPLICATION.getCurrentScreen().getPersonId(); 
                        APPLICATION.getCurrentScreen().mWebSocket.send('' + message);
                }

                this.mWebSocket.onmessage = function(event)
                {
			//show data
                        document.getElementById('rondo_screen_message_id').innerHTML = event.data;

			//process data
			APPLICATION.getCurrentScreen().mPitch.processData(event.data);
                }
	}

	update()
	{
		super.update();

		//now update pitch. pitch will update players
		if (this.mPitch)
		{
			this.mPitch.update();
		}
	}
        
	exit()
        {
                //this.removeDivs();
                super.exit();
        }

/*	
        removeDivs()
        {
                //remove pitch
		if (this.mPitch)
		{
			if (this.mPitch.mCanvas)
			{
                		this.mPitch.mCanvas.remove();
			}
		}
        }
	*/

	hit()
	{
                APPLICATION.getCurrentScreen().mWebSocket.send(document.getElementById('rondo_screen_outgoing_message_id').value);
	}
}
