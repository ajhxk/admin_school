/**
 * Created by Administrator on 2016/9/14.
 */
/**
 * Created by xiuyuhang on 16/7/5.
 */
$(function () {
    var venueId = $("#cur_venue").data("option");
    if (venueId != 0) {
        $.post("/consumeDetail/fields", {venueId: venueId}, function (data) {
            if (data.type == 200) {
                var fieldDTO = data.infos.fieldList;
                $("#field_select").html(" ");
                $("#field_select").append("<li class='common_select_li' data-option='" + 0 + "'>" + "全部场地" + "</li>");
                for (var index = 0; index < fieldDTO.count; index++) {
                    var oneField = fieldDTO[index];
                    $("#field_select").append("<li class='common_select_li' data-option='" + oneField.id + "'>" + oneField.name + "</li>");
                }
            }
        });
    }

    $("#search_btn_small").click(function(){
        $("#search").click();
    });

    $("#search").click(function () {
        var valueStartDate = $("#valueStartDate").val();
        var valueEndDate = $("#valueEndDate").val();

        var start = Date.parse(valueStartDate);
        var end = Date.parse(valueEndDate);
        if (end < start) {
            errorTip.show("有效期结束时间不得早于开始时间");
            return false;
        }

        var createStartDate = $("#createStartDate").val();
        var createEndDate = $("#createEndDate").val();

        var begin = Date.parse(createStartDate);
        var over = Date.parse(createEndDate);

        if (over < begin) {
            errorTip.show("创建结束时间不得早于开始时间");
            return false;
        }

        var cur_field = $("#cur_field").data("option");
        var cur_venue = $("#cur_venue").data("option");
        var cur_payment = $("#cur_payment").data("option");
        var cur_source = $("#cur_source").data("option");
        var cur_payStatus = $("#cur_payStatus").data("option");
        var cur_cardType = $("#cur_cardType").data("option");
        var keyword = $("#keyword").val();

        window.location.href = "list?fieldId=" + cur_field + "&venueId=" + cur_venue +
            "&keyword=" + keyword + "&source=" + cur_source + "&payStatus=" + cur_payStatus + "&valueStartDate=" + valueStartDate
            + "&valueEndDate=" + valueEndDate + "&createStartDate=" + createStartDate + "&createEndDate=" + createEndDate
            + "&payment=" + cur_payment + "&cardType=" + cur_cardType;
    });

    $("#export_btn").click(function () {
        var valueStartDate = $("#valueStartDate").val();
        var valueEndDate = $("#valueEndDate").val();

        var start = Date.parse(valueStartDate);
        var end = Date.parse(valueEndDate);
        if (end < start) {
            errorTip.show("有效期结束时间不得早于开始时间");
            return false;
        }

        var createStartDate = $("#createStartDate").val();
        var createEndDate = $("#createEndDate").val();

        var begin = Date.parse(createStartDate);
        var over = Date.parse(createEndDate);

        if (over < begin) {
            errorTip.show("创建结束时间不得早于开始时间");
            return false;
        }

        var cur_field = $("#cur_field").data("option");
        var cur_venue = $("#cur_venue").data("option");
        var cur_payment = $("#cur_payment").data("option");
        var cur_source = $("#cur_source").data("option");
        var cur_payStatus = $("#cur_payStatus").data("option");
        var cur_cardType = $("#cur_cardType").data("option");
        var keyword = $("#keyword").val();

        window.location.href = "export?fieldId=" + cur_field + "&venueId=" + cur_venue +
            "&keyword=" + keyword + "&source=" + cur_source + "&payStatus=" + cur_payStatus + "&valueStartDate=" + valueStartDate
            + "&valueEndDate=" + valueEndDate + "&createStartDate=" + createStartDate + "&createEndDate=" + createEndDate
            + "&payment=" + cur_payment + "&cardType=" + cur_cardType;
    });

    $("#pageIndexBtn").click(function () {
        var valueStartDate = $("#valueStartDate").val();
        var valueEndDate = $("#valueEndDate").val();

        var start = Date.parse(valueStartDate);
        var end = Date.parse(valueEndDate);
        if (end < start) {
            errorTip.show("有效期结束时间不得早于开始时间");
            return false;
        }

        var createStartDate = $("#createStartDate").val();
        var createEndDate = $("#createEndDate").val();

        var begin = Date.parse(createStartDate);
        var over = Date.parse(createEndDate);

        if (over < begin) {
            errorTip.show("创建结束时间不得早于开始时间");
            return false;
        }

        var cur_field = $("#cur_field").data("option");
        var cur_venue = $("#cur_venue").data("option");
        var cur_payment = $("#cur_payment").data("option");
        var cur_source = $("#cur_source").data("option");
        var cur_payStatus = $("#cur_payStatus").data("option");
        var cur_cardType = $("#cur_cardType").data("option");
        var keyword = $("#keyword").val();

        var pageIndex = $("#pageIndex").val();
        var max = $("#pageIndex").attr("max");

        if (Number(pageIndex) <= 0 || Number(pageIndex) > Number(max)) {
            window.Alert("确认::info", "请输入正确的页数");
            return false;
        }

        window.location.href = "list?pageIndex=" + pageIndex + "&fieldId=" + cur_field + "&venueId=" + cur_venue +
            "&keyword=" + keyword + "&source=" + cur_source + "&payStatus=" + cur_payStatus + "&valueStartDate=" + valueStartDate
            + "&valueEndDate=" + valueEndDate + "&createStartDate=" + createStartDate + "&createEndDate=" + createEndDate
            + "&payment=" + cur_payment + "&cardType=" + cur_cardType;
    });

    //$("#venue_select").on('mousedown', 'li', function () {
    //    var text = $(this).text();
    //    var venueId = $(this).data('option');
    //
    //    $("#cur_venue").attr("data-option", venueId).text(text).css("color", "#999").trigger('change');
    //    $(this).parent(".common_select_ul").slideUp();
    //
    //    if (venueId == 0) {
    //        $("#cur_venue").attr("data-option", 0).text("全部场馆");
    //        $("#cur_field").attr("data-option", 0).text("全部场地");
    //        $("#field_select").html(" ");
    //    } else {
    //        $.get("/consumeDetail/fields", {venueId: venueId}, function (data) {
    //            if (data.type == 200) {
    //                var fields = data.infos.fieldList;
    //                $("#cur_field").attr("data-option", 0).text("全部场地");
    //                $("#field_select").html(" ");
    //                $("#field_select").append("<li class='common_select_li' data-option='" + 0 + "'>" + "全部场地" + "</li>");
    //                for (var index = 0; index < fields.length; index++) {
    //                    var oneField = fields[index];
    //                    $("#field_select").append("<li class='common_select_li' data-option='" + oneField.id + "'>" + oneField.name + "</li>");
    //                }
    //            }
    //        });
    //    }
    //});

});
