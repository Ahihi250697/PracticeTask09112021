//const
const WindowWidth = $(window).width();
const RootOuterHeight = $(".js-root-outer").innerHeight();
const Root = $(".root");
const ImgTitle = $(".root-title");
const RootWidth = Root.innerWidth();
const RootHeight = Root.innerHeight();
const DefaultDistance = 400;
const ImgLists = $(".js-img-hover");

// fetch img
const img_fetch = () => {
    /*
    let _data = [
        {
            src: "./images/img_05.png",
            title: "this is image 05",
        },
    ];
    let _html = "";
    _data.map((val, ind) => {
        let _left = Math.random() * RootWidth - 100,
            _top = Math.random() * RootHeight - 100;
        _html += `<figure class="img-hover img-init js-img-hover" style="left:${_left}px; top:${_top}px">
            <img src="${val.src}" alt="image"/>
            <figcaption class="img-title">${val.title}</figcaption>
        </figure>
        `;
    });
    //Root.append(_html);
    */
    ImgLists.map((ind, val) => {
        let _ = $(val);
        if (!_.hasClass("img-start")) _.addClass(`img${ind + 1}`);
        if (ind >= 25) _.remove();
    });
};
img_fetch();

// init
const img_init = () => {
    ImgLists.map((ind, val) => {
        let _ = $(val),
            _x = _.position().left,
            _y = _.position().top,
            _w = _.get(0).getBoundingClientRect().width,
            _h = _.get(0).getBoundingClientRect().height,
            _s = _.get(0).getBoundingClientRect().width / _.get(0).offsetWidth;
        _.removeClass("img-init");
        const Pos = {
            x: _x, // + _w * 0.5,
            y: _y, // + _h * 0.5,
            s: _s,
        };

        _.data("img", Pos);
    });
    console.log("init");
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

// get img position
const image_position = (e) => {
    let _data = e.data("img");
    return { x: _data.x, y: _data.y };
};
// distance A(x1, y1) B(x2, y2);
const point_distance = (x1, y1, x2, y2) => {
    let _a = (x1 - x2) ** 2,
        _b = (y1 - y2) ** 2;

    return Math.sqrt(_a + _b);
};

// collision mouse && img
const collition_with = (mouse, img) => {
    const Distance = point_distance(mouse.x, mouse.y, img.x, img.y);
    return Distance;
};

// img hover
const handle_hover = (ele, pagePos) => {
    const Mouse = mouse(ele, pagePos);
    let _mobile = 0;
    WindowWidth < 768 ? (_mobile = 1) : _mobile;

    ImgLists.map((ind, val) => {
        const ImgPos = image_position($(val));
        const Check = collition_with(Mouse, ImgPos);
        // const imgScale = $(val).data("img").s;
        if (Check < DefaultDistance - _mobile * 250) {
            absolute_title(ImgTitle, Mouse);
            root_move(ImgPos, Mouse);
            let _d2 = 1 - Check / DefaultDistance;
            _d2 <= 0.3 ? (_d2 = 0.3) : _d2;

            let _zindex = Math.floor(_d2 * 100);
            $(val).css({
                transform: `scale(${_d2})`,
                "z-index": _zindex,
            });
        } else {
            $(val).css({
                transform: `scale(0.3)`,
            });
        }
    });
};

//reseet img
const image_reset = () => {
    ImgLists.map((ind, val) => {
        const imgScale = $(val).data("img").s;
        $(val).css({
            transform: `scale(${imgScale})`,
        });
    });
};

// root move
const root_move = (pos, mouse) => {
    let _rootHalf = RootWidth - WindowWidth;

    let _left = pos.x - WindowWidth * 0.5,
        _top = RootOuterHeight * 0.5 - pos.y;

    _left > _rootHalf ? (_left = _rootHalf) : _left;
    _left < 0 ? (_left = 0) : _left;

    _top > 0 ? (_top = 0) : _top;
    _top < RootOuterHeight - RootHeight
        ? (_top = RootOuterHeight - RootHeight)
        : _top;

    // ImgTitle.css({
    //     top: `${mouse.y}px`,
    //     left: `${mouse.x}px`,
    // });
    Root.css({
        transform: `translate(${-_left}px, ${_top}px)`,
    });
};

const handle_storage = (name) => {
    localStorage.clear();
    localStorage.setItem("imgName", name[name.length - 1]);
};

const get_url = (e = "") => {
    const pathname = window.location.pathname;
    let _pathname = pathname.split("/"),
        _remove = _pathname.pop();
    _pathname.push(e);
    return _pathname.join("/");
};

// click
const image_click = (e) => {
    let _pos = e.data("img");
    let _pathname = e.attr("data-nav"),
        _name = e.find("img").attr("src").split("/");

    let _click = setTimeout(() => {
        e.addClass("img-click");
    }, 500);

    handle_storage(_name);

    Root.css({
        transform: "translate(-50px, -50px)",
    });

    ImgLists.map((ind, val) => {
        let _ = $(val);
        _.removeClass("img-start");
        _.css({
            top: "50%",
            left: "50%",
            transform: "scale(0.3)",
        });
    });

    let _setUrl = setTimeout(function () {
        window.location.pathname = get_url(_pathname);
    }, 1500);
};

// load
$(window).on("load", function () {
    //const ImgLists = $(".js-img-hover");
    const RootPos = { x: Root.offset().left, y: Root.offset().top };
    let _mousemove = false,
        _click = false;

    let _time = setTimeout(function () {
        _mousemove = true;
        img_init();

        ImgLists.on("mouseenter", function () {
            let _title = $(this).find(".img-title").text();
            ImgTitle.text(_title);
        }).on("click", function () {
            _click = true;
            image_click($(this));
        });
    }, 2000);

    Root.on("mouseenter mousemove", function (e) {
        if (_mousemove && !_click) {
            const _ = $(this);

            const PagePos = { x: e.pageX, y: e.pageY };
            handle_hover(RootPos, PagePos);
            _mousemove = false;
            let _time = setTimeout(function () {
                _mousemove = true;
            }, 50);
        }
    }).on("mouseleave", function () {
        if (!_click) image_reset();
    });

    Root.on("touchmove", function (e) {
        if (_mousemove && !_click) {
            const _ = $(this);

            const PagePos = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY,
            };

            handle_hover(RootPos, PagePos);
            _mousemove = false;
            let _time = setTimeout(function () {
                _mousemove = true;
            }, 100);
        }
    }).on("touchend", function () {
        if (!_click) image_reset();
    });
});
