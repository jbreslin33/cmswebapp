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

        get()
        {
                var club_select = document.getElementById("club_select_id");

                if (club_select.length)
                {
                        var club_id = club_select.options[club_select.selectedIndex].value;

                        if (this.mApplication.mJWT)
                        {
                                var url = "/php/classes/select/select_pitches.php?jwt=" + APPLICATION.mJWT + '&club_id=' + club_id;
                                var request = new XMLHttpRequest();
                                request.onreadystatechange = function()
                                {
                                        if (request.readyState === XMLHttpRequest.DONE)
                                        {
                                                if (request.status === 200)
                                                {
                                                        console.log('response:' + this.responseText);
                                                        APPLICATION.mInsertPracticeScreen.mData = this.responseText;
                                                }
                                        }
                                };
                                request.open('POST', url);
                                request.send();
                        }
                }
        }

}
