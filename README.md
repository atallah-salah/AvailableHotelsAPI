# AvailableHotelsAPI
AvailableHotelsAPI is a hotel search solution that look into many providers and display results
from all the available hotels, for now we are aggregate from 2 providers: “BestHotels” &amp;
“CrazyHotel”

#Document :
AvailableHotelsAPI have nodeJS server and it's have a json file with all provider you can add any provider and nodeJS server should handle it if have same request data , each provider have property with active:true or false so we can stop using "BestHotels" provider if we see any problem with it , also have checkRrequest JS file used for check request before send request to any provider.

#Note:
  *npm install
  *code not coverd by unit test
