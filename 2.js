/* 
* Смарт контракт прикрепленный к голосованию для взаимодействия с blockchain 
*/ 
 
contract PollContract { 
 
 // Объект, хранящий информацию о вариантах ответа struct Poll { 
   bytes32 answer; 
   uint count; 
 } 
 
 Poll[] public polls;
 string public name;
 string public status; 
 
 // Событие извещающий о конце голосования event Voted( 
   address _from,
   string answer,
   string result 
 ); 
 
 // Конструктор голосования 
 function PollContract(string contractName) { 
   name = contractName;
   status = "active"; 
 } 
 
 // Метод для добавления варианта ответа 
 function addAnswer(bytes32 name) public {
   polls.push(Poll(name, 0)); 
 } 
 
 // Метод для голосования 
 function vote(bytes32 name) public {
   if (!isContract(msg.sender)) {
             return;
      }	  
      if (keccak256(status) == keccak256("active")) {
         for (uint i = 0; i <polls.length; i++) {
           if (name == polls[i].answer) {
             polls[i].count++;
             emit Voted(msg.sender, bytes32ToString(name), "success");
             return;        
           } 
        }
         emit Voted(msg.sender, bytes32ToString(name), "invalid answer");
   } else {
         emit Voted(msg.sender, bytes32ToString(name), "inactive"); 
   } 
} 
 
 // Метод для получения количества вариантов ответа 
 function getAnswersCount() view public returns(uint) {
    return polls.length; 
 } 
 
 // Метод для получения количества голосов 
 function getCounts(uint index) view public returns(string, uint) { 
    return (bytes32ToString(polls[index].answer), polls[index].count); 
 } 
 
 function bytes32ToString(bytes32 x) constant returns(string) {
    bytes memory bytesString = new bytes(32);
	uint charCount = 0;
	for (uint j = 0; j < 32; j++) {
    	byte char = byte(bytes32(uint(x) * 2 * * (8 * j)));
		if (char != 0) {
		  bytesString[charCount] = char;
		  charCount++;
		} 
	} 
	bytes memory bytesStringTrimmed = new bytes(charCount);
	for (j = 0; j <charCount; j++) {
	    bytesStringTrimmed[j] = bytesString[j];
	} 
	return string(bytesStringTrimmed); 
 } 
 
 function isContract(address addr) returns(bool) {
    uint size;
	assembly { 
	      size: = extcodesize(addr)
    } return size> 0;
 } 
} 