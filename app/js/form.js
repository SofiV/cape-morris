$("#contactUsForm").submit(function (t) {
    var e,
        o = $(this),
        n = !1;
    return (
        $(this).parent().find(".error-text").hide(),
            $(this).parents().find(".form-group").removeClass("error"),
            o.find("input").each(function () {
                switch ($(this).attr('id')) {
                    case 'inputName':
                        "" == $(this).val() && ($(this).parent().addClass("error"), $(this).parent().find(".error-text").text("Invalid name").show(), (n = !0));
                        break;
                    case 'inputEmailAddress':
                        $(this).val().match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/) == null && ($(this).parent().addClass("error"), $(this).parent().find(".error-text").text("Invalid email").show(), (n = !0));
                        break;
                    default:
                        "" == $(this).val() && ($(this).parent().addClass("error"), $(this).parent().find(".error-text").text("An error occurred").show(), (n = !0));
                        break;
                }
            }),
        n ||
        ((e = o.serialize()),
            $.ajax({
                type: "POST",
                url: "mail.php",
                dataType: "json",
                data: e,
                beforeSend: function (t) {
                    o.find('button[type="submit"]').attr("disabled", "disabled");
                },
                success: function (t) {
                    t.error && console.log(t.error);
                },
                error: function (t, e, o) {
                    console.log("status " + t.status), console.log("error " + o);
                },
                complete: function (t) {
                    o.find('button[type="submit"]').prop("disabled", !1);
                },
            }),
            $(this).hide(),
            $('.stay-updated-success').fadeIn()),
            !1
    );
});