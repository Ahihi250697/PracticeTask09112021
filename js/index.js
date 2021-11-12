import * as App from "./App.js";

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
const imgFetch = () => {
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
imgFetch();

// init
const imgInit = () => {
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

// get img position
const getImgPos = (e) => {
    let _data = e.data("img");
    return { x: _data.x, y: _data.y };
};

// collision mouse && img
const getCollision = (mouse, img) => {
    const Distance = App.point_distance(mouse.x, mouse.y, img.x, img.y);
    return Distance;
};

// img hover
const getHoverHandle = (ele, pagePos) => {
    const MousePos = App.Mouse(ele, pagePos);
    const _w = window.innerWidth;
    let _mobile = 0;
    _w < 768 ? (_mobile = 1) : _mobile;

    ImgLists.map((ind, val) => {
        const ImgPos = getImgPos($(val));
        const Check = getCollision(MousePos, ImgPos);
        const imgScale = $(val).data("img").s;
        if (Check < DefaultDistance - _mobile * 250) {
            // RootMove(pagePos);
            App.AbsoluteTitle(ImgTitle, MousePos);
            RootMove(ImgPos, MousePos);
            let _d2 = 1 - Check / DefaultDistance;
            _d2 <= imgScale ? (_d2 = imgScale) : _d2;

            let _zindex = Math.floor(_d2 * 100);
            $(val).css({
                transform: `scale(${_d2})`,
                "z-index": _zindex * 10,
            });
        } else {
            $(val).css({
                transform: `scale(0.3)`,
            });
        }
    });
};

//reseet img
const resetImg = () => {
    ImgLists.map((ind, val) => {
        const imgScale = $(val).data("img").s;
        $(val).css({
            transform: `scale(${imgScale})`,
        });
    });
};

// root move
const RootMove = (pos, mouse) => {
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

const handleStorage = (name) => {
    localStorage.clear();
    localStorage.setItem("imgName", name[name.length - 1]);
};

// click
const ImgClick = (e) => {
    let _pos = e.data("img");
    let _pathname = e.attr("data-nav"),
        _name = e.find("img").attr("src").split("/");

    let _click = setTimeout(() => {
        e.addClass("img-click");
    }, 500);

    handleStorage(_name);

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
        window.location.pathname = _pathname;
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
        imgInit();

        ImgLists.on("mouseenter", function () {
            let _title = $(this).find(".img-title").text();
            ImgTitle.text(_title);
        }).on("click", function () {
            _click = true;
            ImgClick($(this));
        });
    }, 2000);

    Root.on("mouseenter mousemove", function (e) {
        if (_mousemove && !_click) {
            const _ = $(this);

            const PagePos = { x: e.pageX, y: e.pageY };
            getHoverHandle(RootPos, PagePos);
            _mousemove = false;
            let _time = setTimeout(function () {
                _mousemove = true;
            }, 50);
        }
    }).on("mouseleave", function () {
        if (!_click) resetImg();
    });

    Root.on("touchmove", function (e) {
        if (_mousemove && !_click) {
            const _ = $(this);

            const PagePos = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY,
            };

            getHoverHandle(RootPos, PagePos);
            _mousemove = false;
            let _time = setTimeout(function () {
                _mousemove = true;
            }, 100);
        }
    }).on("touchend", function () {
        if (!_click) resetImg();
    });
});
