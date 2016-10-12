/**
 * Created by Administrator on 16/10/11.
 *
 * 负责数据库连接的js
 */
//创建数据库
function getDB() {
    var db = window.openDatabase("sms","1.0","student manager system db",2*1024*1024);
    return db;
}
//创建数据库表
(function () {
    var db = getDB();
    db.transaction(function (transaction) {
        var sql = "CREATE TABLE IF NOT EXISTS " +
            "tbl_student(" +
            "id INTEGER," +
            "name TEXT," +
            "gender TEXT," +
            "age INTEGER," +
            "address TEXT)";
        transaction.executeSql(sql,[],function () {
            //console.log("创建成功！");
        })
    });
})();
//封装要保存的学生信息
function Student(id,name,age,gender,address) {
    this.id  = id;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.address = address;
}

//保存学生信息
function save(student,handler) {
    if(student.id&&student.address&&student.age&&student.name){
    //if(student instanceof Student){
        var db = getDB();
        db.transaction(function (transaction) {
            var sql = "insert into tbl_student values(?,?,?,?,?)";
            transaction.executeSql(sql,[
                student.id,student.name,student.gender,student.age,student.address
            ],function () {
                handler.call(this);
            })
        })
    }else{
        alert("数据有误");
    }
}



//查找所有学生，展示到页面
function list(handler) {
    var db = getDB();
    sql = "select * from tbl_student";
    db.transaction(function (transaction) {
        transaction.executeSql(sql,[],function (transaction,result) {
            var data = result.rows;
            handler(data);
        })
    });
}
//通过id 删除一个或多个学生信息
function  delStuById(id,handler) {
    var db = getDB();
    var sql = "delete from tbl_student where id=?";
    db.transaction(function (transaction) {
        transaction.executeSql(sql,[id],function (transaction,result) {
            handler.call(this);
        })
    });
}

//通过id查找一个学生，把这个学生的信息传给要修改的页面
function findStudentById(id,handler) {
    var db = getDB();
    sql = "select * from tbl_student where id=?";
    db.transaction(function (transaction) {
        transaction.executeSql(sql,[id],function (transaction,result) {
            var data = result.rows;
            handler(data);
        })
    });
}


//创建构造函数，保存要修改的信息
function updStudent(name,age,gender,address) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.address = address;
}

//修改
function updateStudent(id,student,handler) {
   /* console.log(id);
    console.log(student);*/
    if(student.address&&student.age&&student.name&&student.gender) {
        var db = getDB();
        sql = "update tbl_student set name=?,gender=?,age=?,address=? where id=?";
        db.transaction(function (transaction) {
            transaction.executeSql(sql, [student.name,student.gender,student.age,student.address,id], function (transaction, result) {
                handler.call(this);
            })
        });
    }else{
        alert("数据有误或不能为空");
    }
}

//通过输入值查找学生信息
    function Search(input,handler) {
        var db = getDB();
       var sql = "select * from tbl_student where name like '%"+input+"%' or age like '%"+input+"%' or gender like '%"+input+"%' or address like '%"+input+"%'"
        // var sql = "select * from tbl_student where name like '"+input+"' or age like '"+input+"'or address like '"+input+"'or gender like '"+input+"'";
        db.transaction(function (transaction) {
            transaction.executeSql(sql, [], function (transaction, result) {
                handler(result);
            })
        });
    }