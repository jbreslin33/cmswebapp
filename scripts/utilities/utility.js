'use strict';

class Utility
{
        constructor()
        {

        }

	removeOptions(selectbox)
	{
    		var i;
    		for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    		{
        		selectbox.remove(i);
    		}
	}

	getJson(data)
	{
		var jsonString = data.slice(6,data.length);
		return JSON.parse(jsonString);
	}

	getCode(data)
	{
         	var dataArray = data.split(",");
                return dataArray[0];
	}
}
