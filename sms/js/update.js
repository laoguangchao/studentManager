/**
 * Created by Administrator on 2016/10/12 0012.
 */

$(function () {
    var str = window.location.hash;
   var result = str.split("=");
   id=+result[1];
  // console.log(id);
   findStudentById(id,function (data) {
       $("#updateForm").find("[name='name']").val(data[0].name);
       $("#updateForm").find("[name='age']").val(data[0].age);
      $("#updateForm").find("[name='gender']").val(data[0].gender);
       $("#updateForm").find("[name='address']").val(data[0].address);
   });

   $("#updateForm").off();
   $("#updateForm").submit(function () {
      var name = $(this).find("[name='name']").val();
      var age = $(this).find("[name='age']").val();
      var gender = $(this).find("[name='gender']").val();
      var address = $(this).find("[name='address']").val();
      var student= new updStudent(name,age,gender,address);
      //调用保存方法
      updateStudent(id,student,function () {
         alert("修改学生信息成功！");
         //$("#updateForm")[0].reset();
      });
   });

});