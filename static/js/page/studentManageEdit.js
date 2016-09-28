$(function () {


    //字段规则检查
    function checkParams() {

        var studentName = $('#studentName').val();
        if(!verification.empty(studentName)){
            $('.errorSign').text('');
            $('#errorSign_studentName').text('学生名不能为空');
            return false;
        }

        var schoolNum = $('#schoolNum').val();
        if(!verification.empty(schoolNum)){
            $('.errorSign').text('');
            $('#errorSign_schoolNum').text('校园号不能为空');
            return false;
        }


        return true;
    }

    function bindSelectEvent(){
        $('#sexType .common_select_li').on('click',sexSelectEvent);
        $('#campus .common_select_li').on('click',campusSelectEvent);
    }

    function sexSelectEvent(){
        var $this= $(this),
            val = $this.attr('value');

        $("#genter").val(val);

    }

    function campusSelectEvent(){
        var $this = $(this),
            val = $this.attr('data-option');
        $("#unid").val(val);
    }

    function bindCancelEvent(){
        $('#studentManageCancel').on('click',function(){
            window.history.go(-1);
        });
    }

    function saveEvent(){

        if (!checkParams()) {return false;}

        //字段错误提示清除
        $('.errorSign').text('');

/*        $('#studentEdit_form').ajaxForm({

            url:'/student/editUser/form',
            cache:false,
            dataType:'json',
            success:function(data){
                if(data.type== 200){
                    window.location.href='';
                }else{
                    lock.reset();
                    alert(data.msg);
                }
            },
            error:function(){
                lock.reset();
            }
        });*/

        var name =$('#studentName').val(),
            gender = $('#gender').val(),
            campusId = $('#schoolNum').val(),
            unid = $('#unid').val();


        $.ajax({
            url:'/student/editUser/form',
            data:{"name":name, "gender":gender, "campusId":campusId, "unid":unid},
            dataType:'json',
            success:function(data){
                if(data.type== 200){
                    window.location.href='';
                }else{
                    lock.reset();
                    alert(data.msg);
                }
            },
            error:function(){
                lock.reset();
            }

        })

    }

    function bindSaveEvent(){
        $('#studentManageSave').on('click',saveEvent);
    }


    function pageInit(){
        navActiveSet('student_manage');
        bindCancelEvent();
        bindSaveEvent();
        bindSelectEvent();
    }

    pageInit();
});