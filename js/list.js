var GLOBAL = GLOBAL || {};
$(function () {
  /*  $("#header").load("header.html");
    $("#footer").load("footer.html");*/
    $(".title_list .pen").click(function () {
            $(".title_list").animate({"width": "100px", backgroundPositionX: "-1000px"}, 0, function () {
                $(".title_list").animate({"width": "1100px", backgroundPositionX: "0px"}, 1300, "easeOutStrong");
            });
    });

   /* $("#articleList").delegate(".content_one", "click", function () {
        window.open("article.html?"+ getUrlParams("type") +  "&articleId=" + $(this).attr("articleId"), "_blank");
    });*/

        $("#articleList").delegate(".content_one","click",function () {
            window.open("article.html?name=laogao&jineng=kanmen&tianen=laogaodidi");
        });

    $("#listMore").click(function(){
        if(k<3){
            laogao();
        }
    });


    laogao();
    var k = 0;
    function laogao(){
        var xhr = new XMLHttpRequest();
        xhr.open("get","js/listData.json");
        xhr.send(null);
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    if(k==0){
                        $("#articleList").html("");
                    }
                    var result = xhr.responseText;
                    var result1 = JSON.parse(result);
                    var result2 = result1[k].data.list;
                    for(var i=0;i<result2.length;i++){
                      var item = $("#itemHtml").html()
                          .replace("$articleId$",result2[i].sysId)
                          .replace("$articleCover$",result2[i].coverImg)
                          .replace("$articleTitle$",result2[i].title)
                          .replace("$updateTime$",result2[i].creatAt)
                          .replace("$describe$",result2[i].describe);
                        $("#articleList").append(item);
                    }
                    var ati= Math.ceil(result1[k].data.count/result1[k].data.pageSize);
                    if(k>=ati-1){
                        $(".list_more").css({opacity:0.3});
                        $(".list_img").attr("src","images1/list_gomore_bg_nomore.jpg")
                    }
                    k++;
                }
            }
        }
    }

});

//加载列表数据方法;



//获取页面url传过来的参数
function getUrlParams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return r[2];
    else
        return "";
}

/*?type=articleData.xiaoniaoNews1&name=asdlkfjsodihgosn*/
