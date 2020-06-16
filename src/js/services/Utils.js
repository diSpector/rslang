const Utils = { 
    // --------------------------------
    //  Распарсить url на 3 составляющие - маршрут/id/действие (например, post/1/update - маршрут для редактирования поста с id=1)
    //  Пример ближе к задаче - games/speakit (игры - SpeakIt)
    // --------------------------------
    parseRequestURL : () => {
        // получить из адресной строки всё после знака #, а затем разбить на массив по знаку /
        const url = location.hash.slice(1).toLowerCase() || '/'; 
        const r = url.split("/")
        const request = {
            resource    : null,
            id          : null,
            verb        : null,
        };
        request.resource    = r[1];
        request.id          = r[2];
        request.verb        = r[3];

        return request;
    }
}

export default Utils;