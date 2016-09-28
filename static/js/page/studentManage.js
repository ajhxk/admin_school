$(function(){

    var $teacherSelect = $('#teacherSelect'),

        isManage;

    if($teacherSelect.length==1){
        isManage = true;
    }

    function bindSelectDO(){
        var $semester_li = $('#semesterSelect .common_select_li'),
            $teacher_li = $('#teacherSelect .common_select_li');

        $semester_li.on('click',semesterSelectDO);
        $teacher_li.on('click',teacherSelectDO);
        $('.authority_search').delegate('#courseSelect .common_select_li','click',courseSelectDo);
    }

    function semesterSelectDO(){
        var $this = $(this),
            sid = $this.attr('data-sid'),
            curSid = $('#cur_sid');
        curSid.attr('data-sid',sid);
    }

    function teacherSelectDO(){
        var $this = $(this),
            mid = $this.attr('data-mid'),
            curMid = $('#cur_mid');
        curMid.attr('data-mid',mid);
    }

    function courseSelectDo(){
        var $this = $(this),
            cid = $this.attr('data-cid'),
            curCid = $('#cur_cid');  console.log($this);
        curCid.attr('data-cid',cid);
    }

    /**
     * 选择框联动
     * @returns {boolean}
     */
    function teacherSelectLink(){
        if(!isManage){ return false }

        var $teacher_li = $('#teacherSelect .common_select_li'),
            $semester_li = $('#semesterSelect .common_select_li');

        $teacher_li.on('click',courseListInit);
        $semester_li.on('click',courseListInit);
    }

    function teacherSelectInit(){
        var semestarLi = $('#semesterSelect .common_select_ul li'),
            teacherLi = $('#teacherSelect .common_select_ul li'),
            courseLi = $('#courseSelect .common_select_ul li');

        var semestarType = $('#semesterSelect .common_select_type'),
            teacherType = $('#teacherSelect .common_select_type'),
            courseType = $('#courseSelect .common_select_type');

        if(semestarLi.length == 0){
            semestarType.text('无');
        }
        if(teacherLi.length == 0){
            teacherType.text('无');
        }
        if(courseLi.length == 0){
            courseType.text('无');
        }

    }

    /**
     * 课程列表初始化
     */
    function courseListInit(){
        var sid = $('#cur_sid').attr('data-sid'),
            mid = $('#cur_mid').attr('data-mid');

        if(sid === '' || mid ===''){ return false }

        $.ajax({
            type:'GET',
            async:false,
            url:'/student/classlist',
            data:{"sid":sid,"mid":mid},
            success:function(data){
                if(data.type == 200){
                    var _data = data.infos.classesList;
                    refreshClasslist(_data);
                }
            },
            error:function(){
                //window.Alert('出错了::none', ''课程列表初始化出错了');
                console.log('课程列表初始化出错了')
            }
        });
    }

    function refreshClasslist (data){
        $('#courseSelect .common_select_li').remove();
        var len = data.length,
            listStr = '';

        if(len==0){
            $('#courseSelect .common_select_type').text('无');
        }else {
            $('#courseSelect .common_select_type').attr('data-cid', data[0].id).text(data[0].name);

            for (var i = 0; i < len; i++) {
                listStr += '<li class="common_select_li" data-cid=' + data[i].id + '>' + data[i].name + '</li>';
            }

            $('#courseSelect .common_select_ul').append(listStr);
        }
    }

    function bindstudentListSearch(){
        var $searchBtn = $('#search_btn_small');
        $searchBtn.on('click',studentListSearch);
    }

    function studentListSearch(){
        var sid = $('#cur_sid').attr('data-sid'),
            mid = $('#cur_mid').attr('data-mid'),
            cid = $('#cur_cid').attr('data-cid'),
            condition = $('#condition').val();

        if(!(condition==='')){
            var condition = encodeURI(encodeURI(condition));
            window.location.href = '/student/exportInfo?condition='+condition;
        }
        else if( (sid==='') || (mid==='') || (cid==='') ){
            window.Alert('提示::none', '请填写完整的查询规则');
        }
        else{
            window.location.href ='/student/list?sid='+sid+'&mid='+mid+'&cid='+cid;
        }

    }

    function bindListExport(){
        $('#listExport').on('click',listExport);
    }

    function listExport(){
        var sid = $('#cur_sid').attr('data-sid'),
            mid = $('#cur_mid').attr('data-mid'),
            cid = $('#cur_cid').attr('data-cid'),
            condition = $('#condition').val();

        if(!(condition==='')){
            var condition = encodeURI(encodeURI(condition));
            window.location.href = '/student/exportInfo?condition='+condition;
        }
        else if( (sid==='') || (mid==='') || (cid==='') ){
            window.Alert('提示::none', '请填写完整的查询规则');
        }
        else{
            window.location.href ='/student/exportInfo?sid='+sid+'&mid='+mid+'&cid='+cid;
        }
    }

    function pageInit(){
        navActiveSet('student_manage');
        bindSelectDO();
        teacherSelectInit();
        teacherSelectLink();
        bindListExport();

        bindstudentListSearch();
    }

    pageInit();
});

