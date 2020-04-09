'use strict';

class Pitch
{
        constructor(screen)
        {
		this.mScreen = screen;
		//console.log("new pitch");
		
		//width and height for this canvas
		screen.mCanvas.width = 480;
		screen.mCanvas.height = 270;

		//document.body.insertBefore(this.mCanvas,document.body.childNodes[0]);
		document.getElementById("rondo_screen_html_id").appendChild(screen.mCanvas);

		this.mFrameNumber = 0;
		this.mInterval = setInterval(this.update,20);

		this.mClient = new Client();

		this.mPlayerArray = new Array();

			
		this.mPlayerArray.push(new Player(1,this,30,30,'#87CEEB'));
		this.mPlayerArray.push(new Player(2,this,400,30,'#87CEEB'));
		this.mPlayerArray.push(new Player(3,this,30,200,'#87CEEB'));

		this.mPlayerArray.push(new Player(4,this,200,150,'red'));

	}
	processData(data)
	{
		var dataArray = data.split(',');

		if (dataArray[1] == '1')
		{
			this.processMoves(dataArray);
		}
		if (dataArray[1] == '2')
		{
			this.processJoin(dataArray);
		}
	}
	processJoin(dataArray)
	{
		APPLICATION.getCurrentScreen().mPitch.mClient.mId = dataArray[2];
                console.log('you connected and your id is:' + APPLICATION.getCurrentScreen().mPitch.mClient.mId);
	}

	processMoves(dataArray)
	{
		//APPLICATION.getCurrentScreen().mPitch.mClient.mId = dataArray[2];



		

	}

	update()
	{
		//APPLICATION.getCurrentScreen().mPitch.mPlayerArray();
		//get this clients player move
		if (APPLICATION.getCurrentScreen().mPitch.mClient)
		{
			//console.log('client mID:' + this.mClient.mId);
			var message = '1,1,' + APPLICATION.getCurrentScreen().mPitch.mClient.mId + ','; 
			if (APPLICATION.mUpPressed == true)
			{
				message += '1';	
			}
			else
			{
				message += '0';	
			}

			message = message + ',';

			if (APPLICATION.mRightPressed == true)
			{
				message += '1';	
			}
			else
			{
				message += '0';	
			}

			message = message + ',';

			if (APPLICATION.mDownPressed == true)
			{
				message += '1';	
			}
			else
			{
				message += '0';	
			}

			message = message + ',';

			if (APPLICATION.mLeftPressed == true)
			{
				message += '1';	
			}
			else
			{
				message += '0';	
			}

			message = message + ',';


  			if (APPLICATION.getCurrentScreen().mWebSocket)
			{
  				APPLICATION.getCurrentScreen().mWebSocket.send('' + message);
			}
		}

		//update player 
		if (APPLICATION.getCurrentScreen().mPitch)
		{
			for (var i = 0; i <  APPLICATION.getCurrentScreen().mPitch.mPlayerArray.length; i++)
			{
				APPLICATION.getCurrentScreen().mPitch.mPlayerArray[i].update();
			}
		}
		APPLICATION.getCurrentScreen().mPitch.mClient.update();
	}

}

