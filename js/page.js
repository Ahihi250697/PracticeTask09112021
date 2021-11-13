const ImgTitle = $(".img-order");

// init
const image_init = () => {
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

const set_image_title = (title, ctr, len) => {
    title.text(`${ctr} of ${len}`);
};

const instance_destroy = (tar) => {
    tar.addClass("remove");
    let _des = setTimeout(function () {
        tar.remove();
    }, 500);
};
// mouse position
const mouse = (ele, pagePos) => {
    let _x = pagePos.x - ele.x,
        _y = pagePos.y - ele.y;

    return {
        x: _x,
        y: _y,
    };
};
// absolute title
const absolute_title = (c, pos) => {
    c.css({
        top: `${pos.y}px`,
        left: `${pos.x}px`,
    });
};
const get_url = (e = null) => {
    const pathname = window.location.href;
    let _pathname = pathname.split("/"),
        _remove = _pathname.pop();
    _remove = _pathname.pop();

    e != "/" ? _pathname.push(e) : null;
    return _pathname.join("/");
};
// goto next page
const image_click = (img) => {
    let _pathname = img.attr("data-nav"),
        _name = img.find("img").attr("src").split("/");

    localStorage.clear();
    localStorage.setItem("imgName", _name[_name.length - 1]);

    let _setUrl = setTimeout(function () {
        window.location.href = get_url(_pathname);
    }, 500);
};

$(window).on("load", function () {
    image_init();
    // image_init();

    const ImgChildren = $(".img");
    let _length = ImgChildren.length - 1,
        _counter = 1,
        _clicked = false;

    set_image_title(ImgTitle, _counter, _length);

    ImgChildren.on("click", function () {
        if (_counter > _length) {
            if (!_clicked) {
                $(this).addClass("end");
                image_click($(this));
                _clicked = true;
            }
        } else {
            if (_counter === _length) {
                $(this).next().addClass("last");
                $(".page").addClass("last");
            }
            _counter++;
            set_image_title(ImgTitle, _counter, _length);
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
            let _mouse = mouse(ThisPos, PagePos);
            absolute_title(ImgTitle, _mouse);
            _mousemove = false;
            let _time = setTimeout(function () {
                _mousemove = true;
            }, 100);
        }
    });
});
