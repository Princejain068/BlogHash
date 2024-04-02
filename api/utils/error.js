export const errorHandler = (statuscode,Message)=>{
    const error = new Error();
    error.statusCode= statuscode;
    error.message = Message;
    return error; 
}