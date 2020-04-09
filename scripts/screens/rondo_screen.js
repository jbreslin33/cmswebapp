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

		//document.getElementById("rondoscreensendbuttonid").onclick = this.hit.bind(document.getElementById("rondoscreensendbuttonid"));
		document.getElementById("rondoscreenfullbuttonid").onclick = this.hitFullScreen.bind(document.getElementById("rondoscreenfullbuttonid"));
		
		//canvas
                this.mCanvas.width = 480;
                this.mCanvas.height = 270;

		//game objects
		this.mPitch = new Pitch(this);
 
		//websocket
		this.mWebSocket = null;

	}

	hitFullScreen()
	{
		//lets go full screen
		var canvas = APPLICATION.getCurrentScreen().getCanvas(); 

		if (canvas.requestFullscreen) 
		{
    			canvas.requestFullscreen();
  		} 
		else if (canvas.mozRequestFullScreen) 
		{ /* Firefox */
    			canvas.mozRequestFullScreen();
  		} 
		else if (canvas.webkitRequestFullscreen) 
		{ /* Chrome, Safari & Opera */
    			canvas.webkitRequestFullscreen();
  		} 
		else if (canvas.msRequestFullscreen) 
		{ /* IE/Edge */
    			canvas.msRequestFullscreen();
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

	enter()
	{
		super.enter();
		this.hideFooter();
		this.showCanvas();
		this.initializeWebSocket();
	}

	initializeWebSocket()
	{
		this.mWebSocket = new WebSocket('ws://127.0.0.1:8080/');

                this.mWebSocket.onopen = function ()
                {
			//1 for game 1 rondo and 2 for connect thus 12
			//var message = '1,2,' + APPLICATION.getCurrentScreen().getPersonId() + ','; 
                        //APPLICATION.getCurrentScreen().mWebSocket.send('' + message);
                }

                this.mWebSocket.onmessage = function(event)
                {
			//show data
                        //document.getElementById('rondo_screen_message_id').innerHTML = event.data;

			//process data
			APPLICATION.getCurrentScreen().mPitch.processData(event.data);
                }
	}
        
	exit()
        {
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
                //APPLICATION.getCurrentScreen().mWebSocket.send(document.getElementById('rondo_screen_outgoing_message_id').value);
	}
}
