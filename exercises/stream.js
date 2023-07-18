var stream1; //readable 
var stream2; //writeable

// essentially the pattern is, that you pass in a readable stream to a writable stream
// and then you can read from the writable stream, and then you can just keep chaining them together

var stream3 = stream1.pipe(stream2); //readable 




