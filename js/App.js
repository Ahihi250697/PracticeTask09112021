// mouse position
export const Mouse = (ele, pagePos) => {
    let _x = pagePos.x - ele.x,
        _y = pagePos.y - ele.y;

    return {
        x: _x,
        y: _y,
    };
};

// absolute title
export const AbsoluteTitle = (c, pos) => {
    c.css({
        top: `${pos.y}px`,
        left: `${pos.x}px`,
    });
};

// goto next page
export const ImgHandleClick = (img) => {
    let _pathname = img.attr("data-nav"),
        _name = img.find("img").attr("src").split("/");

    localStorage.clear();
    localStorage.setItem("imgName", _name[_name.length - 1]);

    let _setUrl = setTimeout(function () {
        window.location.pathname = _pathname;
    }, 1000);
};

// distance A(x1, y1) B(x2, y2);
export const point_distance = (x1, y1, x2, y2) => {
    let _a = (x1 - x2) ** 2,
        _b = (y1 - y2) ** 2;

    return Math.sqrt(_a + _b);
};
