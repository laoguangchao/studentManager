/**
 * Created by Administrator on 16/10/11.
 */


//重新载入页面函数
function reload() {
    list(function (data) {
        $(".tb1>tbody").children(":not(:first)").remove();
        for (i = 0; i <= data.length - 1; i++) {
        var newTr = $(".hiddenTr").clone().removeClass("hiddenTr");
            newTr.find(":checkbox").val(data[i].id);
            newTr.find("td").eq(1).text(data[i].name);
            newTr.find("td").eq(2).text(data[i].gender);
            newTr.find("td").eq(3).text(data[i].age);
            newTr.find("td").eq(4).text(data[i].address);
           $(".tb1>tbody").append(newTr);

        }

        var cks = $(":checkbox:visible:not(:checkbox:last)");
        var fk = $(":checkbox:last").click(function(){
            cks.prop("checked", $(this).prop("checked"));
        });
        cks.click(function(){
            if(!$(this).prop("checked")){
                fk.prop("checked",false);
            }else{
                if(cks.filter(":not(:checked)").length == 0){
                    fk.prop("checked",true);
                }
            }
        });
    });
}




$(function () {
    reload();
    $("button:contains('删除')").off("click");
    $("button:contains('删除')").click(function () {
        var ips = $(":checkbox:not(:checkbox:last):checked");
        var ids = [];
        for(var j=0;j<ips.length;j++){
            //console.log(ips[j].value);
            ids.push(ips[j].value);
        }
        for(i=0;i<=ids.length-1;i++) {
            var id=ids[i];
            delStuById(id,function () {
                //删除后重新载入
              reload();
                $(":checkbox").prop("checked",false);
            });

        }
    });


    //修改
    $("button:contains('修改')").click(function () {
       var check = $(":checkbox:not(:checkbox:last):checked")
        //修改时只能修改一个
       if(check.length==1){
          var oddId = check.val();
           //通过网址传id给修改页面
           var url = "student_update.html#id="+oddId;
           window.location.href=url;
       }else{
           alert("请选择或者选择一个");
           $(":checkbox").prop("checked",false);
       }

    });

    //搜索
    $("button:contains('搜索')").click(function () {
        var input = $("input[type='search']").val();
        //console.log(input);
        Search(input,function (result) {

            var data = result.rows;

            if(input){
            //----------------------------------------
            $(".tb1>tbody").children(":not(:first)").remove();
            for (i = 0; i <= data.length - 1; i++) {
                var newTr = $(".hiddenTr").clone().removeClass("hiddenTr");
                newTr.find(":checkbox").val(data[i].id);
                newTr.find("td").eq(1).text(data[i].name);
                newTr.find("td").eq(2).text(data[i].gender);
                newTr.find("td").eq(3).text(data[i].age);
                newTr.find("td").eq(4).text(data[i].address);
                $(".tb1>tbody").append(newTr);

            }

            var cks = $(":checkbox:visible:not(:checkbox:last)");
            var fk = $(":checkbox:last").click(function(){
                cks.prop("checked", $(this).prop("checked"));
            });
            cks.click(function(){
                if(!$(this).prop("checked")){
                    fk.prop("checked",false);
                }else{
                    if(cks.filter(":not(:checked)").length == 0){
                        fk.prop("checked",true);
                    }
                }
            });
            }else{
                reload();
            }
        //-----------------------------
        });
    });

});


