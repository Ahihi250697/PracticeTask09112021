//const
const WindowWidth = $(window).width();
const RootOuterHeight = $(".js-root-outer").innerHeight();
const Root = $(".root");
const RootTitle = $(".root-title");
const RootWidth = Root.innerWidth();
const RootHeight = Root.innerHeight();
const DefaultDistance = 300;

// fetch img
const imgFetch = () => {
    let _data = [
        {
            src: "./images/orange.jpg",
            alt: "image 0 1",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 2",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 3",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 4",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 5",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 6",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 7",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 8",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 9",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 10",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 1",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 1",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 2",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 3",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 4",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 5",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 6",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 7",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 8",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 9",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 10",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 1",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 2",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 3",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 4",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 5",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 6",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 7",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 8",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 9",
        },
        {
            src: "./images/orange.jpg",
            alt: "image 0 10",
        },
    ];
    let _html = "";
    _data.map((val, ind) => {
        let _left = Math.random() * RootWidth - 100,
            _top = Math.random() * RootHeight - 100;
        _html += `<img class="img-hover before-hover js-img-hover" style="left:${_left}px; top:${_top}px" src="${val.src}" alt="${val.alt}"></img>
        `;
    });
    Root.append(_html);
};
imgFetch();
const ImgLists = $(".js-img-hover");

// init
const imgInit = () => {
    ImgLists.map((ind, val) => {
        let _ = $(val),
            _x = _.position().left,
            _y = _.position().top,
            _w = _.get(0).getBoundingClientRect().width,
            _h = _.get(0).getBoundingClientRect().height,
            _s = _.get(0).getBoundingClientRect().width / _.get(0).offsetWidth;
        _.removeClass("before-hover");
        const Pos = {
            x: _x + _w * 0.5,
            y: _y + _h * 0.5,
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

// get mouse position
const getMousePos = (ele, pagePos) => {
    let _x = pagePos.x - ele.x,
        _y = pagePos.y - ele.y;

    return {
        x: _x,
        y: _y,
    };
};

// caculator distance
const pointDistance = (x1, x2, y1, y2) => {
    let _a = (x1 - x2) ** 2,
        _b = (y1 - y2) ** 2;

    return Math.sqrt(_a + _b);
};

// collision mouse && img
const getCollision = (mouse, img) => {
    const Distance = pointDistance(mouse.x, img.x, mouse.y, img.y);
    return Distance;
};

// img hover
const getHoverHandle = (ele, pagePos, imgLists) => {
    const MousePos = getMousePos(ele, pagePos);

    ImgLists.map((ind, val) => {
        const ImgPos = getImgPos($(val));
        const Check = getCollision(MousePos, ImgPos);
        // const ImgScale = $(val).data("img").s;
        if (Check < DefaultDistance) {
            // RootMove(pagePos);
            RootMove(ImgPos, MousePos);
        }
        let _d2 = 1 - Check / DefaultDistance;
        _d2 <= 0.2 ? (_d2 = 0.2) : _d2;

        let _zindex = Math.floor(_d2 * 100);

        $(val).css({
            transform: `scale(${_d2})`,
            // "z-index": _zindex,
        });
        if (_zindex > 50) {
            $(val).css({
                "z-index": _zindex,
            });
        } else {
            $(val).css({
                "z-index": 1,
            });
        }
    });
};

//reseet img
const resetImg = () => {
    const ImgLists = $(".js-img-hover");
    ImgLists.map((ind, val) => {
        const ImgScale = $(val).data("img").s;
        $(val).css({
            transform: `scale(${ImgScale})`,
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

    RootTitle.css({
        top: `${mouse.y}px`,
        left: `${mouse.x}px`,
    });
    Root.css({
        transform: `translate(${-_left}px, ${_top}px)`,
    });
};

//load
$(window).on("load", function () {
    //const ImgLists = $(".js-img-hover");

    let _mousemove = false;
    let _time = setTimeout(function () {
        _mousemove = true;
        imgInit();
        ImgLists.on("mouseenter", function () {
            let _title = $(this).attr("alt");
            RootTitle.text(_title);
        });
    }, 1000);
    Root.on("mouseenter mousemove", function (e) {
        if (_mousemove) {
            const _ = $(this);
            const ThisPos = { x: _.offset().left, y: _.offset().top };
            const PagePos = { x: e.pageX, y: e.pageY };
            getHoverHandle(ThisPos, PagePos, ImgLists);
            _mousemove = false;
            let _time = setTimeout(function () {
                _mousemove = true;
            }, 100);
        }
        _mousemove = false;
    }).on("mouseleave", function () {
        resetImg();
    });
});
