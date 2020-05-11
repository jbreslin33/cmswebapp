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
