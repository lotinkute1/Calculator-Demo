var numbers =document.querySelectorAll(".number .btn");//lấy ra mảng các nút thuộc cụm number
var operations =document.querySelectorAll(".operation .btn");//lấy ra mảng các nút thuộc cụm phép tính
var result =document.getElementById("result");//lấy ra div hiển thị kết quả
var logHistory=document.getElementsByClassName("loghistory");//lấy ra div hiển thị lịch sử tính toán
var result_history=document.querySelector(".result-history");//lấy ra div hiển thị lịch sử của phép tính gần nhất
var historyList=[];//mảng để lưu lịch sử tính toán
var expressionData="";//biến chuổi để lưu biểu thức gần nhất (ví dụ: 2 + 6), sẽ thay đổi mỗi khi equal() chạy
var resultData="";//biến chuổi để lưu biểu thức gần nhất (ví dụ: 8), sẽ thay đổi mỗi khi equal() chạy

for(let number of numbers){
    number.addEventListener('click',function(){     //lắng nghe sự kiện click của các nút thuộc cụm number
        if(result.innerHTML=="0"||result.innerHTML==resultData){//nêu khi bấm vào number mà ô kết quả đang chứa 0 hoặc là kết quả của phép tính trước 
            resultData="";// thì clear ô kết quả 
            result.innerHTML=this.getAttribute('value');//và gán number vừa bấm vào
        } 
        else result.innerHTML+=this.getAttribute('value');// nêu không thì thêm number vào bình thường
    });
}
for(let operation of operations){
    operation.addEventListener('click',function(){     //lắng nghe sự kiện click của các nút thuộc cụm operations
        if(!['+', '-', '*' , '/'].includes(result.innerHTML[result.innerHTML.length-1]) && !['DEL','AC'].includes(this.getAttribute("value"))){//câu lệnh if này để kiểm tra xem có toán tử chưa nếu có rồi thì không cho thêm nữa (tránh ++++ hoặc ----///***) 
            if(check_operations_in_array(['+', '-', '*' , '/'],result.innerHTML)){//câu if này giúp chặn việc có trên 1 phép tính trong ô result
                equal();//cho phép tính hiện tại trong result tính ra đáp án
                result.innerHTML+=this.getAttribute('value');//sau đó thì mới cho thêm phép tính vào result
            
            }else result.innerHTML+=this.getAttribute('value');
        }
        
    });
}

function check_operations_in_array(ar,ar2){//hàm trả về true khi 2 mảng có ít nhất 1 phần tử giống nhau (mục đích là để kiểm tra xem trong div result hiện tại có phép tính nào không)
    for(let i=0;i<ar.length;i++){
        for(let j=0;j<ar2.length;j++){
            if(ar[i]==ar2[j]){
                return true;
            }
        }
    }
    return false;
}

function equal(){// thực hiện phép tính bằng hàm eval() hàm này giúp tính toán đơn giản hơn (ví dụ:chuổi "2+3" thì nó sẽ hiểu là 5)
    var res=result.innerHTML;//gán biểu thức tính toán vào res
    var ouput=eval(res);//gán kết quả vào ouput
    result_history.innerHTML=res+"=";// chuyển phép tính gần nhất lên ô history trên result
    expressionData=res;//gán biểu thức vào biến lưu biểu thức, việc này dùng để cập nhật lịch sử tính toán
    resultData=ouput;//gán đáp án vào biến lưu đáp án, việc này dùng để cập nhật lịch sử tính toán
    historyList.push({expressiondt:expressionData,resultdt:resultData});//chuyền biểu thức và kết quả vào mảng theo dạng object gồm hai thuộc tính là expressiondt và resultdt

    result.innerHTML=Math.round(ouput * 100) / 100;//cái này hay nè, giúp làm tròn số thập phân thứ 3 
                                                   //phương thức round của Math chỉ giúp làm tròn chữ số thập phân đầu tiên, vì vậy khi nhân 100 thì nó sẽ giúp làm tròn số thập phần thứ 3
}
function clean(){
    result.innerHTML="0";//reset lại result về 0
    result_history.innerHTML="";
}
function undo(){//giúp xóa từng số một
    var res=result.innerHTML;


    if(res[res.length-2]==".")result.innerHTML=res.substring(0,res.length - 2);//nếu trước chữ số cần xóa là giấu "." thì xóa cùng lúc
    else if(res.length==1||(res.length==2 && res[0]=='-'))clean();//còn 1 chữ số hoặc một chữ số âm thì xóa và reset result về 0
        else result.innerHTML=res.substring(0,res.length - 1);
}

function showHistory(){
    logHistory[0].innerHTML="";//clear box history
    for(let key in historyList){
        logHistory[0].innerHTML+="<div>"+historyList[key].expressiondt+"="+historyList[key].resultdt+"</div>";//in rất cả các lịch sử tính toán ra
    }
    logHistory[0].classList.toggle("loghistory-active");//cho box history xuất hiện
}

function deleteHis(){//xóa lịch sử tính toán
    logHistory[0].innerHTML="";
    historyList=[];
}

var dark_mode=document.querySelector(".dark-mode i:nth-child(2)");
var light_mode=document.querySelector(".dark-mode i:first-child");

function darkmode(){
    dark_mode.classList.toggle("icon-active");
    light_mode.classList.toggle("icon-active");
}