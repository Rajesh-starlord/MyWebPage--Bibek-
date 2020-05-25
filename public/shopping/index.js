
var category={};

function getData(category) {
  $(".items").empty();
  $.ajax({
    url:"http://localhost:1997/shoppingdata",
    dataType:"JSON",
    data:category,
    success:function (res){
      console.log(res);
      console.log("success");
      loadTemplate(res);

    }
  });
}
getData(category);

function loadTemplate(data) {
  for(var i=0;i<data.length;i++){
    $(".items").loadTemplate($("#temp"),data[i],{append:true});
  }
}

$(".menu-types").on("click",function (event) {
  console.log("clicked");
  console.log(event);
  var type=this.innerHTML.toLowerCase().trim();
  console.log(type);
    if(type=="home"){
      getData({});
    }
    else if(type=="fashion"){
      category.category="Kid's fashion";
      getData(category);

      category.category="Women's fashion";
      getData(category);

      category.category="Men's fashion";
      getData(category);
    }
    else{
      category.category=type;
      getData(category);
    }
});

$(".sub-menu-item").on("click",function () {
  console.log("clicked");
  var type=this.innerHTML.toLowerCase();
  console.log(type);
  switch (type) {
    case "men":category.category="Men's fashion";
              getData(category);break;
    case "women":category.category="Women's fashion";
              getData(category);break;
    case "kid":category.category="Kid's fashion";
              getData(category);break;
    default:break;

  }
});

function Loadsignup() {
  $("#sec").css("opacity","0.5");
  hidetab();
  $(".signup-tab").loadTemplate($("#signup-temp"),{append:true});
  $(".signup-tab").show();

}

function signUp() {

  var logdata={};
  logdata.type="signUp";
  logdata.name=$("#signupName").val();
  logdata.email=$("#signupEmail").val();
  logdata.signupPassword1=$("#signupPassword1").val();
  logdata.signupPassword2=$("#signupPassword2").val();

  var length=logdata.signupPassword1.length;
  console.log(logdata);

  if(logdata.signupPassword1!=logdata.signupPassword2 ){
    $("#signupPassword2").css("border-color","red");
    $("#repsw").html("Different Passwords Found");
    $("#repsw").css("color","red");

  }else{
    $("#signupPassword2").css("border-color","#495057");
    $("#repsw").html("Re-Enter Passwords");
    $("#repsw").css("color","#495057");
  }
  /*if(length<=1){
    $("#signupEmail").css("border-color","red");
  }else{
    $("#signupEmail").css("border-color","#495057");
  }*/

  if(logdata.signupPassword1==logdata.signupPassword2){

     $.ajax({
        url:"http://localhost:1997/logData",
        dataType:"JSON",
        method:'GET',
        data:logdata,
        success:function (res){
                if(res.msg=="success"){
                  $("#sec").css("opacity","1");
                  $(".signup-tab").empty();
                  $(".signup-tab").css("display","none");
                  console.log("successfully registered");
                }else if(res.msg=="exists"){
                  $("#sup-email").html("email already exists..");
                  $("#sup-email").css("color","red");
                }
        }
      });
  }

}

function signIn() {
  var logdata={};
  logdata.type="signIn";
  logdata.email=$("#exampleDropdownFormEmail1").val();
  logdata.password=$("#exampleDropdownFormPassword1").val();

  $.ajax({
     url:"http://localhost:1997/logData",
     dataType:"JSON",
     data:logdata,
     success:function (res){
             if(!res.msg){
               alert("successfully logged-in");
               console.log(res[0].name);
               $("#user-name").html("Welcome "+res[0].name);
               $(".xyz").css("display","none");

             }else{
                $("#email").html(res.msg);
                $("#email").css("color","red");

             }
     }
   });

}

function showtab() {
  $(".xyz").css("display","block");
}
function hidetab() {
  $(".xyz").css("display","none");
}
function loadsetPassword() {
  $("#sec").css("opacity","0.5");
  hidetab();
  $(".signup-tab").css("min-height","170px")
  $(".signup-tab").loadTemplate($("#respsw-temp"),{append:true});
  $(".signup-tab").show();
}
function resetPassword() {
  $("#sec").css("opacity","1");
  $(".signup-tab").empty();
  $(".signup-tab").hide();
}
function close() {
  $("#temp").css("display","none");
}

function viewItem(event) {
  console.log(event);
}
