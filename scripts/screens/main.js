'use strict';

class Main extends Screen
{
        constructor(application)
        {
                super(application);

                location.hash = "main_screen";

                //html ids 
                this.mSpinnerId = "main_screen_spinner_id";
                this.mHtmlId = "main_screen_html_id";

                //document.getElementById("mainscreenbuttonid").onclick = this.hit.bind(this);
        }
}
