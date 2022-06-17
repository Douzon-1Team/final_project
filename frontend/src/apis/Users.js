// 유저 로그인/로그아웃 파일

// promise 요청 타임아웃 시간 선언
const TIME_OUT = 300 * 1000;

const statusError = {
    status: false,
    text: {
        error: ["status error 발생"]
    }
};

const requestPromise = (url, option) => {
    return fetch(url, option);
};

const getPromise = async (url, option) => {
    return await Promise.race([
        requestPromise(url, option),
        timeoutPromise()
    ]);
};

const timeoutPromise = () => {
    return new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), TIME_OUT));
};

export const loginUser = async (credentials) => {
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(credentials)
    };
    const data = await getPromise('/login', option).catch(() => {
        return statusError;
    });

    if (parseInt(Number(data.status)/100)===2) {
        const status = data.ok;
        const code = data.status;
        const text = await data.text();
        const json = text.length ? JSON.parse(text) : "";

        return {
            status,
            code,
            json
        };
    } else {
        return statusError;
    }
};

export const logoutUser = async (credentials, ACCESS_TOKEN) => {
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(credentials)
    };

    const data = await getPromise('/logout', option).catch(() => {
        return statusError;
    });

    if (parseInt(Number(data.status)/100)===2) {
        const status = data.ok;
        const code = data.status;
        const text = await data.text();
        const json = text.length ? JSON.parse(text) : "";

        return {
            status,
            code,
            // text
            json
        };
    } else {
        return statusError;
    }
}

export const requestToken = async (refreshToken) => {
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ refresh_token: refreshToken })
    }

    const data = await getPromise('/login', option).catch(() => {
        return statusError;
    });

    if (parseInt(Number(data.status)/100)===2) {
        const status = data.ok;
        const code = data.status;
        const text = await data.text();
        const json = text.length ? JSON.parse(text) : "";

        return {
            status,
            code,
            json
        };
    } else {
        return statusError;
    }
};
