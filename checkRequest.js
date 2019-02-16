const checkRequest = (request)=>{
    // check if request found and all propertys
    if(request && request.body && request.body.fromDate && request.body.toDate && request.body.city && request.body.numberOfAdults){
        // check fromDate 
        let fromDateCheckResult=checkDate(request.body.fromDate);
        if(typeof fromDateCheckResult==="string"){
            return `Error fromDate : ${fromDateCheckResult} `;
        }
        // check toDate     
        let toDateCheckResult=checkDate(request.body.toDate);
        if(typeof toDateCheckResult==="string"){
            return `Error toDate : ${toDateCheckResult} `;
        }
    
        if(request.body.city!=="AUH"){
            return `Error city : request city not equal IATA code (AUH)`;
        }
        // check numberOfAdults should be number and equal 1 or more         
        if(typeof request.body.numberOfAdults!==Number && request.body.numberOfAdults<1){
            return `Error numberOfAdults : make sure it's number and vaild ${typeof request.body.numberOfAdults}`;
        }
        return true;
    }else{
        return 'Error : request data not found or property noy found';
    }
}

const checkDate=(date)=>{
    // check if coming date is equal ISO
    if(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(date)){
        var dateType = new Date(date); 
        if(dateType.toISOString()===date){
            return true;
        }else{
            return 'Wrong type date , should be ISO date type';
        }
    }else{
        return 'Wrong type date , should be ISO date type' ;
    }

}

exports.checkRequest = checkRequest;