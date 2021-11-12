import * as App from "./App.js";

const ImgTitle = $(".img-order");

// init
const ImgInit = () => {
    const Img = $(".img-children");
    Img.map((ind, val) => {
        let _ = $(val);

        let _remove = _.find("img").attr("src").split("/");
        if (_remove[_remove.length - 1] === ImgName) {
            _.remove();
        } else {
            let _rc = setTimeout(function () {
                _.removeClass("start");
            }, 500);
        }
    });
};

const setImgTitle = (title, ctr, len) => {
    title.text(`${ctr} of ${len}`);
};

const instance_destroy = (tar) => {
    tar.addClass("remove");
    let _des = setTimeout(function () {
        tar.remove();
    }, 500);
};

$(window).on("load", function () {
    ImgInit();
    // ImgInit();

    const ImgChildren = $(".img");
    let _length = ImgChildren.length - 1,
        _counter = 1,
        _clicked = false;

    setImgTitle(ImgTitle, _counter, _length);

    ImgChildren.on("click", function () {
        if (_counter > _length) {
            if (!_clicked) {
                $(this).addClass("end");
                App.ImgHandleClick($(this));
                _clicked = true;
            }
        } else {
            if (_counter === _length) {
                $(this).next().addClass("last");
                $(".page").addClass("last");
            }
            _counter++;
            setImgTitle(ImgTitle, _counter, _length);
            instance_destroy($(this));
        }
    });

    const Page = $(".page");
    let _mousemove = true;
    Page.on("mousemove", function (e) {
        if (_mousemove) {
            const _ = $(this);
            const ThisPos = {
                x: _.offset().left,
                y: _.offset().top,
            };
            const PagePos = {
                x: e.pageX,
                y: e.pageY,
            };
            let _mouse = App.Mouse(ThisPos, PagePos);
            App.AbsoluteTitle(ImgTitle, _mouse);
            _mousemove = false;
            let _time = setTimeout(function () {
                _mousemove = true;
            }, 100);
        }
    });
});
