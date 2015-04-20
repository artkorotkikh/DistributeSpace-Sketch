/*
* Sketch-DistributeWithSpace plugin for Sketch.app
* Author: Artem Korotkikh
* Version: 1.0
*/

function distributeSpace(direction){
	if([selection count] < 2){
		  [doc showMessage:"Please select 2 or more layers."]
	}
	else
	{

		var minYs = []
		var minXs = []
		for (var i=0; i < [selection count]; i++){
			var layer = selection[i];

			minY = [[layer frame] minY];
			minX = [[layer frame] minX];
			minYs.push([minY, i]);
			minXs.push([minX, i]);

		}

		var sortirator = function(a, b){
				var x=a[0];
				var y=b[0];
				return x-y;
		}

		var result = getSpace('Set spacing')
		if(result[0] == 1000)
		{
			var space = result[1];
			switch (direction){
				case "vertical":

					minYs.sort(sortirator);

					for (var i=0; i < minYs.length - 1 ; i++)
					{
						frame0= [[selection objectAtIndex:minYs[i][1]] frame]
						frame1 = [[selection objectAtIndex:minYs[i+1][1]] frame]

						[frame1 setMinY: [frame0 maxY] + space]
					}



					break;
				case "horizontal":

					minXs.sort(sortirator);

					for (var i=0; i < minXs.length - 1 ; i++)
					{
						frame0= [[selection objectAtIndex:minXs[i][1]] frame]
						frame1 = [[selection objectAtIndex:minXs[i+1][1]] frame]

					  	[frame1 setMinX: [frame0 maxX] + space]
					}

					break;
			}

		}
	}
}


function getSpace(msg)
{
	var accessory = [[NSTextField alloc] initWithFrame:NSMakeRect(0,0,200,25)]
	var alert = [[NSAlert alloc] init]
 	[alert setMessageText:msg]
  	[alert addButtonWithTitle:'OK']
  	[alert addButtonWithTitle:'Cancel']
  	[alert setAccessoryView:accessory]

	var result = [alert runModal]
  	var val = [accessory intValue]

  	return [result, val];
}
