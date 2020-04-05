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
			//show data
                        document.getElementById('rondo_screen_message_id').innerHTML = event.data;

			var d = event.data;
			var code_string = d.substring(0,1)
			console.log('code_string:' + code_string);

			//process data
			
			//you connected...
			if (code_string == '2')
			{
				var id_string = d.substring(1,6)
				if (APPLICATION.getCurrentScreen().mPitch.mClient.mId == 0)
				{
					APPLICATION.getCurrentScreen().mPitch.mClient.mId = id_string;
					console.log('you connected and your id is:' + id_string);
				}
				else //someone else connected
				{
					console.log('another clientu connected and their id is:' + id_string);
				}
				
			}
                }
		this.mId = null;

		//canvas
                this.mCanvas.width = 480;
                this.mCanvas.height = 270;

                //document.getElementById("rondo_screen_html_id").appendChild(this.mCanvas);

		//game objects
		this.mPitch = new Pitch(this);
		this.mPlayer = new Player(this.mPitch);
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
