'use strict';

class SideScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'side_screen';

          	this.setHtml(document.getElementById("side_screen_html_id"));
	}
        enter()
        {
                this.setMessage('','red');
                this.show();
                this.showFooter();
                this.hideCanvas();
                this.get();

		this.handleButtons();

        }

	handleButtons()
	{
		console.log('called handle buttons array length: ' + this.mApplication.mPersonArray.length);
		//loop throu array
		for (var i = 0; i < this.mApplication.mPersonArray.length; i++)
		{
			if (this.mApplication.mPersonArray[i].mId == this.getPersonId())
			{
				console.log('calling handle but on personID: ' + this.getPersonId());
				console.log('calling handle but on managerId: ' + this.mApplication.mPersonArray[i].mManagerId  );
				if (this.mApplication.mPersonArray[i].mManagerId == null) 
				{
          				document.getElementById("side_managers_id").style.display = "none";
					console.log('hide but');
				}
				else
				{
                			document.getElementById("side_managers_id").style.display = "block";
                			document.getElementById("side_managers_id").style.visibility = "visible";
					console.log('show but');
				}
			}
		}
	}

        execute()
        {
                this.processData();
                this.resetDataVariables();
        }

        exit()
        {
                this.hide();
                this.hideFooter();
                this.resetDataVariables();
                this.mApplication.setSideScreen(null);
        }


}
